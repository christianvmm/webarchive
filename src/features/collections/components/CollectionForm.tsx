'use client'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CollectionData, collectionSchema } from '@/features/collections/model'
import ICONS, { icons } from '@/consts/icons'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { memo } from 'react'
import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectValue,
   SelectItem,
} from '@/components/ui/select'
import { VISIBILITY } from '@/consts'

const defaultValues: CollectionData = {
   name: '',
   visibility: VISIBILITY.PRIVATE,
   icon: 'BookmarkFilledIcon',
}

export function CollectionForm({
   initialValues,
   loading,
   onSubmit,
}: {
   initialValues?: CollectionData
   loading: boolean
   onSubmit: (data: CollectionData) => void
}) {
   const form = useForm<CollectionData>({
      resolver: zodResolver(collectionSchema),
      defaultValues: initialValues ?? defaultValues,
   })

   const disabled = loading
   const icon = form.watch('icon')

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
            noValidate
         >
            <div className='flex gap-4 w-full items-start'>
               <FormField
                  control={form.control}
                  name='icon'
                  render={({ field }) => {
                     const Icon = ICONS[field.value]

                     return (
                        <FormItem>
                           <FormLabel>Icon</FormLabel>
                           <FormControl>
                              <div className='h-10 w-10 p-1 bg-zinc-900 rounded-md'>
                                 {field.value && (
                                    <div className='bg-zinc-800 flex items-center text-center justify-center rounded-md aspect-square'>
                                       {Icon ? <Icon /> : null}
                                    </div>
                                 )}
                              </div>
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )
                  }}
               />

               <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                     <FormItem className='flex-1'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input required {...field} disabled={disabled} />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <FormField
               control={form.control}
               name='visibility'
               render={({ field }) => (
                  <FormItem className='flex-1'>
                     <FormLabel>Visibility</FormLabel>
                     <FormControl>
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        >
                           <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Visibility' />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value={VISIBILITY.PUBLIC}>
                                 Public
                              </SelectItem>
                              <SelectItem value={VISIBILITY.PRIVATE}>
                                 Private
                              </SelectItem>
                              <SelectItem value={VISIBILITY.HIDDEN}>
                                 Hidden
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <IconsList
               selectedIcon={icon}
               setValue={(v) => form.setValue('icon', v)}
            />

            <div className='flex justify-end'>
               <Button type='submit' disabled={disabled} loading={loading}>
                  Save
               </Button>
            </div>
         </form>
      </Form>
   )
}

const IconsList = memo(
   ({
      selectedIcon,
      setValue,
   }: {
      selectedIcon: string
      setValue: (value: string) => void
   }) => {
      return (
         <div className='grid grid-cols-10 gap-2 max-h-32 overflow-scroll'>
            {icons.map((icon) => {
               const selected = selectedIcon === icon.value

               return (
                  <TooltipProvider key={icon.value}>
                     <Tooltip>
                        <TooltipTrigger type='button'>
                           <div
                              className={cn(
                                 'bg-zinc-800 flex items-center text-center justify-center rounded-md aspect-square',
                                 selected && 'border border-blue-500'
                              )}
                              onClick={() => {
                                 setValue(icon.value)
                              }}
                           >
                              <icon.component className='h-4 w-4' />
                           </div>
                        </TooltipTrigger>

                        <TooltipContent>
                           <p>{icon.value}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )
            })}
         </div>
      )
   },
   (prevProps, nextProps) => prevProps.selectedIcon === nextProps.selectedIcon
)

IconsList.displayName = 'IconsList'
