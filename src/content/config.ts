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
  }),
});

export const collections = { articles };
