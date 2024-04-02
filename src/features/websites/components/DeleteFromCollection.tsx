'use client'
import { DeleteConfirmationDialog } from '@/components/DeleteDialog'
import { removeWebsiteFromCollection } from '@/features/websites/actions/removeWebsiteFromCollection'
import { useWebsiteStore } from '@/features/websites/store'
import { useState } from 'react'

export default function DeleteFromCollection() {
   const [loading, setLoading] = useState(false)
   const dialog = useWebsiteStore((s) => s.deleteWebsiteFromCollectionDialog)
   const closeDialog = useWebsiteStore(
      (s) => s.closeDeleteWebsiteFromCollectionDialog
   )

   async function onDeleteFromCollection() {
      if (!dialog.data) return

      setLoading(true)

      try {
         await removeWebsiteFromCollection({
            websiteId: dialog.data.website.id,
            slug: dialog.data.slug,
         })
         closeDialog()
      } finally {
         setLoading(false)
      }
   }

   return (
      <DeleteConfirmationDialog
         title='Remove Website from Collection'
         open={dialog.open}
         onClose={closeDialog}
         loading={loading}
         onDelete={onDeleteFromCollection}
      >
         <p>
            Are you sure you want to remove{' '}
            <span className='font-medium italic'>
               &quot;{dialog.data?.website?.name}&quot;
            </span>
            from this collection?
         </p>
      </DeleteConfirmationDialog>
   )
}
