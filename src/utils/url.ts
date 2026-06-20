// Prefix a root-relative path with the configured base path so internal
// links work when the site is served from a subdirectory (GitHub Pages
// project sites, e.g. /rollcall-japan-seo/).
//
// import.meta.env.BASE_URL reflects the `base` option in astro.config.mjs.
// External URLs and anchors/relative paths are returned unchanged.

const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  return `${base}${path}`;
}
