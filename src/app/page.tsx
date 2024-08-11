import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/features/misc/components/LoginForm'

export default async function Home() {
   const supabase = createServerClient()
   const auth = await supabase.auth.getSession()
   const user = auth.data.session?.user

   if (user) {
      const profile = await supabase
         .from('profiles')
         .select('username')
         .eq('id', user.id)
         .single()

      if (profile.data) {
         redirect(`/${profile.data.username}`)
      }
   }

   return (
      <div className='w-full lg:grid lg:grid-cols-2 min-h-screen'>
         <div className='flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
               <div className='grid gap-2 text-center'>
                  <h1 className='text-3xl font-bold'>Login</h1>
                  <p className='text-balance text-muted-foreground'>
                     Enter your email below to login to your account
                  </p>
               </div>

               <LoginForm />
               {/* <div className='mt-4 text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link href='#' className='underline'>
                     Sign up
                  </Link>
               </div> */}
            </div>
         </div>
         <div className='hidden lg:block'>
            <img
               src='/placeholder.svg'
               alt='Image'
               width='1920'
               height='1080'
               className='h-full w-full object-cover brightness-[0.3] grayscale'
            />
         </div>
      </div>
   )
}
