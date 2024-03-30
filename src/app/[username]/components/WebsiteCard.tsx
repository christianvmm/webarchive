'use client'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Website } from '@/types'
import { generateIcon } from '@/utils'

import {
   ArrowLeftIcon,
   ArrowRightIcon,
   DotsVerticalIcon,
   MixerHorizontalIcon,
   PersonIcon,
   ReloadIcon,
} from '@radix-ui/react-icons'
import { EditIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

export default function WebsiteCard({
   belongsToUser,
   website,
}: {
   belongsToUser: boolean
   website: Website
}) {
   const [errorOG, setErrorOG] = useState(false)
   const [errorIcon, setErrorIcon] = useState(false)
   const imageRef = useRef<HTMLImageElement | null>(null)
   const title = website.name ?? 'Unavailable'
   const icon =
      !website.favicon || errorIcon ? generateIcon(title) : website.favicon

   return (
      <div className='rounded-xl shadow-lg w-full flex flex-col gap-2 transition-all  focus:outline-1'>
         <a
            title={`Open ${website.name} in new tab`}
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
                        {title}
                     </h1>
                  </div>

                  <Browser url={website.url} icon={icon} title={title} />
               </div>
            ) : (
               <Image
                  ref={imageRef}
                  loading='lazy'
                  decoding='async'
                  width={400}
                  height={300}
                  className='rounded-lg aspect-video w-full h-full object-center object-cover'
                  alt={`${title} image`}
                  src={website.image}
                  onError={() => {
                     setErrorOG(true)
                  }}
               />
            )}
         </a>

         <div className='flex gap-4 place-items-center'>
            {errorIcon || !website.favicon ? (
               <Image
                  alt={`${title} favicon`}
                  loading='lazy'
                  width='16'
                  height='16'
                  decoding='async'
                  className='object-contain rounded-sm'
                  src={icon}
               />
            ) : (
               <Image
                  alt={`${title} favicon`}
                  loading='lazy'
                  width='16'
                  height='16'
                  decoding='async'
                  className='object-contain'
                  src={website.favicon}
                  onError={() => {
                     setErrorIcon(true)
                  }}
               />
            )}

            <div className='flex items-center justify-between gap-5 w-full'>
               <h1 className='font-medium line-clamp-1'>{title}</h1>

               {belongsToUser && (
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <div
                           role='button'
                           aria-label='Open website options.'
                           className='h-6 w-6 flex items-center rounded-sm justify-center hover:bg-zinc-800'
                        >
                           <DotsVerticalIcon />
                        </div>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent>
                        <DropdownMenuLabel>Website Options</DropdownMenuLabel>

                        <DropdownMenuItem className='text-zinc-400'>
                           <EditIcon className='mr-2 h-4 w-4' />
                           <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='text-zinc-400'>
                           <TrashIcon className='mr-2 h-4 w-4' />
                           <span className=''>Delete from collection</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               )}
            </div>
         </div>
      </div>
   )
}

function Browser({
   url,
   title,
   icon,
}: {
   url: string
   title: string
   icon: string
}) {
   return (
      <div className='h-[70%] absolute bottom-0 w-[90%] rounded-t-md bg-[#D3E2FD] overflow-hidden'>
         <div className='flex gap-1 p-2'>
            <div className='h-2 w-2 rounded-full bg-red-400' />
            <div className='h-2 w-2 rounded-full bg-yellow-400' />
            <div className='h-2 w-2 rounded-full bg-green-400' />

            <div className='w-auto rounded-t-md bg-white absolute left-12 top-1 h-5 flex items-center px-1 gap-1'>
               <Image
                  alt={`${title} favicon`}
                  width='8'
                  height='8'
                  decoding='async'
                  className='object-contain rounded-sm'
                  src={icon}
               />

               <h1 className='text-[0.4rem] w-20 font-light line-clamp-1'>
                  {title}
               </h1>

               <p className='text-[0.4rem]'>&#x2715;</p>
            </div>
         </div>

         <div className='bg-white h-full rounded-t-md'>
            <div className='h-6 flex justify-between p-1'>
               <div className='w-14 flex items-center'>
                  <ArrowLeftIcon className='h-[0.5rem]' />
                  <ArrowRightIcon className='h-[0.5rem] text-zinc-400' />
                  <ReloadIcon className='h-[0.4rem]' />
               </div>

               <div className='flex-1 bg-[#E1E3EA] rounded-lg flex items-center px-1 justify-between'>
                  <div className='flex items-center gap-1'>
                     <div className='rounded-full bg-white h-[0.5rem] w-[0.5rem] flex justify-center items-center'>
                        <MixerHorizontalIcon className='h-[0.4rem] w-auto' />
                     </div>

                     <p className='text-[0.4rem] font-light'>{url}</p>
                  </div>

                  <span className='text-[0.4rem]'>&#9734;</span>
               </div>

               <div className='w-7 flex items-center justify-end'>
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
