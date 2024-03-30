'use server'

import { WebsiteData } from '@/app/[username]/model'
import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateWebsite(data: WebsiteData & { id: number }) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   /**
    * Update website
    */
   const website = await supabase
      .from('websites')
      .update({
         user_id: auth.data.user.id,
         name: data.name,
         url: data.url,
         favicon: data.favicon,
         image: data.image,
      })
      .eq('id', data.id)
      .select()

   if (website.error || !website.data) {
      throw new Error("Couldn't update website.")
   }

   /**
    * Update collections
    */
   await supabase
      .from('website_collections')
      .delete()
      .eq('website_id', website.data[0].id)

   const websiteCollections = data.collectionIds.map((id) => {
      return {
         user_id: auth.data.user.id,
         website_id: website.data[0].id,
         collection_id: Number(id),
      }
   })

   const result = await supabase
      .from('website_collections')
      .insert(websiteCollections)

   if (result.error) {
      throw new Error("Couldn't update website collections, try again.")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)
}
