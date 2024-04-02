import { Search } from '@/app/[username]/components/Search'
import { SortBy } from '@/app/[username]/components/SortBy'
import { Collection } from '@/types'
import ToggleNavbarButton from '@/app/[username]/components/ToggleNavbarButton'
import CreateWebsite from '@/features/websites/components/CreateWebsite'
import UpdateWebsite from '@/features/websites/components/UpdateWebsite'

export default function FiltersBar({
   numResults,
   belongsToUser,
   collection,
}: {
   numResults: number | string
   belongsToUser: boolean
   collection?: Collection
}) {
   return (
      <div className='flex justify-between md:justify-end h-14 md:h-20 items-center w-full px-4 md:px-8 gap-4 sticky top-0  bg-background z-10'>
         <ToggleNavbarButton />

         <p className='text-sm text-muted-foreground hidden lg:block'>
            Results: {numResults}
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
   )
}
