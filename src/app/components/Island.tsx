'use client'
import { cn } from '@/utils'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Icon() {
   return (
      <div className='h-6 w-6'>
         <div className='w-full h-full'>
            <canvas
               style={{
                  verticalAlign: 'top',
                  width: '24px',
                  height: '24px',
               }}
            ></canvas>
         </div>
      </div>
   )
}

function Divider() {
   return <div className='h-5 w-px bg-white/10'></div>
}

function CloseButton() {
   return (
      <Link
         className='flex h-6 w-6 absolute right-3 items-center justify-center rounded-full bg-white/10 transition-all'
         href='/'
      >
         <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-white/50 transition-all group-hover:text-white/80'
         >
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M1.42259 0.244078C1.09715 -0.0813592 0.569515 -0.0813592 0.244078 0.244078C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244079 8.57741C-0.0813589 8.90285 -0.0813589 9.43048 0.244079 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43048 10.0814 9.75592 9.75592C10.0814 9.43048 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078Z'
               fill='currentColor'
            ></path>
         </svg>
      </Link>
   )
}

const baseWidth = 110
const widthFactor = 9

export function Island({ text }: { text?: string }) {
   const prevLength = useRef<number>(0)
   const currLength = text?.length || 0

   useEffect(() => {
      prevLength.current = text?.length ?? 0
   }, [text])

   return (
      <AnimatePresence>
         {currLength && (
            <motion.div
               key={text}
               initial={{
                  width:
                     prevLength.current === 0
                        ? 0
                        : baseWidth + prevLength.current * widthFactor,
               }}
               animate={{
                  width: baseWidth + currLength * widthFactor,
               }}
               exit={{
                  width: 0,
               }}
               className={cn(
                  'fixed bottom-10 z-[100] pointer-events-auto justify-between overflow-hidden rounded-full shadow-xl shadow-black/[0.05] outline-none backdrop-blur',
                  !text?.length && 'hidden'
               )}
            >
               <div className='flex w-full bg-zinc-900 items-center h-10 px-3 group relative'>
                  <div className='flex items-center h-full gap-3'>
                     <Icon />
                     <Divider />
                  </div>

                  <motion.p
                     key={text}
                     initial={{
                        opacity: 0,
                     }}
                     transition={{
                        duration: 1,
                     }}
                     animate={{
                        opacity: 1,
                     }}
                     className='whitespace-nowrap pl-3 font-semibold text-white'
                  >
                     {text}
                  </motion.p>

                  <CloseButton />
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}
