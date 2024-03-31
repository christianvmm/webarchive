'use server'

import { CollectionData } from '@/features/collections/model'
import { createServerClient } from '@/lib/supabase'
import { slugify } from '@/utils/slugify'
import { revalidatePath } from 'next/cache'

export async function createCollection(data: CollectionData) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const collection = await supabase
      .from('collections')
      .insert({
         user_id: auth.data.user.id,
         name: data.name,
         icon: data.icon,
         slug: slugify(data.name),
      })
      .select()

   if (collection.error || !collection.data) {
      throw new Error("Couldn't create website.")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)
}
