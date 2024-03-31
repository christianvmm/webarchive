'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Collection } from '@/types'
import { usePathname } from 'next/navigation'
import CreateCollection from '@/features/collections/components/CreateCollection'
import ICONS from '@/consts/icons'
import { BookmarkFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { EditIcon, TrashIcon } from 'lucide-react'
import { removeCollection } from '@/features/collections/actions/removeCollection'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UpdateCollection from '@/features/collections/components/UpdateCollection'
import { useCollectionStore } from '@/features/collections/store'

export default function Navbar({
   belongsToUser,
   username,
   collections,
}: {
   belongsToUser: boolean
   username: string
   collections: Collection[]
}) {
   const pathname = usePathname()

   return (
      <nav
         className='w-64 h-screen max-h-screen fixed pb-[3%] border-r border-dashed border-zinc-800 overflow-y-auto hidden lg:block
      '
      >
         <header className='h-20 border-zinc-800 px-4 flex items-center'>
            <h1 className='text-lg font-semibold'>WebArchive</h1>
         </header>

         <div className='flex items-center justify-between p-4 pt-0 h-12'>
            <h1 className='font-semibold'>Collections</h1>

            {belongsToUser && (
               <>
                  <CreateCollection />
                  <UpdateCollection />
               </>
            )}
         </div>

         <ul className='px-4'>
            <NavLinkItem
               belongsToUser={belongsToUser}
               icon='BookmarkFilledIcon'
               href={`/${username}`}
               active={pathname === `/${username}`}
            >
               All
            </NavLinkItem>

            {collections.map((collection) => {
               const href = `/${username}/${collection.slug}`
               const active = href === pathname
               return (
                  <NavLinkItem
                     belongsToUser={belongsToUser}
                     icon={collection.icon}
                     href={href}
                     active={active}
                     key={collection.id}
                     collection={collection}
                  >
                     {collection.name}
                  </NavLinkItem>
               )
            })}
         </ul>
      </nav>
   )
}

function NavLinkItem({
   belongsToUser,
   icon,
   href,
   children,
   active,
   collection,
}: {
   belongsToUser: boolean
   icon: string
   href: string
   active: boolean
   children: string
   collection?: Collection
}) {
   const Icon = ICONS[icon]
   const openDialog = useCollectionStore((s) => s.openCollectionDialog)

   return (
      <li
         className={cn(
            'flex justify-between rounded-md text-muted-foreground transition-colors hover:text-primary pl-3 pr-1 py-2',
            active ? 'bg-muted' : ''
         )}
      >
         <Link href={href} className={cn('flex-1 flex items-center gap-3')}>
            {icon ? (
               <Icon className='w-4 h-4' />
            ) : (
               <BookmarkFilledIcon className='w-4 h-4' />
            )}

            <p className='line-clamp-1 flex-1'>{children}</p>
         </Link>

         {belongsToUser && children !== 'All' && (
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <div
                     role='button'
                     aria-label='Open website options.'
                     className='h-6 w-6 z-10 flex items-center rounded-sm justify-center hover:bg-zinc-700'
                     onClick={(e) => {
                        e.stopPropagation()
                     }}
                  >
                     <DotsVerticalIcon />
                  </div>
               </DropdownMenuTrigger>

               <DropdownMenuContent>
                  <DropdownMenuLabel>{children}</DropdownMenuLabel>

                  <DropdownMenuItem
                     className='text-zinc-400'
                     onClick={() => {
                        if (collection) {
                           openDialog(collection)
                        }
                     }}
                  >
                     <EditIcon className='mr-2 h-4 w-4' />
                     <span>Edit</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     className='text-zinc-400'
                     onClick={() => {
                        if (collection) {
                           removeCollection(collection.id)
                        }
                     }}
                  >
                     <TrashIcon className='mr-2 h-4 w-4' />
                     <span>Delete</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )}
      </li>
   )
}
