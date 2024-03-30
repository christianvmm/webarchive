'use client'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import { Collection } from '@/types'
import { WebsiteForm } from '@/app/features/websites/components/WebsiteForm'
import { WebsiteData } from '@/app/features/websites/model'
import { useState } from 'react'
import { useWebsiteStore } from '@/app/features/websites/store'
import { updateWebsite } from '@/app/features/websites/actions/updateWebsite'

export default function UpdateWebsiteDialog({
   collections = [],
}: {
   collections: Collection[]
}) {
   const [loading, setLoading] = useState(false)
   const websiteDialog = useWebsiteStore((s) => s.websiteDialog)
   const onClose = useWebsiteStore((s) => s.closeWebsiteDialog)

   async function onSubmit(data: WebsiteData) {
      if (!websiteDialog.data) return
      setLoading(true)

      try {
         await updateWebsite({ ...data, id: websiteDialog.data.id })
         onClose()
      } catch (err) {
         if (err instanceof Error) {
            console.log(err.message)
         }
      } finally {
         setLoading(false)
      }
   }

   const { data } = websiteDialog
   const initialValues: WebsiteData | undefined = data
      ? {
           name: data.name,
           url: data.url,
           favicon: data.favicon ?? '',
           image: data.image ?? '',
           collectionIds: data.collectionIds.map((id) => id.toString()),
        }
      : undefined

   return (
      <Dialog open={websiteDialog.open} onOpenChange={() => onClose()}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Update Website</DialogTitle>
            </DialogHeader>

            <WebsiteForm
               initialValues={initialValues}
               loading={loading}
               onSubmit={onSubmit}
               collections={collections}
            />
         </DialogContent>
      </Dialog>
   )
}
