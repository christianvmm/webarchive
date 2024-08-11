'use client'
import { WebsiteWithCollections } from '@/types'
import {
   ArrowLeftIcon,
   ArrowRightIcon,
   DotsVerticalIcon,
   MixerHorizontalIcon,
   PersonIcon,
   ReloadIcon,
} from '@radix-ui/react-icons'
import { useRef, useState } from 'react'
import { WebsiteFavicon } from '@/features/websites/components/WebsiteFavicon'
import { WebsiteItemMenu } from '@/features/websites/components/WebsiteItemMenu'

export default function WebsiteCard({
   belongsToUser,
   website,
}: {
   belongsToUser: boolean
   website: WebsiteWithCollections
}) {
   const [errorOG, setErrorOG] = useState(false)
   const imageRef = useRef<HTMLImageElement | null>(null)
   const name = website.name ?? 'Unavailable'

   return (
      <li className='rounded-xl shadow-lg w-full flex flex-col gap-2 transition-all  focus:outline-1'>
         <a
            title={`Open "${website.name}" in new tab`}
            href={website.url}
            target='_blank'
            className='hover:brightness-75'
         >
            {errorOG || !website.image ? (
               <div
                  className='rounded-lg bg-zinc-900 aspect-video w-full flex justify-center text-black font-medium
               px-10 relative
            '
               >
                  <div className='pt-5'>
                     <h1 className='text-white text-center line-clamp-1'>
                        {name}
                     </h1>
                  </div>

                  <Browser
                     url={website.url}
                     name={name}
                     favicon={website.favicon}
                  />
               </div>
            ) : (
               <img
                  ref={imageRef}
                  loading='lazy'
                  decoding='async'
                  width={400}
                  height={300}
                  className='rounded-lg aspect-video w-full h-full object-center object-cover'
                  alt={`${name} image`}
                  src={website.image}
                  onError={() => {
                     setErrorOG(true)
                  }}
               />
            )}
         </a>

         <div className='flex gap-4 place-items-center'>
            <WebsiteFavicon favicon={website.favicon} name={website.name} />

            <div className='flex items-center justify-between gap-5 w-full'>
               <h1 className='font-medium line-clamp-1'>{name}</h1>

               {belongsToUser && <WebsiteItemMenu website={website} />}
            </div>
         </div>
      </li>
   )
}

function Browser({
   url,
   name,
   favicon,
}: {
   url: string
   name: string
   favicon?: string | null
}) {
   return (
      <div className='h-[70%] absolute bottom-0 w-[90%] rounded-t-md bg-[#D3E2FD] overflow-hidden'>
         <div className='flex gap-1 p-2'>
            <div className='h-2 w-2 rounded-full bg-red-400' />
            <div className='h-2 w-2 rounded-full bg-yellow-400' />
            <div className='h-2 w-2 rounded-full bg-green-400' />

            <div className='w-auto rounded-t-md bg-white absolute left-12 top-1 h-5 flex items-center px-1 gap-1'>
               <WebsiteFavicon
                  name={name}
                  favicon={favicon}
                  width='8'
                  height='8'
                  className='object-contain rounded-sm'
               />

               <h1 className='text-[0.4rem] w-20 font-light line-clamp-1'>
                  {name}
               </h1>

               <p className='text-[0.4rem]'>&#x2715;</p>
            </div>
         </div>

         <div className='bg-white h-full rounded-t-md'>
            <div className='h-6 p-1 grid grid-cols-12'>
               <div className='w-14 flex items-center col-span-2'>
                  <ArrowLeftIcon className='h-[0.5rem]' />
                  <ArrowRightIcon className='h-[0.5rem] text-zinc-400' />
                  <ReloadIcon className='h-[0.4rem]' />
               </div>

               <div className='flex-1 bg-[#E1E3EA] rounded-lg flex items-center gap-1 px-1 justify-between col-span-9'>
                  <div className='flex items-center gap-1 overflow-hidden flex-1'>
                     <div className='rounded-full bg-white h-[0.5rem] w-[0.5rem] flex justify-center items-center'>
                        <MixerHorizontalIcon className='h-[0.4rem] w-auto' />
                     </div>

                     <p className='text-[0.4rem] font-light w-full text-nowrap'>
                        {url}
                     </p>
                  </div>

                  <span className='text-[0.4rem]'>&#9734;</span>
               </div>

               <div className='w-7 flex items-center justify-end col-span-1'>
                  <div className='h-[0.5rem] w-[0.5rem] rounded-full bg-zinc-300 flex items-center justify-center'>
                     <PersonIcon className='h-[0.3rem]' />
                  </div>

                  <DotsVerticalIcon className='h-[0.5rem]' />
               </div>
            </div>

            <div className='h-full w-full'></div>
         </div>
      </div>
   )
}
