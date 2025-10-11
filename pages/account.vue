<template>
  <div class="account-container min-h-screen bg-gray-50 flex flex-col">
    <!-- Breadcrumb -->
    <div class="px-6 sm:px-20 pt-6 text-sm text-gray-600">
      <nuxt-link to="/" class="text-green-700 font-semibold hover:underline">Home /</nuxt-link>
      <span> Account </span>
    </div>

    <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-6 px-6 sm:px-20 py-6">
      <!-- ===== Sidebar (Desktop) ===== -->
      <aside
        class="hidden sm:flex sm:flex-col sm:col-span-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sticky top-8 h-fit"
      >
        <div class="text-center mb-6">
          <div
            class="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-700 text-3xl font-bold"
          >
            VX
          </div>
          <h2 class="mt-3 font-semibold text-gray-800">My Account</h2>
          <p class="text-xs text-gray-500">Smart Investment Member</p>
        </div>

        <div class="divide-y divide-gray-100">
          <div
            v-for="item in menuItems"
            :key="item.key"
            @click="setActive(item.key)"
            class="flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all"
            :class="{
              'bg-green-50 text-green-700 font-semibold border-l-4 border-green-500 shadow-sm': activeItem === item.key,
              'text-gray-600 hover:bg-gray-100': activeItem !== item.key
            }"
          >
            <i :class="item.icon + ' text-xl mr-3'"></i>
            <span>{{ item.label }}</span>
          </div>

          <div
            class="flex items-center px-4 py-3 text-red-500 cursor-pointer hover:bg-red-50 mt-2 rounded-lg"
            @click="logout"
          >
            <i class="mdi mdi-logout text-xl mr-3"></i>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      <!-- ===== Main Content ===== -->
      <main class="sm:col-span-9 bg-white rounded-2xl shadow-sm p-4 sm:p-6 relative overflow-hidden">
        <transition name="fade-slide" mode="out-in">
          <component :is="currentComponent" :key="activeItem" />
        </transition>
      </main>
    </div>

    <!-- ===== Mobile Navigation ===== -->
    <nav
      class="sm:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 flex justify-around items-center py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-50"
    >
      <div
        v-for="item in menuItems"
        :key="item.key"
        class="flex flex-col items-center cursor-pointer text-gray-500 transition-all"
        :class="{ 'text-green-700 font-semibold': activeItem === item.key }"
        @click="setActive(item.key)"
      >
        <i :class="item.icon" class="text-2xl mb-1"></i>
        <span class="text-xs">{{ item.label }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// ==== Import Components ====
import AccountPerformance from "@/components/account/performance.vue"
import AccountPortfolio from "@/components/account/portfolio.vue"
import AccountCashout from "@/components/account/cashout.vue"
import AccountHistory from "@/components/account/history.vue"
import AccountSetting from "@/components/account/setting.vue"
import AccountVxPlan from "@/components/account/vxplan.vue"

// ==== Menu Items ====
const menuItems = ref([
  { key: "performance", label: "Performance", icon: "mdi mdi-chart-bar" },
  { key: "portfolio", label: "Portfolio", icon: "mdi mdi-currency-usd" },
  { key: "cashout", label: "Cashout", icon: "mdi mdi-cash-minus" },
  { key: "history", label: "History", icon: "mdi mdi-history" },
  { key: "vxplan", label: "VX Plan", icon: "mdi mdi-family-tree" },
  { key: "setting", label: "Setting", icon: "mdi mdi-account-cog-outline" },
])

const activeItem = ref("performance")

const setActive = (key) => {
  activeItem.value = key
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const currentComponent = computed(() => {
  switch (activeItem.value) {
    case "performance":
      return AccountPerformance
    case "portfolio":
      return AccountPortfolio
    case "cashout":
      return AccountCashout
    case "history":
      return AccountHistory
    case "vxplan":
      return AccountVxPlan
    case "setting":
      return AccountSetting
    default:
      return {
        template: `<div class="text-center text-gray-400 py-20">Select an item from the menu.</div>`,
      }
  }
})

const logout = () => {
  if (confirm("Are you sure you want to log out?")) {
    alert("You have been logged out successfully.")
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
