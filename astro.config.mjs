// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './src/consts.ts';

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

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Empty BASE_PATH (custom domain) → fall back to Astro's default '/'.
  base: BASE_PATH || undefined,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  integrations: [
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
