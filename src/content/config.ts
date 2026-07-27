import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string(),
    coverImage: z.string().optional(),
    category: z.enum(["firmware", "hardware", "iot", "tools"]).optional(),
    lead: z.string().optional(),
    problem: z.string().optional(),
    solution: z.array(z.string()).optional(),
    result: z.string().optional(),
    date: z.string(),
  }),
});

export const collections = { projects };
