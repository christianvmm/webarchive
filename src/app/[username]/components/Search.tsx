'use client'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Search() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const { replace } = useRouter()

   const handleSearch = useDebounce((term: string) => {
      const params = new URLSearchParams(searchParams)

      if (term) {
         params.set('query', term)
      } else {
         params.delete('query')
      }

      replace(`${pathname}?${params.toString()}`)
   }, 500)

   return (
      <div className='relative'>
         <SearchIcon className='absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />

         <Input
            type='search'
            placeholder='Search websites...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            onChange={(e) => {
               handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
         />
      </div>
   )
}
