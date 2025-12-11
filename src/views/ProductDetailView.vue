<template>
  <section v-if="product">
    <button class="back" @click="$router.push('/')">← Back to Products</button>

    <div class="detail-layout">
      <img
        :src="product.image"
        :alt="product.name"
        class="detail-image"
      />

      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p class="type">Type: {{ product.type }}</p>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <button @click="add(product)">Add to Cart</button>
      </div>
    </div>
  </section>

  <p v-else>Loading product...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()
const product = ref(null)

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

const add = (p) => {
  cart.addToCart(p)
}

onMounted(async () => {
  const res = await fetch('/products.json')
  const sections = await res.json()
  const allProducts = sections.flatMap((s) => s.products)
  product.value = allProducts.find((p) => p.id === route.params.id)
})
</script>

<style scoped>
.back {
  margin-bottom: 1rem;
  border: none;
  background: none;
  color: #2563eb;
  cursor: pointer;
}
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 2rem;
}
.detail-image {
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
}
.detail-info .price {
  font-size: 1.2rem;
  font-weight: 600;
}
button {
  padding: 0.5rem 0.9rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #1d4ed8;
}
@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}
</style>
