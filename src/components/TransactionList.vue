<script setup>
import { defineProps } from 'vue'
import TransactionItem from './TransactionItem.vue'

const props = defineProps(['transactions'])
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Transaction History</h2>
    <div class="flex justify-end mb-2">
    <div class="font-bold mr-4">Total Orders: {{ transactions.length}}</div>
    </div>
    <div v-if="transactions.length === 0" class="text-gray-500">No transactions yet.</div>
    <TransactionItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
  </div>
</template>
