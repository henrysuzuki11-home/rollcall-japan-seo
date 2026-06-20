// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './src/consts.ts';

/**
 * Rehype plugin: prefix root-relative links inside Markdown content with the
 * base path, so internal links in articles work on a GitHub Pages project site
 * (served under /rollcall-japan-seo/). Astro does not rewrite authored hrefs,
 * and Markdown links bypass the withBase() helper used in .astro components.
 */
function rehypeBaseLinks() {
  const base = BASE_PATH;
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
  base: BASE_PATH,
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
