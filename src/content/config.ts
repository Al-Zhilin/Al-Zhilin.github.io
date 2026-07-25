import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string(),
    coverImage: z.string().optional(),
    date: z.string(),
  }),
});

export const collections = { projects };
