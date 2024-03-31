import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Collection, WebsiteWithCollections } from '@/types'
import { Island } from '@/app/[username]/components/Island'
import CreateWebsite from '@/features/websites/components/CreateWebsite'
import ICONS from '@/consts/icons'
import UpdateWebsite from '@/features/websites/components/UpdateWebsite'
import WebsitesList from '@/features/websites/components/WebsitesList'

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
         <div className='flex justify-end h-20 items-center w-full px-10  border-dashed border-zinc-800'>
            {belongsToUser && (
               <>
                  <UpdateWebsite />
                  <CreateWebsite />
               </>
            )}
         </div>

         <div
            className={cn(
               'flex flex-col items-center w-full p-8',
               !websites.length && 'h-full'
            )}
         >
            {websites.length ? (
               <WebsitesList
                  belongsToUser={belongsToUser}
                  websites={websites}
               />
            ) : collection ? (
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
            ) : (
               <div className='grid place-items-center h-full w-full text-center'>
                  <div>
                     <h1 className='text-lg font-medium'>
                        {belongsToUser
                           ? "You don't have any website."
                           : `${username} space is empty.`}
                     </h1>
                  </div>
               </div>
            )}

            <Island
               icon={<Icon className='h-5 w-5 text-zinc-600' />}
               text={collection?.name || 'All'}
            />
         </div>
      </div>
   )
}
