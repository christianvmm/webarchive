'use client'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { useDisclosure } from '@/hooks'
import { Collection } from '@/types'
import { WebsiteForm } from '@/app/[username]/components/WebsiteForm'
import { WebsiteData } from '@/app/[username]/model'
import { createWebsite } from '@/app/[username]/actions/createWebsite'
import { useState } from 'react'

export default function CreateWebsite({
   collections = [],
}: {
   collections: Collection[]
}) {
   const [loading, setLoading] = useState(false)
   const { open, onOpenChange, onOpen, onClose } = useDisclosure()

   async function onSubmit(data: WebsiteData) {
      setLoading(true)

      try {
         await createWebsite(data)
         onClose()
      } catch (err) {
         if (err instanceof Error) {
            console.log(err.message)
         }
      } finally {
         setLoading(false)
      }
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogTrigger asChild>
            <button
               className='flex flex-row items-center justify-between gap-1 place-items-between bg-white rounded-full pl-2 pr-3 py-2 r text-black transition-all hover:opacity-80 z-50 duration-700'
               onClick={() => onOpen()}
            >
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
            </button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Website</DialogTitle>
            </DialogHeader>

            <WebsiteForm
               loading={loading}
               onSubmit={onSubmit}
               collections={collections}
            />
         </DialogContent>
      </Dialog>
   )
}
