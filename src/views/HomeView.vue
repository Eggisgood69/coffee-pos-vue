<script setup>
import HomeViewSlot from './HomeViewSlot.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-center mb-10">Welcome to Coffee Shop POS</h1>
    <div class="grid grid-col-1 md:grid-col-3 gap-6">
      <RouterLink to="/checkout">
        <HomeViewSlot>
          <template #icon>
            <i class="fas fa-cash-register text-4xl mb-2"></i>
          </template>
          <template #title>
            <h2 class="text-3xl">Checkout</h2>
          </template>
          <template #description>
            <p class="mt-2">Process orders and payments</p>
          </template>
        </HomeViewSlot>
      </RouterLink>

      <RouterLink to="/inventory">
        <HomeViewSlot>
          <template #icon>
            <i class="fas fa-box-open text-4xl mb-2"></i>
          </template>
          <template #title>
            <h2 class="text-3xl">Inventory</h2>
          </template>
          <template #description>
            <p class="mt-2">View and manage inventory</p>
          </template>
        </HomeViewSlot>
      </RouterLink>

      <RouterLink to="/transactions">
        <HomeViewSlot>
          <template #icon>
            <i class="fa-solid fa-clock-rotate-left text-4xl mb-2"></i>
          </template>
          <template #title>
            <h2 class="text-3xl">Transactions</h2>
          </template>
          <template #description>
            <p class="mt-2">View sales history</p>
          </template>
        </HomeViewSlot>
      </RouterLink>
    </div>
  </div>
</template>
