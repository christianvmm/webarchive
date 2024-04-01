'use client'

import { create } from 'zustand'

type Store = {
   open: boolean
   openNavbar: () => void
   closeNavbar: () => void
}

export const useNavbarStore = create<Store>()((set) => ({
   open: false,
   openNavbar: () => {
      set({ open: true })
   },
   closeNavbar: () => {
      set({ open: false })
   },
}))
