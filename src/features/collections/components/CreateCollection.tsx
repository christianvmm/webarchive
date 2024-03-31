import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { createCollection } from '@/features/collections/actions/createCollection'
import { CollectionForm } from '@/features/collections/components/CollectionForm'
import { CollectionData } from '@/features/collections/model'
import { useDisclosure } from '@/hooks'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

export default function CreateCollection() {
   const [loading, setLoading] = useState(false)
   const { open, onOpenChange, onClose } = useDisclosure()

   async function onSubmit(data: CollectionData) {
      setLoading(true)

      try {
         await createCollection(data)
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
            <Button size='sm' variant='outline' className='h-8 gap-1'>
               <PlusCircle className='h-3.5  w-3.5' />

               <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Create
               </span>
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Collection</DialogTitle>
            </DialogHeader>

            <CollectionForm loading={loading} onSubmit={onSubmit} />
         </DialogContent>
      </Dialog>
   )
}
