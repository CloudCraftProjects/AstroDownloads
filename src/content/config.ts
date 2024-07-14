import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    download: z
      .object({
        size: z.coerce.number().optional(),
        text: z.string().optional(),
        link: z.string().optional(),
      })
      .optional(),
    paths: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const tools = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    hidden: z.coerce.boolean().optional(),
    github: z.string(),
    download: z.string().optional(),
    paths: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, tools };
