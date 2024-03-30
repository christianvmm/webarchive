'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, X, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export type OptionType = {
   label: string
   value: string
}

interface MultiSelectProps {
   options: OptionType[]
   selected: string[]
   onChange: (value: string[]) => void
   className?: string
}

function MultiSelect({
   options = [],
   selected,
   onChange,
   className,
   ...props
}: MultiSelectProps) {
   const [open, setOpen] = React.useState(false)
   const selectedOptions = options.filter((option) =>
      selected.includes(option.value)
   )

   const handleUnselect = (item: string) => {
      onChange(selected.filter((i) => i !== item))
   }

   return (
      <Popover open={open} onOpenChange={setOpen} {...props}>
         <PopoverTrigger asChild>
            <Button
               variant='outline'
               role='combobox'
               aria-expanded={open}
               className={`w-full justify-between min-h-10 h-auto`}
               onClick={() => setOpen(!open)}
            >
               <div className='flex gap-1 flex-wrap'>
                  {selectedOptions.map((option) => (
                     <Badge
                        variant='secondary'
                        key={option.value}
                        className='mr-1'
                        onClick={() => handleUnselect(option.value)}
                     >
                        {option.label}

                        <span
                           role='button'
                           className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                           onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                 handleUnselect(option.value)
                              }
                           }}
                           onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                           }}
                           onClick={() => handleUnselect(option.value)}
                        >
                           <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                        </span>
                     </Badge>
                  ))}
               </div>
               <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
            </Button>
         </PopoverTrigger>

         <PopoverContent className='w-full p-0'>
            <Command className={className}>
               <CommandInput placeholder='Search ...' />

               <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>

                  <CommandGroup className='max-h-64 overflow-auto'>
                     {options.map((option) => {
                        return (
                           <CommandItem
                              key={option.value}
                              onSelect={() => {
                                 onChange(
                                    selected.includes(option.value)
                                       ? selected.filter(
                                            (item) => item !== option.value
                                         )
                                       : [...selected, option.value]
                                 )
                                 setOpen(true)
                              }}
                           >
                              <Check
                                 className={cn(
                                    'mr-2 h-4 w-4',
                                    selected.includes(option.value)
                                       ? 'opacity-100'
                                       : 'opacity-0'
                                 )}
                              />
                              {option.label}
                           </CommandItem>
                        )
                     })}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export { MultiSelect }
