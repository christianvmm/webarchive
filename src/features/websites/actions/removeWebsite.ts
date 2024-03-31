'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function removeWebsite(id: number) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      throw new Error('Unauthenticated.')
   }

   const result = await supabase.from('websites').delete().eq('id', id)

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
