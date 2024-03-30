import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

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
         <body className={cn(inter.className, 'bg-background text-white')}>
            {children}
         </body>
      </html>
   )
}
