'use client'
import { Website } from '@/types'
import WebsiteCard from './WebsiteCard'

export default function WebsitesList({ websites }: { websites: Website[] }) {
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-auto justify-items-center w-full'>
         {websites.map((website, i) => {
            return <WebsiteCard key={i} website={website} />
         })}
      </div>
   )
}

export function Create() {
   return (
      <div className='flex flex-row items-center justify-between gap-1 place-items-between bg-white rounded-full pl-2 pr-3 py-2 cursor-pointer text-black transition-all hover:opacity-80 z-50 duration-700'>
         <svg
            width='1.5em'
            height='1.5em'
            strokeWidth='2'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            color='currentColor'
            fontSize='16'
         >
            <path
               d='M6 12h6m6 0h-6m0 0V6m0 6v6'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
            ></path>
         </svg>
         <p className='text-black text-sm font-medium'>Create</p>
      </div>
   )
}
