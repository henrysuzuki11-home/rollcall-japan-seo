import { defineCollection, z } from 'astro:content';
import { CATEGORIES } from '../consts';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('親みまもり研究所 編集部'),
    draft: z.boolean().default(false),
    // Optional ordering for related-article hand-curation.
    featured: z.boolean().default(false),
    // Optional hero/eyecatch image (used for the article hero, card, and OGP).
    heroImage: z.string().optional(),
    // Optional FAQ items rendered as FAQPage structured data (rich results).
    // Keep in sync with the FAQ section in the article body.
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    // Affiliate service card ids to show under the article (see
    // src/data/affiliateServices.ts). When set, the big IQ121 CTA is
    // suppressed and IQ121 is mentioned softly in the body instead.
    affiliateServices: z.array(z.string()).default([]),
    // ValueCommerce ad ids (seasonal / family events; see
    // src/data/valueCommerceAds.ts). 審査中は表示されない（データのみ保持）。
    valueCommerceAds: z.array(z.string()).default([]),
    // A8 seasonal ad ids (gift / travel / eSIM; see
    // src/data/a8SeasonalAffiliateServices.ts). 優先順に指定する。
    a8SeasonalAds: z.array(z.string()).default([]),
    // 季節広告ブロックの種別（見出し・表示上限を出し分け）。
    a8SeasonalKind: z.enum(['gift', 'travel', 'esim']).optional(),
    // 季節広告ブロックの見出し上書き（混在記事など）。
    a8SeasonalHeading: z.string().optional(),
  }),
});

export const collections = { articles };
