import LoginPage from '@/app/login/page'
import Link from 'next/link'
// import LoginPage from '@/app/login/page'
// import { createServerClient } from '@/lib/supabase'

export default async function Home() {
   // let collections: Collection[] = []

   // if (error || !data?.user) {
   //    const user_id = '780a68ec-d534-4f73-8cd8-7e04ade0b7c5' // get this from the page path

   //    const result = await supabase
   //       .from('collections')
   //       .select('*')
   //       .eq('user_id', user_id)
   //    collections = result.data ?? []
   // } else {
   //    const result = await supabase
   //       .from('collections')
   //       .select('*')
   //       .eq('user_id', data.user.id)

   //    collections = result.data ?? []
   // }

   // console.log(data.user.id)

   // const { data: websites, error: xxx } = await supabase
   //    .from('websites')
   //    .select('*')

   // console.log(websites, xxx, xxx2)
   return (
      <div className='min-h-screen w-full text-center flex flex-col items-center justify-center gap-2'>
         <h1>Landing page</h1>

         <LoginPage />

         <Link href='/christianvm' className='underline underline-offset-2'>
            {' '}
            View user space{' '}
         </Link>
      </div>
   )
}
