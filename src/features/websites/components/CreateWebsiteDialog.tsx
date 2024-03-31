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
import { WebsiteForm } from '@/features/websites/components/WebsiteForm'
import { WebsiteData } from '@/features/websites/model'
import { createWebsite } from '@/features/websites/actions/createWebsite'
import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateWebsiteDialog({
   collections = [],
   collection,
}: {
   collections: Collection[]
   collection?: Collection
}) {
   const [loading, setLoading] = useState(false)
   const { open, onOpenChange, onClose } = useDisclosure()

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
            <Button className='h-8 gap-1'>
               <PlusCircle className='h-5  w-5' />
               Add Website
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Website</DialogTitle>
            </DialogHeader>

            <WebsiteForm
               initialValues={{
                  collectionIds: collection
                     ? [collection.id.toString()]
                     : undefined,
               }}
               loading={loading}
               onSubmit={onSubmit}
               collections={collections}
            />
         </DialogContent>
      </Dialog>
   )
}
