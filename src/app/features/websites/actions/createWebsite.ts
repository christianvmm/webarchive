'use server'

import { WebsiteData } from '@/app/features/websites/model'
import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createWebsite(data: WebsiteData) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const website = await supabase
      .from('websites')
      .insert({
         user_id: auth.data.user.id,
         name: data.name,
         url: data.url,
         favicon: data.favicon,
         image: data.image,
      })
      .select()

   if (website.error || !website.data) {
      throw new Error("Couldn't create website.")
   }

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
      throw new Error("Couldn't save website in collections, try again.")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)
}
