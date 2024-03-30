import { z } from 'zod'

export const websiteSchema = z.object({
   name: z.string().min(3).max(255),
   url: z.string().url(),
   favicon: z.string().optional(),
   image: z.string().optional(),
   collectionIds: z.array(z.string()).min(1),
})

export type WebsiteData = z.infer<typeof websiteSchema>
