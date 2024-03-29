import Navbar from './components/Navbar'
import { Collection } from '@/types'
import { createServerClient } from '@/lib/supabase'
import { WebsitesPageParams } from '@/app/[username]/page'
import { Island } from '@/app/[username]/components/Island'

export default async function UserProfilePage({
   params: { username },
   children,
}: WebsitesPageParams & {
   children: React.ReactElement
}) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()
   const user = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

   let collections: Collection[] = []

   if (user.error || !user.data) {
      collections = []
   } else {
      if (auth.data.user?.id === user.data?.id) {
         const result = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', user.data.id)
         collections = result.data ?? []
      } else {
         const result = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', user.data.id)
            .eq('visibility', 'public')
         collections = result.data ?? []
      }
   }

   return (
      <div className='min-h-screen flex justify-between w-full pointer-events-auto'>
         <Navbar username={username} collections={collections} />

         <main className='w-full lg:w-[calc(100%-256px)] ml-auto p-[3%] pb-32'>
            {children}
         </main>
      </div>
   )
}
