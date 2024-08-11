'use client'
import { useState } from 'react'
import { generateIcon } from '@/utils'
import { cn } from '@/lib/utils'

export function WebsiteFavicon({
   name,
   favicon,

   width,
   height,
   className,
}: {
   favicon?: string | null
   name?: string
   width?: string | number
   height?: string | number
   className?: string
}) {
   const title = name ?? 'Unavailable'
   const [errorIcon, setErrorIcon] = useState(false)

   const icon = !favicon || errorIcon ? generateIcon(title) : favicon

   if (errorIcon || !favicon) {
      return (
         <img
            alt={`${title} favicon`}
            loading='lazy'
            width={width || '16'}
            height={height || '16'}
            decoding='async'
            className={cn('object-contain rounded-sm', className)}
            src={icon}
         />
      )
   }

   return (
      <img
         alt={`${title} favicon`}
         loading='lazy'
         width={width || '16'}
         height={height || '16'}
         decoding='async'
         className={cn('object-contain', className)}
         src={favicon}
         onError={() => {
            setErrorIcon(true)
         }}
      />
   )
}
