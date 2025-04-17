import {z, defineCollection} from "astro:content";
import {glob} from "astro/loaders";

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        revDate: z.coerce.date().optional(),
        image: image().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
            message: "tags must be unique",
        }).optional()
    })
        .refine(
            (data) => !data.revDate || data.pubDate <= data.revDate,
            {
                message: "pubDate must be before or equal to revDate",
                path: ["pubDate"],
            }
        )
});

const projects = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url().optional(),
        liveDemo: z.string().url().optional(),
        pinned: z.boolean(),
        pubDate: z.coerce.date(),
        image: image().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
            message: "tags must be unique",
        }).optional(),
    })
});

export const collections = {blog, projects};