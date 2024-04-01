import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import { updateCollection } from '@/features/collections/actions/updateCollection'
import { CollectionForm } from '@/features/collections/components/CollectionForm'
import { CollectionData } from '@/features/collections/model'
import { useCollectionStore } from '@/features/collections/store'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slugify } from '@/utils/slugify'

export default function UpdateCollection() {
   const [loading, setLoading] = useState(false)
   const collectionDialog = useCollectionStore((s) => s.collectionDialog)
   const onClose = useCollectionStore((s) => s.closeCollectionDialog)
   const pathname = usePathname()
   const [_, currentSlug] = pathname.split('/').filter((p) => p !== '')

   async function onSubmit(data: CollectionData) {
      if (!collectionDialog.data) return
      setLoading(true)

      try {
         const shouldRedirect =
            currentSlug === collectionDialog.data.slug &&
            slugify(data.name) !== collectionDialog.data.slug

         await updateCollection(
            { ...data, id: collectionDialog.data.id },
            shouldRedirect
         )
         onClose()
      } catch (err) {
         if (err instanceof Error) {
            console.log(err.message)
         }
      } finally {
         setLoading(false)
      }
   }
   const { data } = collectionDialog
   const initialValues: CollectionData | undefined = data
      ? {
           name: data.name,
           icon: data.icon ?? '',
           visibility: data.visibility,
        }
      : undefined

   return (
      <Dialog open={collectionDialog.open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Update Collection</DialogTitle>
            </DialogHeader>

            <CollectionForm
               initialValues={initialValues}
               loading={loading}
               onSubmit={onSubmit}
            />
         </DialogContent>
      </Dialog>
   )
}
