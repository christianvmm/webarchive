'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Collection } from '@/types'
import { File, Package, PlusCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Navbar({
   username,
   collections,
}: {
   username: string
   collections: Collection[]
}) {
   const pathname = usePathname()

   return (
      <nav className='w-64 h-screen max-h-screen fixed py-[3%] px-[1%] border-r border-zinc-800 overflow-y-auto hidden lg:block'>
         <header className='px-3 py-8'>
            <h1 className='text-lg font-semibold'>WebArchive</h1>
         </header>

         <div className='flex items-center justify-between pl-3 pb-4'>
            <h1 className='font-semibold'>Collections</h1>

            <div>
               <Button size='sm' variant='outline' className='h-8 gap-1'>
                  <PlusCircle className='h-3.5  w-3.5' />

                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                     Create
                  </span>
               </Button>
            </div>
         </div>

         <ul>
            <NavLinkItem
               href={`/${username}`}
               active={pathname === `/${username}`}
            >
               All
            </NavLinkItem>

            {collections.map((collection) => {
               const href = `/${username}/${collection.slug}`
               const active = href === pathname
               return (
                  <NavLinkItem href={href} active={active} key={collection.id}>
                     {collection.name}
                  </NavLinkItem>
               )
            })}
         </ul>
      </nav>
   )
}

function NavLinkItem({
   href,
   children,
   active,
}: {
   href: string
   active: boolean
   children: React.ReactNode
}) {
   return (
      <li>
         <Link
            href={href}
            className={cn(
               'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-primary',
               active ? 'bg-muted' : ''
            )}
         >
            <Package className='h-4 w-4' />

            <p className='line-clamp-1 flex-1'>{children}</p>
         </Link>
      </li>
   )
}
