'use server'

import { CollectionData } from '@/features/collections/model'
import { createServerClient } from '@/lib/supabase'
import { slugify } from '@/utils/slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateCollection(
   data: CollectionData & { id: number },
   slug?: string
) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const collection = await supabase
      .from('collections')
      .update({
         name: data.name,
         icon: data.icon,
         visibility: data.visibility,
         slug: slugify(data.name),
      })
      .eq('id', data.id)
      .select()

   if (collection.error || !collection.data) {
      throw new Error("Couldn't update collection.")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)

   const newSlug = collection.data[0].slug

   if (slug && newSlug !== slug) {
      redirect(`/${profile.data?.username}/${newSlug}`)
   }
}
