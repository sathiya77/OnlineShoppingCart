import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // each item: { id, name, type, price, image }
  }),
  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + Number(item.price || 0), 0),
  },
  actions: {
    addToCart(product) {
      this.items.push(product)
    },
    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clearCart() {
      this.items = []
    },
  },
})
