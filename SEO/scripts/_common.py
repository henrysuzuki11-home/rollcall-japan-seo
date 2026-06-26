#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Shared helpers for the SEO API scripts: config loading, credential
resolution, dates, CSV writing, logging, and friendly error categorisation.

Nothing here reads or writes production site files (src/ or public/).
Secrets are only ever READ from credentials_path / env — never written."""
from __future__ import annotations
import csv, datetime, json, os, sys

# Project root = two levels up from this file (SEO/scripts/_common.py).
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DEFAULT_CONFIG = os.path.join(ROOT, "SEO", "config", "seo_api_config.json")

# Read-only OAuth/service scopes used across scripts.
SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters",  # GSC read + sitemap submit
]


class SeoError(Exception):
    """Carries a human-readable cause category for clean CLI output."""

    def __init__(self, category: str, message: str, hint: str = ""):
        self.category = category
        self.hint = hint
        super().__init__(f"[{category}] {message}")


def log(msg: str) -> None:
    print(f"  {msg}", flush=True)


def today_str() -> str:
    return datetime.date.today().strftime("%Y-%m-%d")


def date_range(days: int):
    end = datetime.date.today()
    start = end - datetime.timedelta(days=days)
    return start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")


def load_config(path: str | None = None) -> dict:
    path = path or DEFAULT_CONFIG
    if not os.path.exists(path):
        raise SeoError("CONFIG_MISSING", f"設定ファイルがありません: {path}",
                       "SEO/config/seo_api_config.example.json をコピーして作成してください。")
    with open(path, encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError as e:
            raise SeoError("CONFIG_INVALID", f"設定JSONが不正です: {e}")


def resolve_path(p: str) -> str:
    """Resolve a config path that may be relative to the project root."""
    return p if os.path.isabs(p) else os.path.join(ROOT, p)


def output_path(cfg: dict, filename: str) -> str:
    out = resolve_path(cfg.get("output_dir", "SEO/data/raw"))
    os.makedirs(out, exist_ok=True)
    return os.path.join(out, filename)


def load_credentials(cfg: dict):
    """Load Google service-account credentials from credentials_path.
    Raises categorised SeoError when missing/invalid. Never writes secrets."""
    try:
        from google.oauth2 import service_account
    except ImportError:
        raise SeoError("DEPS_MISSING", "google-auth が未インストールです。",
                       "pip install -r SEO/scripts/requirements.txt を実行してください。")
    cred_path = resolve_path(cfg.get("credentials_path", ""))
    if not cred_path or not os.path.exists(cred_path):
        raise SeoError("CREDENTIALS_MISSING",
                       f"認証情報が見つかりません: {cred_path}",
                       "Google Cloud のサービスアカウントJSONを credentials_path に置いてください（Gitには絶対に含めない）。")
    try:
        return service_account.Credentials.from_service_account_file(cred_path, scopes=SCOPES)
    except Exception as e:  # malformed JSON, wrong type, etc.
        raise SeoError("CREDENTIALS_INVALID", f"認証情報の読み込みに失敗: {e}")


def write_csv(path: str, fieldnames: list[str], rows: list[dict]) -> str:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, "") for k in fieldnames})
    return path


def print_error(err: Exception) -> None:
    """Standardised, categorised error output for all scripts."""
    if isinstance(err, SeoError):
        print(f"\n❌ {err.category}: {err}", file=sys.stderr)
        if err.hint:
            print(f"   → {err.hint}", file=sys.stderr)
    else:
        msg = str(err)
        cat = "UNKNOWN"
        low = msg.lower()
        if "permission" in low or "403" in low or "forbidden" in low:
            cat = "PERMISSION_DENIED"
        elif "has not been used" in low or "disabled" in low or "api not enabled" in low:
            cat = "API_NOT_ENABLED"
        elif "quota" in low or "rate limit" in low or "429" in low:
            cat = "QUOTA_EXCEEDED"
        elif "invalid" in low and "property" in low:
            cat = "BAD_PROPERTY_ID"
        print(f"\n❌ {cat}: {msg}", file=sys.stderr)


def classify_google_api_error(err: Exception) -> str:
    """Map a Google API exception to one of our categories (best-effort)."""
    msg = str(err).lower()
    if "permission" in msg or "403" in msg or "does not have sufficient" in msg:
        return "PERMISSION_DENIED"
    if "has not been used" in msg or "disabled" in msg or "not enabled" in msg:
        return "API_NOT_ENABLED"
    if "quota" in msg or "429" in msg or "rate limit" in msg:
        return "QUOTA_EXCEEDED"
    if "404" in msg or "not found" in msg:
        return "NOT_FOUND"
    return "API_ERROR"
