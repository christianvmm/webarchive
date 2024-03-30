import { createServerClient } from '@/lib/supabase'
import { Island } from '@/app/[username]/components/Island'
import { VISIBILITY } from '@/consts'
import { Website } from '@/types'
import WebsitesList from '@/app/[username]/components/WebsitesList'
import WebsiteDialog from '@/app/[username]/components/WebsiteDialog'

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
      .from('website_collections')
      .select('websites(*)')
      .eq('collection_id', collection.data.id)

   const websites = data ? data.map((c) => c.websites) : []

   return (
      <div className='w-full h-full'>
         {belongsToUser && (
            <div className='flex justify-end pb-5'>
               <WebsiteDialog />
            </div>
         )}

         <div className='flex flex-col items-center'>
            <WebsitesList websites={websites as Website[]} />

            <Island text={collection.data?.name} />
         </div>
      </div>
   )
}
