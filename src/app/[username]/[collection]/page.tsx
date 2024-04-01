import { createServerClient } from '@/lib/supabase'
import { VISIBILITY } from '@/consts'
import { WebsiteWithCollections } from '@/types'
import Websites from '@/app/[username]/components/Websites'

export default async function CollectionWebsitesPage({
   params: { collection: slug },
   searchParams,
}: {
   params: {
      collection: string
   }
   searchParams?: {
      query?: string
      sortBy?: string
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
      (collection.data.visibility !== VISIBILITY.PUBLIC && !belongsToUser)
   ) {
      return (
         <div className='w-full h-full grid place-content-center'>
            <h1 className='text-lg font-medium'>Collection not found</h1>
         </div>
      )
   }

   // if (collection.data.visibility === VISIBILITY.HIDDEN) {
   //    return (
   //       <div className='w-full h-full grid place-content-center'>
   //          <h1 className='text-lg font-medium'>
   //             Password required to view this Collection
   //          </h1>

   //          <Input className='mt-5' type='password' />
   //       </div>
   //    )
   // }

   let order = 'created_at'
   let orderOptions = { ascending: false }

   if (searchParams?.sortBy === 'name' || searchParams?.sortBy === 'url') {
      order = searchParams.sortBy
      orderOptions = { ascending: true }
   }

   const query = searchParams?.query || ''

   let { data } = await supabase
      .from('websites')
      .select('*, website_collections!inner(collection_id)')
      .eq('website_collections.collection_id', collection.data.id)
      .ilike('name', `%${query}%`)
      .ilike('url', `%${query}%`)
      .order(order, orderOptions)

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
      <Websites
         belongsToUser={belongsToUser}
         websites={websites}
         collection={collection.data}
      />
   )
}
