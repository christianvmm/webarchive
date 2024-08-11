import { WebsiteWithCollections } from '@/types'
import { create } from 'zustand'
import { setCookie } from 'cookies-next'
import { STORAGE_PREFIX } from '@/consts'

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

   deleteWebsiteFromCollectionDialog: {
      open: boolean
      data: {
         website: WebsiteWithCollections
         slug: string
      } | null
   }
   openDeleteWebsiteFromCollectionDialog: (data: {
      website: WebsiteWithCollections
      slug: string
   }) => void
   closeDeleteWebsiteFromCollectionDialog: () => void

   listView: string
   setListView: (v: string) => void
}

export const useWebsiteStore = create<Store>()((set) => ({
   listView: 'cards',
   websiteDialog: {
      open: false,
      data: null,
   },
   openWebsiteDialog: (data) => {
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
   openDeleteWebsiteDialog: (data) => {
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

   deleteWebsiteFromCollectionDialog: {
      open: false,
      data: null,
   },
   openDeleteWebsiteFromCollectionDialog: (data) => {
      set({
         deleteWebsiteFromCollectionDialog: {
            open: true,
            data,
         },
      })
   },
   closeDeleteWebsiteFromCollectionDialog: () => {
      set({
         deleteWebsiteFromCollectionDialog: {
            open: false,
            data: null,
         },
      })
   },

   setListView(value) {
      setCookie(`${STORAGE_PREFIX}_list_view`, value)
      set({ listView: value })
   },
}))
