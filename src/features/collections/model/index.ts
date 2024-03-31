import { z } from 'zod'

export const collectionSchema = z.object({
   icon: z.string(),
   name: z
      .string()
      .min(3)
      .max(255)
      .regex(/^[a-zA-Z0-9 ]*$/, {
         message: 'Name can only contain letters, digits, and spaces',
      }),
   visibility: z.string(),
})

export type CollectionData = z.infer<typeof collectionSchema>
