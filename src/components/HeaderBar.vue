<template>
  <header class="header">
    <div class="header-left">
      <RouterLink to="/" class="logo-link">
        <img
          src="/logos/buhler-logo.svg"
          alt="Buhler logo"
          class="logo"
        />
      </RouterLink>
    </div>
    <div class="header-center">
      <span>{{ nowFormatted }}</span>
    </div>
    <div class="header-right">
      <RouterLink to="/checkout" class="cart-link">
        Cart ({{ cart.itemCount }})
      </RouterLink>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

export default {
  components: { RouterLink },
  setup() {
    const cart = useCartStore()

    const nowFormatted = ref('')
    let timerId

    const updateNow = () => {
      const now = new Date()
      nowFormatted.value = now.toLocaleString()
    }

    onMounted(() => {
      updateNow()
      timerId = setInterval(updateNow, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timerId)
    })

    return {
      cart,
      nowFormatted
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo {
  height: 32px;
}
.logo-link {
  display: inline-flex;
  align-items: center;
}
.header-center {
  font-size: 0.9rem;
  color: #4b5563;
}
.cart-link {
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}
.cart-link:hover {
  text-decoration: underline;
}
</style>
