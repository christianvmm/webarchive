'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Collection } from '@/types'
import { usePathname } from 'next/navigation'
import CreateCollection from '@/features/collections/components/CreateCollection'
import ICONS from '@/consts/icons'
import { BookmarkFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {
   EditIcon,
   EyeIcon,
   EyeOffIcon,
   LockIcon,
   TrashIcon,
   X,
} from 'lucide-react'
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
import { VISIBILITY } from '@/consts'
import {
   Tooltip,
   TooltipProvider,
   TooltipTrigger,
   TooltipContent,
} from '@/components/ui/tooltip'
import { useNavbarStore } from '@/app/[username]/store'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

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
   const open = useNavbarStore((s) => s.open)
   const closeNavbar = useNavbarStore((s) => s.closeNavbar)

   useEffect(() => {
      closeNavbar()
   }, [pathname, closeNavbar])

   return (
      <nav
         className={cn(
            'top-0 left-0 z-20 h-screen max-h-screen fixed pb-[3%] overflow-y-auto  bg-background',
            'w-full',
            open ? 'block' : 'hidden',
            'md:w-64 md:border-r md:border-dashed md:border-zinc-800 md:block'
         )}
      >
         <header className='h-20 border-zinc-800 px-4 flex items-center justify-between'>
            <h1 className='text-lg font-semibold'>WebArchive</h1>

            <Button
               title='Close Navbar'
               className='h-8 w-8 p-0 flex justify-center items-center md:hidden'
               variant='ghost'
               onClick={() => closeNavbar()}
            >
               <X className='h-4 w-4' />
            </Button>
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

   const VisibilityIcon =
      {
         [VISIBILITY.PUBLIC]: EyeIcon,
         [VISIBILITY.PRIVATE]: EyeOffIcon,
         [VISIBILITY.HIDDEN]: LockIcon,
      }[collection?.visibility ?? ''] ?? null

   return (
      <li
         className={cn(
            'flex justify-between rounded-md text-muted-foreground transition-colors hover:text-primary pl-3 pr-1 py-2',
            active ? 'bg-muted' : ''
         )}
      >
         <Link
            href={href}
            className={cn('flex-1 flex items-center gap-3 mr-2')}
         >
            {icon ? (
               <Icon className='w-4 h-4' />
            ) : (
               <BookmarkFilledIcon className='w-4 h-4' />
            )}

            <p className='line-clamp-1 flex-1'>{children}</p>

            {VisibilityIcon && (
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger>
                        <VisibilityIcon className='h-3 w-3' />
                     </TooltipTrigger>
                     <TooltipContent>
                        <p className='capitalize'>{collection?.visibility}</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            )}
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
