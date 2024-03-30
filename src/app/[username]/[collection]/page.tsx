import { cn } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase'
import { Island } from '@/app/[username]/components/Island'
import { VISIBILITY } from '@/consts'
import { WebsiteWithCollections } from '@/types'
import CreateWebsite from '@/app/[username]/components/CreateWebsite'
import UpdateWebsite from '@/app/[username]/components/UpdateWebsite'
import WebsitesList from '@/app/[username]/components/WebsitesList'

export default async function CollectionWebsitesPage({
   params: { collection: slug },
}: {
   params: {
      collection: string
   }
}) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()
   const collection = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .single()

   const belongsToUser = auth.data.user?.id === collection.data?.user_id

   if (
      collection.error ||
      !collection.data ||
      (collection.data.visibility === VISIBILITY.PRIVATE && !belongsToUser)
   ) {
      return (
         <div className='w-full h-full grid place-content-center'>
            <h1>Collection not found</h1>
         </div>
      )
   }

   const { data } = await supabase
      .from('websites')
      .select('*, website_collections!inner(collection_id)')
      .eq('website_collections.collection_id', collection.data.id)

   const websites: WebsiteWithCollections[] = data
      ? data.map((item) => {
           const { website_collections, ...website } = item
           return {
              ...website,
              collectionIds: website_collections.map((c) => c.collection_id),
           }
        })
      : []

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
                        Collection &quot;{collection.data?.name}&quot; is empty.
                     </h1>

                     {belongsToUser && (
                        <p className='mt-2'>
                           Create a new website or add an existing one.
                        </p>
                     )}
                  </div>
               </div>
            )}

            <Island text={collection.data?.name} />
         </div>
      </div>
   )
}
