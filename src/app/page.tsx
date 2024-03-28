import Navbar from '@/app/components/Navbar'
import Sites from '@/app/components/Sites'
import { collections } from '@/data'
import { Website } from '@/types'
import { getSiteMetadata } from '@/utils'
import { Suspense } from 'react'

export default async function Home() {
   const urls = [
      'https://www.christianvm.dev',
      'https://folderart.christianvm.dev',
      'https://www.spacedrive.com/',
      'https://github.com/',
      'https://animations.dev/',
      'https://vercel.com/',
      'https://roadmap.sh/frontend',
      'https://react-svgr.com/',
      'https://timestwelve.xyz/',
      'https://developer.apple.com/design/resources/',
      'https://layers.to/explore/trending',
      'https://endless.design/',
      'https://www.ogimage.gallery/',
      'https://www.radix-ui.com/colors',
      'https://www.facebook.com/',
   ]

   const results = await Promise.all(urls.map((url) => getSiteMetadata(url)))
   const successResults = results.filter((r) => r !== null) as Website[]

   return (
      <main className='min-h-screen flex justify-between w-full pointer-events-auto'>
         <Navbar collections={collections} />

         <Suspense>
            <Sites sites={successResults} collections={collections} />
         </Suspense>
      </main>
   )
}
