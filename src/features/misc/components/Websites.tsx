import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Collection, WebsiteWithCollections } from '@/types'
import { Island } from '@/features/misc/components/Island'
import ICONS from '@/consts/icons'
import WebsitesList from '@/features/websites/components/WebsitesList'
import FiltersBar from '@/features/misc/components/FiltersBar'

export default function Websites({
   belongsToUser,
   websites,
   collection,
   username,
}: {
   belongsToUser: boolean
   websites: WebsiteWithCollections[]
   collection?: Collection
   username?: string
}) {
   const Icon = collection ? ICONS[collection?.icon] : BookmarkFilledIcon

   return (
      <div className='w-full h-full'>
         <FiltersBar
            belongsToUser={belongsToUser}
            numResults={websites.length}
            collection={collection}
         />

         <div
            className={cn(
               'flex flex-col items-center w-full p-4 md:p-8 pt-0',
               !websites.length && 'h-[calc(100%-10rem)]'
            )}
         >
            {websites.length ? (
               <WebsitesList
                  belongsToUser={belongsToUser}
                  websites={websites}
               />
            ) : (
               <EmptyPlaceholder
                  collection={collection}
                  belongsToUser={belongsToUser}
                  username={username}
               />
            )}

            <Island
               icon={<Icon className='h-5 w-5 text-zinc-600' />}
               text={collection?.name || 'All'}
            />
         </div>
      </div>
   )
}

function EmptyPlaceholder({
   collection,
   belongsToUser,
   username,
}: {
   collection?: Collection
   belongsToUser: boolean
   username?: string
}) {
   if (collection) {
      return (
         <div className='grid place-items-center h-full w-full text-center'>
            <div>
               <h1 className='text-lg font-medium'>
                  Collection &quot;{collection?.name}&quot; is empty.
               </h1>

               {belongsToUser && (
                  <p className='mt-2'>
                     Create a new website or add an existing one.
                  </p>
               )}
            </div>
         </div>
      )
   }

   return (
      <div className='grid place-items-center h-full w-full text-center'>
         <div>
            <h1 className='text-lg font-medium'>
               {belongsToUser
                  ? "You don't have any website."
                  : `${username} space is empty.`}
            </h1>
         </div>
      </div>
   )
}
