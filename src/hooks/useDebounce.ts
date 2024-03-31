import { useRef } from 'react'

export function useDebounce<T extends (...params: any[]) => void>(
   fn: T,
   delay = 1000
) {
   const debounceRef = useRef<ReturnType<typeof setTimeout>>()

   return function (this: any, ...args: any[]) {
      if (debounceRef.current) {
         clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
         fn.apply(this, args)
      }, delay)
   } as T
}
