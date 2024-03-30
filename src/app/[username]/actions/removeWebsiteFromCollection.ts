'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function removeWebsiteFromCollection({
   websiteId,
   slug,
}: {
   websiteId: number
   slug: string
}) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const collection = await supabase
      .from('collections')
      .select('id')
      .eq('slug', slug)
      .single()

   if (collection.error || !collection.data) {
      throw new Error('Collection not found')
   }

   const result = await supabase
      .from('website_collections')
      .delete()
      .eq('website_id', websiteId)
      .eq('collection_id', collection.data.id)

   if (result.error) {
      throw new Error("Could'nt delete website")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)
}
