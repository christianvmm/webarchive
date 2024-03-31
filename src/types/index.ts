import { Tables } from '@/lib/supabase/types'

export type Website = Tables<'websites'>
export type Collection = Tables<'collections'>

export type WebsiteWithCollections = Website & {
   collectionIds: number[]
}
