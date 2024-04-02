import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'

type BaseProps = {
   title: string
   loading: boolean
   open: boolean
   onClose: () => void
   onDelete: () => void
}

type DeleteConfirmationDialogProps =
   | (BaseProps & {
        recordName: string
        children?: undefined
     })
   | (BaseProps & {
        recordName?: undefined
        children: React.ReactNode
     })

export function DeleteConfirmationDialog({
   open,
   title,
   onClose,
   onDelete,
   recordName,
   loading,
   children,
}: DeleteConfirmationDialogProps) {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className='space-y-5'>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {children ?? (
               <p>
                  Are you sure you want to delete{' '}
                  <span className='font-medium italic'>
                     &quot;{recordName}&quot;
                  </span>
                  ?
               </p>
            )}

            <div className='flex justify-end gap-2'>
               <Button
                  type='submit'
                  disabled={loading}
                  onClick={() => onClose()}
               >
                  Cancel
               </Button>

               <Button
                  onClick={() => {
                     onDelete()
                  }}
                  loading={loading}
                  variant='outline'
               >
                  Yes, delete
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}
