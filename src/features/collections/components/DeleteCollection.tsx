'use client'
import { DeleteConfirmationDialog } from '@/components/DeleteDialog'
import { removeCollection } from '@/features/collections/actions/removeCollection'
import { useCollectionStore } from '@/features/collections/store'
import { useState } from 'react'

export default function DeleteCollection() {
   const [loading, setLoading] = useState(false)
   const dialog = useCollectionStore((s) => s.deleteCollectionDialog)
   const closeDialog = useCollectionStore((s) => s.closeDeleteCollectionDialog)

   async function onDelete() {
      if (!dialog.data) return

      setLoading(true)

      try {
         await removeCollection(dialog.data.id)
         closeDialog()
      } finally {
         setLoading(false)
      }
   }

   return (
      <DeleteConfirmationDialog
         title='Delete collection'
         recordName={dialog.data?.name || ''}
         open={dialog.open}
         onClose={closeDialog}
         loading={loading}
         onDelete={onDelete}
      />
   )
}
