import { WebsiteWithCollections } from '@/types'
import WebsiteCard from './WebsiteCard'

export default function WebsitesList({
   belongsToUser,
   websites,
}: {
   belongsToUser: boolean
   websites: WebsiteWithCollections[]
}) {
   return (
      <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-auto justify-items-center w-full'>
         {websites.map((website, i) => {
            return (
               <WebsiteCard
                  key={i}
                  website={website}
                  belongsToUser={belongsToUser}
               />
            )
         })}
      </ul>
   )
}
