'use client'
import { DeleteConfirmationDialog } from '@/components/DeleteDialog'
import { removeWebsite } from '@/features/websites/actions/removeWebsite'
import { useWebsiteStore } from '@/features/websites/store'
import { useState } from 'react'

export default function DeleteWebsite() {
   const [loading, setLoading] = useState(false)
   const dialog = useWebsiteStore((s) => s.deleteWebsiteDialog)
   const closeDialog = useWebsiteStore((s) => s.closeDeleteWebsiteDialog)

   async function onDelete() {
      if (!dialog.data) return

      setLoading(true)

      try {
         await removeWebsite(dialog.data.id)
         closeDialog()
      } finally {
         setLoading(false)
      }
   }

   return (
      <DeleteConfirmationDialog
         title='Delete Website'
         recordName={dialog.data?.name || ''}
         open={dialog.open}
         onClose={closeDialog}
         loading={loading}
         onDelete={onDelete}
      />
   )
}
