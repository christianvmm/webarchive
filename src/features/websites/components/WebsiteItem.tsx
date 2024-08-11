'use client'
import WebsiteCard from '@/features/websites/components/WebsiteCard'
import { WebsiteFavicon } from '@/features/websites/components/WebsiteFavicon'
import { WebsiteItemMenu } from '@/features/websites/components/WebsiteItemMenu'
import { useWebsiteStore } from '@/features/websites/store'
import { WebsiteWithCollections } from '@/types'

export function WebsiteItem({
   website,
   belongsToUser,
}: {
   belongsToUser: boolean
   website: WebsiteWithCollections
}) {
   const listView = useWebsiteStore((s) => s.listView)

   if (listView === 'cards') {
      return <WebsiteCard website={website} belongsToUser={belongsToUser} />
   }

   const title = website.name ?? 'Unavailable'

   return (
      <li className='col-span-3 p-5 rounded-md w-full h-5 flex items-center gap-5 justify-between'>
         <a
            title={`Open "${website.name}" in new tab`}
            href={website.url}
            target='_blank'
            className='flex flex-1 gap-5 items-center justify-start hover:brightness-75'
         >
            <WebsiteFavicon favicon={website.favicon} name={website.name} />

            <h1 className='text-white line-clamp-1'>{title}</h1>
         </a>

         <WebsiteItemMenu website={website} />
      </li>
   )
}
