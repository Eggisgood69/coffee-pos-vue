<script setup>
import NavBar from './views/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Navigation Bar優化 -->
    <NavBar />
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <RouterView></RouterView>
      </div>
    </main>
  </div>
</template>
