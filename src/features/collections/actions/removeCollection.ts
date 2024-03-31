'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function removeCollection(id: number) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const result = await supabase.from('collections').delete().eq('id', id)

   if (result.error) {
      throw new Error("Could'nt delete collection")
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', auth.data.user.id)
      .single()

   revalidatePath(`/${profile.data?.username || ''}`)
   redirect(`/${profile.data?.username || ''}`)
}
