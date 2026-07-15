// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { SITE_URL, BASE_PATH, ADMAX_TAG_SRC_IN_ARTICLE } from './src/consts.ts';

/**
 * Rehype plugin: prefix root-relative links inside Markdown content with the
 * base path. With a custom domain BASE_PATH is '' (no-op); for a GitHub Pages
 * project site it would prefix '/<repo-name>'. Astro does not rewrite authored
 * hrefs, and Markdown links bypass the withBase() helper used in components.
 */
function rehypeBaseLinks() {
  const base = BASE_PATH;
  if (!base) return (/** @type {any} */ tree) => tree;
  /** @param {any} node */
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
        node.properties.href = `${base}${href}`;
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  return (/** @type {any} */ tree) => visit(tree);
}

/**
 * Rehype plugin: insert ONE in-article 忍者AdMax ad right after the first <h2>
 * of an article. Production builds only (process.env.NODE_ENV === 'production'),
 * and only when the in-article tag is configured. Mobile-friendly container
 * styled by global .display-ad. Keeps distance from the /app CTA (bottom) and
 * affiliate cards (deeper in the body). No-op in dev / when src is empty.
 */
function rehypeInArticleAd() {
  const src = ADMAX_TAG_SRC_IN_ARTICLE;
  const active = process.env.NODE_ENV === 'production' && !!src;
  if (!active) return (/** @type {any} */ tree) => tree;
  const adNode = {
    type: 'element', tagName: 'aside',
    properties: { className: ['display-ad', 'display-ad--in-article'], 'aria-label': '広告' },
    children: [
      { type: 'element', tagName: 'span',
        properties: { className: ['display-ad__label'] },
        children: [{ type: 'text', value: '広告' }] },
      { type: 'element', tagName: 'div',
        properties: { className: ['display-ad__unit'] },
        children: [{ type: 'element', tagName: 'script', properties: { src }, children: [] }] },
    ],
  };
  return (/** @type {any} */ tree) => {
    if (!Array.isArray(tree.children)) return;
    const i = tree.children.findIndex(
      (n) => n.type === 'element' && n.tagName === 'h2'
    );
    if (i === -1) return; // 見出しが無い記事には挿入しない
    tree.children.splice(i + 1, 0, adNode);
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Empty BASE_PATH (custom domain) → fall back to Astro's default '/'.
  base: BASE_PATH || undefined,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeBaseLinks, rehypeInArticleAd],
  },
  integrations: [
    // MDX：一部の記事だけ、本文中に単一のアフィリエイト広告を配置するために使用。
    // MDXのrehype設定はmarkdownから継承されないため明示的に指定する。
    mdx({
      rehypePlugins: [rehypeBaseLinks, rehypeInArticleAd],
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja-JP' },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
