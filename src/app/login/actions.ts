'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'

export async function login(formData: FormData) {
   const supabase = createServerClient()

   // type-casting here for convenience
   // in practice, you should validate your inputs
   const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
   }

   const { error } = await supabase.auth.signInWithPassword(data)

   // throws if user has not confirmed email yet
   // console.log(error)

   if (error) {
      redirect('/error')
   }

   revalidatePath('/', 'layout')
   redirect('/')
}

export async function signup(formData: FormData) {
   const supabase = createServerClient()

   // type-casting here for convenience
   // in practice, you should validate your inputs
   const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
   }

   const { error, data: x  } = await supabase.auth.signUp(data)
   console.log(error, x)


   if (error) {
      redirect('/error')
   }

   revalidatePath('/', 'layout')
   redirect('/')
}
