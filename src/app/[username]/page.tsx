import { cn } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase'
import { Island } from '@/app/[username]/components/Island'
import { VISIBILITY } from '@/consts'
import { WebsiteWithCollections } from '@/types'
import CreateWebsite from '@/features/websites/components/CreateWebsite'
import UpdateWebsite from '@/features/websites/components/UpdateWebsite'
import WebsitesList from '../../features/websites/components/WebsitesList'

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

   const belongsToUser = auth.data.user?.id === user.data.id
   let websites: WebsiteWithCollections[] = []

   if (belongsToUser) {
      const { data } = await supabase
         .from('websites')
         .select('*, website_collections(collection_id)')

      websites = data
         ? data.map((item) => {
              const { website_collections, ...website } = item
              return {
                 ...website,
                 collectionIds: website_collections.map((c) => c.collection_id),
              }
           })
         : []
   } else {
      const { data } = await supabase
         .from('websites')
         .select(
            '*, website_collections(collection_id, collections!inner(visibility))'
         )
         .eq('website_collections.collections.visibility', VISIBILITY.PUBLIC)

      websites = data
         ? data.map((item) => {
              const { website_collections, ...website } = item
              return {
                 ...website,
                 collectionIds: website_collections.map((c) => c.collection_id),
              }
           })
         : []
   }

   return (
      <div className='w-full h-full'>
         <div className='flex justify-end pb-5 min-h-16 w-full'>
            {belongsToUser && (
               <>
                  <UpdateWebsite />
                  <CreateWebsite />
               </>
            )}
         </div>

         <div
            className={cn(
               'flex flex-col items-center w-full',
               !websites.length && 'h-full'
            )}
         >
            {websites.length ? (
               <WebsitesList
                  belongsToUser={belongsToUser}
                  websites={websites}
               />
            ) : (
               <div className='grid place-items-center h-full w-full text-center'>
                  <div>
                     <h1 className='text-lg font-medium'>
                        {belongsToUser
                           ? "You don't have any website."
                           : `${user.data.username} space is empty.`}
                     </h1>
                  </div>
               </div>
            )}

            <Island text='All' />
         </div>
      </div>
   )
}
