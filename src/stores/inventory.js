import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    ingredients: {
      milk: { name: 'Milk', unit: 'ml', amount: 10000 },
      coffee: { name: 'Coffee', unit: 'g', amount: 5000 },
      sugar: { name: 'Sugar', unit: 'g', amount: 3000 }
    },
    recipes: {
      espresso: {
        name: 'Espresso',
        ingredients: { coffee: 40 }
      },
      americano: {
        name: 'Americano',
        ingredients: { coffee: 40 }
      },
      latte: {
        name: 'Latte',
        ingredients: { milk: 200, coffee: 40 }
      },
      cappuccino: {
        name: 'Cappuccino',
        ingredients: { milk: 150, coffee: 40 }
      }
    }
  }),
  actions: {
    updateStock(ingredient, amount) {
      this.ingredients[ingredient.toLowerCase()].amount += amount
    },
    consumeIngredients(recipe) {
      if (!this.recipes[recipe]) {
        console.warn(`Recipe not found: ${recipe}`)
        return
      }
      for (const [ingredient, amount] of Object.entries(this.recipes[recipe].ingredients)) {
        if (this.ingredients[ingredient]) {
          this.ingredients[ingredient].amount -= amount
        }
      }
    },
    checkStock(recipe) {
      if (!this.recipes[recipe]) {
        console.warn(`Recipe not found: ${recipe}`)
        return true
      }
      for (const [ingredient, amount] of Object.entries(this.recipes[recipe].ingredients)) {
        if (!this.ingredients[ingredient] || this.ingredients[ingredient].amount < amount) {
          return false
        }
      }
      return true
    },
    addOrUpdateRecipe(code, recipe) {
      this.recipes[code] = recipe
    }
  },
  getters: {
    getIngredientStock: (state) => (ingredient) => {
      return state.ingredients[ingredient].amount
    },
    getAllIngredients: (state) => {
      return Object.values(state.ingredients)
    }
  }
})
