import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Collection, WebsiteWithCollections } from '@/types'
import { Island } from '@/app/[username]/components/Island'
import { Search } from '@/app/[username]/components/Search'
import { SortBy } from '@/app/[username]/components/SortBy'
import CreateWebsite from '@/features/websites/components/CreateWebsite'
import ICONS from '@/consts/icons'
import UpdateWebsite from '@/features/websites/components/UpdateWebsite'
import WebsitesList from '@/features/websites/components/WebsitesList'
import ToggleNavbarButton from '@/app/[username]/components/ToggleNavbarButton'

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
         <div className='flex justify-between md:justify-end h-14 md:h-20 items-center w-full px-4 md:px-8 gap-4 sticky top-0  bg-background z-10'>
            <ToggleNavbarButton />

            <p className='text-sm text-muted-foreground hidden lg:block'>
               Results: {websites.length}
            </p>

            <Search />
            <SortBy />

            {belongsToUser && (
               <>
                  <UpdateWebsite />
                  <CreateWebsite collection={collection} />
               </>
            )}
         </div>

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
               <div className='grid place-items-center h-full w-full text-center'>
                  {collection ? (
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
                  ) : (
                     <div>
                        <h1 className='text-lg font-medium'>
                           {belongsToUser
                              ? "You don't have any website."
                              : `${username} space is empty.`}
                        </h1>
                     </div>
                  )}
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
