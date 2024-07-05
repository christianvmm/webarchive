import { createServerClient } from '@/lib/supabase'
import { VISIBILITY } from '@/consts'
import { WebsiteWithCollections } from '@/types'
import Websites from '@/features/misc/components/Websites'

export type WebsitesPageParams = {
   params: {
      username: string
   }
   searchParams?: {
      query?: string
      page?: string
      sortBy?: string
   }
}

export default async function AllWebsitesPage({
   params: { username },
   searchParams,
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
            <h1 className='text-lg font-medium'>User @{username} not found</h1>
         </div>
      )
   }

   const belongsToUser = auth.data.user?.id === user.data.id
   let websites: WebsiteWithCollections[] = []

   let order = 'created_at'
   let orderOptions = { ascending: false }

   if (searchParams?.sortBy === 'name' || searchParams?.sortBy === 'url') {
      order = searchParams.sortBy
      orderOptions = { ascending: true }
   }

   const query = searchParams?.query || ''

   if (belongsToUser) {
      const { data } = await supabase
         .from('websites')
         .select(
            '*, website_collections(collection_id, collections!inner(visibility))'
         )
         .neq('website_collections.collections.visibility', VISIBILITY.HIDDEN)
         .ilike('name', `%${query}%`)
         .ilike('url', `%${query}%`)
         .order(order, orderOptions)

      if (data) {
         // TODO: Refactor
         for (const item of data) {
            const { website_collections, ...website } = item

            if (!website_collections || !website_collections.length) {
               continue
            }

            websites.push({
               ...website,
               collectionIds: website_collections.map((c) => c.collection_id),
            })
         }
      } else {
         websites = []
      }
   } else {
      const { data } = await supabase
         .from('websites')
         .select(
            '*, website_collections(collection_id, collections!inner(visibility))'
         )
         .eq('website_collections.collections.visibility', VISIBILITY.PUBLIC)
         .ilike('name', `%${query}%`)
         .ilike('url', `%${query}%`)
         .order(order, orderOptions)

      if (data) {
         for (const item of data) {
            const { website_collections, ...website } = item

            /**
             * Hide Bookmark if doesn't belong to any public collection (length === 0)
             */
            if (!website_collections || !website_collections.length) {
               continue
            }

            websites.push({
               ...website,
               collectionIds: website_collections.map((c) => c.collection_id),
            })
         }
      } else {
         websites = []
      }
   }

   return (
      <Websites
         belongsToUser={belongsToUser}
         websites={websites}
         username={user.data.username ?? ''}
      />
   )
}
