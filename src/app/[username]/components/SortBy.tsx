'use client'
import { Button } from '@/components/ui/button'
import { ListFilter } from 'lucide-react'
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const sorts = [
   {
      value: '',
      label: 'Date added',
   },
   {
      value: 'name',
      label: 'Name',
   },
   {
      value: 'url',
      label: 'URL',
   },
]

export function SortBy() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const { replace } = useRouter()

   const [value, setValue] = useState(
      searchParams.get('sortBy')?.toString() ?? ''
   )

   function handleSort(sortBy: string) {
      setValue(sortBy)

      const params = new URLSearchParams(searchParams)

      if (sortBy) {
         params.set('sortBy', sortBy)
      } else {
         params.delete('sortBy')
      }

      replace(`${pathname}?${params.toString()}`)
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className='hidden md:flex'>
            <Button variant='outline' size='sm' className='h-8 gap-1'>
               <ListFilter className='h-3.5 w-3.5' />
               <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Sort by
               </span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {sorts.map((option) => {
               return (
                  <DropdownMenuCheckboxItem
                     key={option.value}
                     checked={value === option.value}
                     onClick={() => handleSort(option.value)}
                  >
                     {option.label}
                  </DropdownMenuCheckboxItem>
               )
            })}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
