import { WebsiteWithCollections } from '@/types'
import { create } from 'zustand'

type Store = {
   websiteDialog: {
      open: boolean
      data: WebsiteWithCollections | null
   }
   openWebsiteDialog: (data: WebsiteWithCollections) => void
   closeWebsiteDialog: () => void
}

export const useWebsiteStore = create<Store>()((set) => ({
   websiteDialog: {
      open: false,
      data: null,
   },
   openWebsiteDialog: (data: WebsiteWithCollections) => {
      set({
         websiteDialog: {
            open: true,
            data,
         },
      })
   },
   closeWebsiteDialog: () => {
      set({
         websiteDialog: {
            open: false,
            data: null,
         },
      })
   },
}))
