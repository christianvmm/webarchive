'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { login } from '@/features/auth/actions'

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginForm() {
   const form = useForm<LoginData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })
   const [loading, setLoading] = useState(false)

   async function onSubmit(data: LoginData) {
      setLoading(true)

      try {
         await login(data)
      } catch (err) {
         if (err instanceof Error) {
            form.setError('password', { message: err.message })
         }

         setLoading(false)
      }
   }

   return (
      <FormProvider {...form}>
         <form
            className='grid gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
         >
            <div className='grid gap-2'>
               <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                     <FormItem className='flex-1'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              required
                              {...field}
                              placeholder='m@example.com'
                           />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className='grid gap-2'>
               <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                     <FormItem className='flex-1'>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input required {...field} type='password' />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <Button type='submit' className='w-full' loading={loading}>
               Login
            </Button>

            {/* <Button variant='outline' className='w-full'>
         Login with Google
      </Button> */}
         </form>
      </FormProvider>
   )
}
