<template>
  <section>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Checkout</h1>
      <button class="back" @click="router.push('/')">← Back to Products</button>
    </div>
    
    <table v-if="cart.items.length" class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Type</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id + Math.random()">
          <td class="prod-cell">
            <img :src="item.image" :alt="item.name" class="thumb" />
            <span>{{ item.name }}</span>
          </td>
          <td>{{ item.type }}</td>
          <td>{{ formatPrice(item.price) }}</td>
          <td>
            <button class="remove" @click="cart.removeFromCart(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="total-label">Total</td>
          <td colspan="2" class="total-value">{{ formatPrice(cart.totalPrice) }}</td>
        </tr>
      </tfoot>
    </table>

    <p v-else>Your cart is empty.</p>
  </section>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
</script>

<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.cart-table th,
.cart-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.prod-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 0.375rem;
}
.remove {
  border: none;
  background: none;
  color: #dc2626;
  cursor: pointer;
}
.total-label {
  text-align: right;
  font-weight: 600;
}
.total-value {
  font-weight: 700;
}
button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
}
</style>
