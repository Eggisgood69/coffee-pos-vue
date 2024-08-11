<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <RouterLink
            to="/"
            class="flex-shrink-0 flex items-center px-4"
            active-class="active-link"
          >
            Coffee Shop POS
          </RouterLink>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              to="/checkout"
              class="inline-flex items-center px-4 pt-1 border-b-2 border-transparent"
              active-class="active-link"
            >
              Checkout
            </RouterLink>
            <RouterLink
              to="/inventory"
              class="inline-flex items-center px-4 pt-1 border-b-2 border-transparent"
              active-class="active-link"
            >
              Inventory
            </RouterLink>
            <RouterLink
              to="/transactions"
              class="inline-flex items-center px-4 pt-1 border-b-2 border-transparent"
              active-class="active-link"
            >
              Transactions
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active-link {
  background-color: rgb(107 114 128);
  color: #fff;
}
</style>
