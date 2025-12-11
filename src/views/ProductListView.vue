<template>
  <section>
    <h1>Products</h1>

    <div
      v-for="section in sections"
      :key="section.section"
      class="product-section"
    >
      <h2>{{ section.section }}</h2>
      <div class="product-grid">
        <article
          v-for="product in section.products"
          :key="product.id"
          class="product-card"
        >
          <RouterLink :to="`/products/${product.id}`">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
          </RouterLink>
          <h3>{{ product.name }}</h3>
          <p class="type">{{ product.type }}</p>
          <p class="price">{{ formatPrice(product.price) }}</p>
          <button @click="add(product)">Add to Cart</button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const sections = ref([])
const cart = useCartStore()

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

const add = (product) => {
  cart.addToCart(product)
}

onMounted(async () => {
  const res = await fetch('/products.json')
  sections.value = await res.json()
})
</script>

<style scoped>
.product-section {
  margin-bottom: 2rem;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 0.375rem;
}
.price {
  font-weight: 600;
}
.type {
  font-size: 0.85rem;
  color: #6b7280;
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
button:hover {
  background-color: #1d4ed8;
}
</style>
