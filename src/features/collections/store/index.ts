import { Collection } from '@/types'
import { create } from 'zustand'

type Store = {
   collectionDialog: {
      open: boolean
      data: Collection | null
   }
   openCollectionDialog: (data: Collection) => void
   closeCollectionDialog: () => void

   deleteCollectionDialog: {
      open: boolean
      data: Collection | null
   }
   openDeleteCollectionDialog: (data: Collection) => void
   closeDeleteCollectionDialog: () => void
}

export const useCollectionStore = create<Store>()((set) => ({
   collectionDialog: {
      open: false,
      data: null,
   },
   openCollectionDialog: (data: Collection) => {
      set({
         collectionDialog: {
            open: true,
            data,
         },
      })
   },
   closeCollectionDialog: () => {
      set({
         collectionDialog: {
            open: false,
            data: null,
         },
      })
   },

   deleteCollectionDialog: {
      open: false,
      data: null,
   },
   openDeleteCollectionDialog: (data: Collection) => {
      set({
         deleteCollectionDialog: {
            open: true,
            data,
         },
      })
   },
   closeDeleteCollectionDialog: () => {
      set({
         deleteCollectionDialog: {
            open: false,
            data: null,
         },
      })
   },
}))
