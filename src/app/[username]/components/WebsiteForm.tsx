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
import { WebsiteData, websiteSchema } from '@/app/[username]/model'
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
   loading,
   collections,
   onSubmit,
}: {
   loading: boolean
   onSubmit: (data: WebsiteData) => void
   collections: Collection[]
}) {
   const [loadingMetadata, setLoadingMetadata] = useState(false)
   const form = useForm<WebsiteData>({
      resolver: zodResolver(websiteSchema),
      defaultValues,
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
            className='space-y-8'
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
               name='name'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input required {...field} disabled={disabled} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

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

            <FormField
               control={form.control}
               name='favicon'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Favicon</FormLabel>
                     <FormControl>
                        <Input required {...field} disabled={disabled} />
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
                        <Input required {...field} disabled={disabled} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
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
