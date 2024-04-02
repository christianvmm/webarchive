import FiltersBar from '@/app/[username]/components/FiltersBar'
import { Island } from '@/app/[username]/components/Island'
import { LoaderIcon } from 'lucide-react'

export default function LoadingSkeletons() {
   const skeletons = new Array(12).fill('')

   return (
      <div className='w-full h-full'>
         <FiltersBar belongsToUser numResults='...' />

         <div className='flex flex-col items-center w-full p-4 md:p-8 pt-0 h-[calc(100%-10rem)]'>
            <ul className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 m-auto justify-items-center w-full'>
               {skeletons.map((_, i) => {
                  return (
                     <li
                        className='rounded-xl shadow-lg w-full flex flex-col gap-2 transition-all  focus:outline-1'
                        key={i}
                     >
                        <div
                           className='rounded-lg bg-zinc-900 aspect-video w-full flex justify-center text-black font-medium
                           px-10 relative animate-pulse
                        '
                        ></div>

                        <div className='flex gap-4 place-items-center h-4' />
                     </li>
                  )
               })}
            </ul>

            <Island
               icon={
                  <LoaderIcon className='h-5 w-5 text-zinc-600 animate-spin' />
               }
               text='Loading...'
            />
         </div>
      </div>
   )
}
