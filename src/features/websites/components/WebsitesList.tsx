import { WebsiteWithCollections } from '@/types'
import { WebsiteItem } from '@/features/websites/components/WebsiteItem'

export default function WebsitesList({
   belongsToUser,
   websites,
}: {
   belongsToUser: boolean
   websites: WebsiteWithCollections[]
}) {
   return (
      <ul className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 m-auto justify-items-center w-full'>
         {websites.map((website) => {
            return (
               <WebsiteItem
                  key={website.id}
                  website={website}
                  belongsToUser={belongsToUser}
               />
            )
         })}
      </ul>
   )
}
