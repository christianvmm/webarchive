'use client'
import { WebsiteWithCollections } from '@/types'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EditIcon, TrashIcon } from 'lucide-react'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useWebsiteStore } from '@/features/websites/store'
import { usePathname } from 'next/navigation'

export function WebsiteItemMenu({
   website,
}: {
   website: WebsiteWithCollections
}) {
   const openEditDialog = useWebsiteStore((s) => s.openWebsiteDialog)
   const openDeleteDialog = useWebsiteStore((s) => s.openDeleteWebsiteDialog)
   const openDeleteFromCollectionDialog = useWebsiteStore(
      (s) => s.openDeleteWebsiteFromCollectionDialog
   )

   // Check if user is in /[username] or /[username]/[collection]
   const pathname = usePathname()
   const parts = pathname.split('/').filter((segment) => segment !== '')
   const [_, collection] = parts
   const all = parts.length === 1

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <div
               aria-label='Open website options.'
               className='h-6 w-6 flex items-center rounded-sm justify-center hover:bg-zinc-800'
            >
               <DotsVerticalIcon />
            </div>
         </DropdownMenuTrigger>

         <DropdownMenuContent>
            <DropdownMenuLabel>Website Options</DropdownMenuLabel>

            <DropdownMenuItem
               className='text-zinc-400'
               onClick={() => openEditDialog(website)}
            >
               <EditIcon className='mr-2 h-4 w-4' />
               <span>Edit</span>
            </DropdownMenuItem>

            {!all && (
               <DropdownMenuItem
                  className='text-zinc-400'
                  onClick={() => {
                     if (collection) {
                        openDeleteFromCollectionDialog({
                           website,
                           slug: collection,
                        })
                     }
                  }}
               >
                  <TrashIcon className='mr-2 h-4 w-4' />
                  <span>Remove from collection</span>
               </DropdownMenuItem>
            )}

            <DropdownMenuItem
               className='text-zinc-400'
               onClick={() => openDeleteDialog(website)}
            >
               <TrashIcon className='mr-2 h-4 w-4' />
               <span>Delete</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
