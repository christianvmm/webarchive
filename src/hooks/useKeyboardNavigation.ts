import { Collection } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useKeyboardNavigation(collections: Collection[]) {
   const router = useRouter()
   const searchParams = useSearchParams()

   useEffect(() => {
      const fn = (e: KeyboardEvent) => {
         const isNumber = /^[0-9]$/i.test(e.key)
         if (!isNumber) return

         const idx = Number(e.key)

         if (idx === 0) {
            router.push(`/`)
         } else {
            const collection = collections[idx - 1]

            if (collection) {
               const params = new URLSearchParams(searchParams)
               params.set('collection', collection.id.toString())
               router.push(`/?${params.toString()}`)
            }
         }
      }

      window.addEventListener('keydown', fn)
      return () => window.removeEventListener('keydown', fn)
   }, [searchParams, router, collections])
}
