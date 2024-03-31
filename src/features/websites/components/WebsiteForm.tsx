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
import { MultiSelect } from '@/components/ui/multiselect'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSiteMetadata } from '@/utils'
import { WebsiteData, websiteSchema } from '@/features/websites/model'
import { useState } from 'react'
import { Collection } from '@/types'

const defaultValues: WebsiteData = {
   name: '',
   url: '',
   favicon: '',
   image: '',
   collectionIds: [],
}

export function WebsiteForm({
   initialValues,
   loading,
   collections,
   onSubmit,
}: {
   initialValues?: WebsiteData
   loading: boolean
   onSubmit: (data: WebsiteData) => void
   collections: Collection[]
}) {
   const [loadingMetadata, setLoadingMetadata] = useState(false)
   const form = useForm<WebsiteData>({
      resolver: zodResolver(websiteSchema),
      defaultValues: initialValues ?? defaultValues,
   })

   async function updateMetadata(url: string) {
      try {
         new URL(url)

         setLoadingMetadata(true)
         const metadata = await getSiteMetadata(url)

         if (metadata) {
            form.setValue('name', metadata.title ?? '')
            form.setValue('favicon', metadata.favicon ?? '')
            form.setValue('image', metadata.image ?? '')
         }

         setLoadingMetadata(false)
      } catch {}
   }

   const disabled = loadingMetadata || loading

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
            noValidate
         >
            <FormField
               control={form.control}
               name='url'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>URL</FormLabel>
                     <FormControl>
                        <Input
                           required
                           {...field}
                           onChange={(e) => {
                              updateMetadata(e.target.value)
                              field.onChange(e)
                           }}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='image'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Image</FormLabel>
                     <FormControl>
                        <div className='rounded-lg aspect-video w-full bg-zinc-900'>
                           {field.value && (
                              <img
                                 src={field.value}
                                 alt='Website OG Image'
                                 className='rounded-lg aspect-video w-full object-center object-cover'
                              />
                           )}
                        </div>
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className='flex gap-4 w-full items-start'>
               <FormField
                  control={form.control}
                  name='favicon'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                           <div className='h-10 w-10 p-1 bg-zinc-900 rounded-md'>
                              {field.value && (
                                 <img
                                    src={field.value}
                                    alt='Website Favicon'
                                    className='rounded-lg aspect-square w-full h-full object-center'
                                 />
                              )}
                           </div>
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
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
               name='collectionIds'
               render={({ field }) => {
                  return (
                     <FormItem>
                        <FormLabel>Save in collection</FormLabel>

                        <MultiSelect
                           options={collections.map((collection) => ({
                              value: collection.id.toString(),
                              label: collection.name,
                           }))}
                           selected={field.value}
                           onChange={(values) => {
                              form.setValue('collectionIds', values)
                           }}
                           className='w-full'
                        />

                        <FormMessage />
                     </FormItem>
                  )
               }}
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
