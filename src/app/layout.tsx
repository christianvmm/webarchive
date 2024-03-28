import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'WebArchive',
   description: 'Your Bookmark Collection',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body className={cn(inter.className, 'bg-[#0D0D0D] text-white')}>
            {children}
         </body>
      </html>
   )
}
