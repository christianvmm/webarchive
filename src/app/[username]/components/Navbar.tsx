import { Collection } from '@/types'
import Link from 'next/link'

export default async function Navbar({
   username,
   collections,
}: {
   username: string
   collections: Collection[]
}) {
   return (
      <nav className='w-64 h-screen max-h-screen fixed py-[3%] px-[1%] border-r border-zinc-800 overflow-y-auto hidden lg:block'>
         <header className='px-4 py-8'>
            <h1 className='text-lg font-semibold'>WebArchive</h1>
         </header>

         <p className='px-4 font-semibold py-2'>Browse collections</p>

         <ul>
            <li className='hover:bg-zinc-800 transition-colors rounded-md'>
               <Link href={`/${username}`} className='line-clamp-1 px-4 py-2'>
                  <p className='line-clamp-1'>All</p>
               </Link>
            </li>

            {collections.map((collection) => {
               return (
                  <li
                     key={collection.id}
                     className='hover:bg-zinc-800 transition-colors rounded-md'
                  >
                     <Link
                        href={`/${username}/${collection.slug}`}
                        className='line-clamp-1 px-4 py-2'
                     >
                        <p className='line-clamp-1'>{collection.name}</p>
                     </Link>
                  </li>
               )
            })}
         </ul>
      </nav>
   )
}
