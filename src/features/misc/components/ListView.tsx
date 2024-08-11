'use client'

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
} from '@/components/ui/select'
import { SelectTrigger } from '@radix-ui/react-select'
import { LayoutGrid, ListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWebsiteStore } from '@/features/websites/store'

const listViews = [
   {
      value: 'cards',
      icon: LayoutGrid,
   },
   {
      value: 'list',
      icon: ListIcon,
   },
]

export function ListView({ disabled }: { disabled?: boolean }) {
   const listView = useWebsiteStore((s) => s.listView)
   const setListView = useWebsiteStore((s) => s.setListView)
   const view = listViews.find((l) => l.value === listView)!

   return (
      <Select value={listView} onValueChange={setListView}>
         <SelectTrigger asChild className='hidden md:flex'>
            <Button
               variant='outline'
               size='icon'
               className='h-8'
               disabled={disabled}
            >
               <view.icon className='w-4 h-4' />
               <span className='sr-only'>List view</span>
            </Button>
         </SelectTrigger>

         <SelectContent>
            <SelectGroup>
               <SelectLabel>Select list view</SelectLabel>

               {listViews.map((view) => {
                  return (
                     <SelectItem value={view.value} key={view.value}>
                        <div className='flex items-center gap-2'>
                           <view.icon className='h-4 w-4' />

                           <span className='text-sm text-muted-foreground'>
                              as {view.value}
                           </span>
                        </div>
                     </SelectItem>
                  )
               })}
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}
