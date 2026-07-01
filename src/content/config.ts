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
  }),
});

export const collections = { articles };
