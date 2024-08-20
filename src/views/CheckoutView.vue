<script setup>
import { ref, computed, h } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'
import { useTransactionsStore } from '@/stores/transactions'
import { useInventoryStore } from '@/stores/inventory'
import CustomizeModal from '@/components/CustomizeModal.vue'

const checkoutStore = useCheckoutStore()
const transactionsStore = useTransactionsStore()
const inventoryStore = useInventoryStore()

const menuCategories = ref(['coffee', 'tea', 'food'])
const currentCategory = ref('coffee')

const menuItems = ref([
  {
    id: 1,
    code: 'espresso',
    name: '濃縮咖啡(Espresso)',
    basePrice: 80,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'coffee'
  },
  {
    id: 2,
    code: 'americano',
    name: '美式咖啡(Americano)',
    basePrice: 100,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'coffee'
  },
  {
    id: 3,
    code: 'latte',
    name: '拿鐵(Latte)',
    basePrice: 120,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'coffee'
  },
  {
    id: 4,
    code: 'cappuccino',
    name: '卡布奇諾(Cappuccino)',
    basePrice: 130,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'coffee'
  },
  {
    id: 5,
    code: 'black_tea',
    name: '紅茶(Black Tea)',
    basePrice: 30,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'tea'
  },
  {
    id: 6,
    code: 'green_tea',
    name: '綠茶(Green Tea)',
    basePrice: 30,
    sizes: ['小', '中', '大'],
    temperatures: ['熱', '冰'],
    sugarLevels: ['無糖', '微糖', '半糖', '正常'],
    iceLevels: ['去冰', '微冰', '少冰', '正常冰'],
    catrogry: 'tea'
  },
  {
    id: 7,
    code: 'blueberry_bagel',
    name: '藍莓貝果(Blueberry Bagel)',
    basePrice: 80,
    sizes: [],
    temperatures: ['常溫', '加熱'],
    sugarLevels: [],
    iceLevels: [],
    catrogry: 'food'
  }
])

const currentOrder = ref([])
const showCustomizeModal = ref(false)
const selectedItem = ref(null)

const orderTotal = computed(() => {
  return currentOrder.value.reduce((total, item) => total + calculateItemPrice(item), 0)
})

function openCustomizeModal(item) {
  selectedItem.value = item
  console.log('origin order: ', item)
  showCustomizeModal.value = true
}

function closeCustomizeModal() {
  showCustomizeModal.value = false
}

function addToOrder(item) {
  console.log('after order: ', item)
  currentOrder.value.push(item)
}

function removeFromOrder(index) {
  currentOrder.value.splice(index, 1)
}

function calculateItemPrice(item) {
  let price = item.basePrice
  if (item.customization.size === '中') price += 20
  if (item.customization.size === '大') price += 40
  return price
}

function completeOrder() {
  for (const item of currentOrder.value) {
    if (!inventoryStore.checkStock(item.code)) {
      alert(`Not enough ingredients for ${item.name}. Please restock.`)
      return
    }
  }
  for (const item of currentOrder.value) {
    inventoryStore.consumeIngredients(item.code)
  }

  const transaction = {
    // TODO: this will be issue when multi user create
    id: Date.now(),
    items: currentOrder.value.map((item) => ({
      ...item,
      price: calculateItemPrice(item)
    })),
    total: orderTotal.value,
    date: new Date().toISOString()
  }

  checkoutStore.completeOrder(transaction)
  transactionsStore.addTransaction(transaction)
  currentOrder.value = []
  alert('Order completed!')
}

const filteredMenuItems = computed(() => {
  return menuItems.value.filter((item) => item.catrogry === currentCategory.value)
})

function changeCategory(category) {
  currentCategory.value = category
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">Checkout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div class="mb-4">
          <nav class="flex space-x-6">
            <button
              v-for="category in menuCategories"
              :key="category"
              @click="changeCategory(category)"
              :class="[
                'bg-blue-500 text-gray-700 px-4 py-2 rounded-lg shadow-md font-bold text-lg',
                currentCategory === category
                  ? 'bg-blue-500 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              ]"
            >
              {{ category }}
            </button>
          </nav>
        </div>
        <h2 class="text-2xl font-semibold mb-2">Menu Items</h2>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="item in filteredMenuItems"
            :key="item.id"
            @click="openCustomizeModal(item)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-105"
          >
            {{ item.name }} - ${{ item.basePrice }}
          </button>
        </div>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Current Order</h2>
        <ul class="space-y-3">
          <li
            v-for="(item, index) in currentOrder"
            :key="index"
            class="flex justify-between items-center border-b-[1px] border-gray-300 pb-1"
          >
            <span>
              {{ item.name }} ({{ item.customization.size }}, {{ item.customization.temperature }},
              {{ item.customization.sugarLevel }}, {{ item.customization.iceLevel }}) - ${{
                calculateItemPrice(item)
              }}
            </span>
            <button
              @click="removeFromOrder(index)"
              class="text-white hover:bg-red-700 bg-red-500 px-2 py-1 rounded-lg hover:scale-105"
            >
              Remove
            </button>
          </li>
        </ul>
        <div class="mt-6">
          <p class="text-xl font-semibold">Total: $ {{ orderTotal }}</p>
          <button
            v-if="currentOrder.length > 0"
            @click="completeOrder"
            class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-105"
          >
            Complete Order
          </button>
          <button
            v-else
            id="complete-order"
            class="mt-3 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
    <CustomizeModal
      v-if="showCustomizeModal"
      :item="selectedItem"
      @add="addToOrder"
      @close="closeCustomizeModal"
    />
  </div>
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(2px);
  }
  50% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}
#complete-order:active {
  animation: shake 0.3s;
}
</style>
