import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Product, CartItem } from '../client/model/types'

//Add items
//Keep track of cart items

type CartState = {
  items: CartItem[]
  addItem: (cartItems: CartItem[]) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (cartItems) =>
        set((state) => {
          return { items: cartItems }
        }),
      clearCart: () => {
        set((state) => {
          return { items: [] }
        })
      },
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
