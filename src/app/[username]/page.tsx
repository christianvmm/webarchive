import { createServerClient } from '@/lib/supabase'
import WebsitesList, { Create } from './components/WebsitesList'
import { Website } from '@/types'

export type WebsitesPageParams = {
   params: {
      username: string
   }
}

export default async function AllWebsitesPage({
   params: { username },
}: WebsitesPageParams) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()
   const user = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

   if (user.error || !user.data) {
      return (
         <div className='w-full h-full grid place-content-center'>
            <h1>User @{username} not found</h1>
         </div>
      )
   }

   let websites: Website[] = []

   if (auth.data.user?.id === user.data.id) {
      const result = await supabase.from('websites').select('*')
      websites = result.data ?? []
   } else {
      websites = [
         {
            id: 1231,
            name: `This site belongs to ${user.data.username}`,
            url: 'www.google.com',
            created_at: new Date().toISOString(),
            user_id: user.data.id,
            image: null,
            favicon: null,
         },
      ]
   }

   return (
      <div className='w-full h-full'>
         <div className='flex flex-col items-center'>
            <WebsitesList websites={websites} />

            {/* <Island text={selectedCollection?.name} /> */}
         </div>
      </div>
   )
}
