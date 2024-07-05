'use client'
import { Button } from '@/components/ui/button'
import { useNavbarStore } from '@/features/misc/store'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export default function ToggleNavbarButton() {
   const openNavbar = useNavbarStore((s) => s.openNavbar)

   return (
      <div className='block md:hidden'>
         <Button
            className='h-8 w-8 p-0 flex items-center justify-center'
            variant='ghost'
            title='Toggle Navbar'
            onClick={() => openNavbar()}
         >
            <HamburgerMenuIcon className='h-3.5 w-3.5' />
         </Button>
      </div>
   )
}
