import { WebsiteWithCollections } from '@/types'
import { create } from 'zustand'

type Store = {
   websiteDialog: {
      open: boolean
      data: WebsiteWithCollections | null
   }
   openWebsiteDialog: (data: WebsiteWithCollections) => void
   closeWebsiteDialog: () => void

   deleteWebsiteDialog: {
      open: boolean
      data: WebsiteWithCollections | null
   }
   openDeleteWebsiteDialog: (data: WebsiteWithCollections) => void
   closeDeleteWebsiteDialog: () => void
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

   deleteWebsiteDialog: {
      open: false,
      data: null,
   },
   openDeleteWebsiteDialog: (data: WebsiteWithCollections) => {
      set({
         deleteWebsiteDialog: {
            open: true,
            data,
         },
      })
   },
   closeDeleteWebsiteDialog: () => {
      set({
         deleteWebsiteDialog: {
            open: false,
            data: null,
         },
      })
   },
}))
