import LoginPage from '@/app/login/page'
import Link from 'next/link'

export default async function Home() {
   return (
      <div className='min-h-screen w-full text-center flex flex-col items-center justify-center gap-2'>
         <h1>Landing page</h1>

         <LoginPage />

         <Link href='/christianvm' className='underline underline-offset-2'>
            View user space
         </Link>
      </div>
   )
}
