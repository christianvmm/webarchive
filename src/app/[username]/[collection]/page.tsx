import { VISIBILITY } from '@/consts'
import { createServerClient } from '@/lib/supabase'
import { Website } from '@/types'
import WebsitesList from '@/app/[username]/components/WebsitesList'
import { Island } from '@/app/[username]/components/Island'

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

   if (
      collection.error ||
      !collection.data ||
      (collection.data.visibility === VISIBILITY.PRIVATE &&
         auth.data.user?.id !== collection.data.user_id)
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
         <div className='flex flex-col items-center'>
            <WebsitesList websites={websites as Website[]} />

            <Island text={collection.data?.name} />
         </div>
      </div>
   )
}
