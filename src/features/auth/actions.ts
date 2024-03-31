'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'

export async function login(data: { email: string; password: string }) {
   const supabase = createServerClient()
   const result = await supabase.auth.signInWithPassword(data)

   // throws if user has not confirmed email yet
   // console.log(error)
   if (result.error) {
      redirect('/error')
   }

   const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('id', result.data.user.id)
      .single()

   if (!profile.data) {
      throw new Error("Couldn't load profile")
   }

   redirect(`/${profile.data.username}`)
}

export async function signup(formData: FormData) {
   const supabase = createServerClient()

   // type-casting here for convenience
   // in practice, you should validate your inputs
   const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
   }

   const { error, data: x } = await supabase.auth.signUp(data)
   console.log(error, x)

   if (error) {
      redirect('/error')
   }

   revalidatePath('/', 'layout')
   redirect('/')
}
