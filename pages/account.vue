<template>
  <div class="forten-account min-h-screen flex flex-col bg-gradient-to-br from-[#040b0f] via-[#07191f] to-[#020608] text-gray-200">
    <!-- ===== Global Navbar ===== -->
    <!-- <header class="main-navbar fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
      <div class="flex justify-between items-center px-4 sm:px-10 py-3">
        <div class="flex items-center gap-2">
          <img src="/" alt="Logo" class="w-10 h-10 rounded-md shadow-sm" />
          <span class="font-bold text-emerald-400 text-xl tracking-wide">Forten</span>
        </div>

        <nav class="hidden md:flex gap-6 text-sm">
          <NuxtLink to="/" class="menu-link"><i class="mdi mdi-home-outline"></i> Home</NuxtLink>
          <NuxtLink to="/bundles" class="menu-link"><i class="mdi mdi-package-variant-closed"></i> Bundles</NuxtLink>
          <NuxtLink to="/addfunds" class="menu-link"><i class="mdi mdi-wallet-plus-outline"></i> Add Funds</NuxtLink>
          <NuxtLink to="/abouteus" class="menu-link"><i class="mdi mdi-information-outline"></i> About</NuxtLink>
          <NuxtLink to="/support" class="menu-link"><i class="mdi mdi-lifebuoy"></i> Support</NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <i class="mdi mdi-account-circle text-3xl text-emerald-400"></i>
          <span class="hidden sm:block text-sm text-gray-300">My Account</span>
        </div>

        <button class="md:hidden text-gray-200" @click="showMobileMenu = !showMobileMenu">
          <i class="mdi mdi-menu text-2xl"></i>
        </button>
      </div>

      <transition name="slide">
        <nav v-if="showMobileMenu" class="bg-black/70 border-t border-white/10 flex flex-col text-center py-2 space-y-2 md:hidden">
          <NuxtLink v-for="item in navItems" :key="item.route" :to="item.route" class="menu-link">{{ item.label }}</NuxtLink>
        </nav>
      </transition>
    </header> -->

    <!-- ===== Dashboard Topbar ===== -->
    <div class="dashboard-topbar mt-20 sm:mt-24 px-4 sm:px-16 py-3 sm:py-4 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10">
      <div>
        <h1 class="text-2xl font-bold text-emerald-400">Dashboard</h1>
        <p class="text-sm text-gray-400">Welcome back, <span class="text-emerald-300">Investor</span></p>
      </div>
      <button
        class="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        @click="goToAddFunds"
      >
        <i class="mdi mdi-wallet-plus-outline"></i> Add Funds
      </button>
    </div>

    <!-- ===== Dashboard Layout ===== -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 px-4 sm:px-16 py-6 sm:py-10">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col col-span-3 bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-5 sticky top-32 h-fit">
        <div class="text-center mb-6 sm:mb-8">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-400 to-cyan-400 text-black flex items-center justify-center text-xl sm:text-2xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            FT
          </div>
          <h3 class="mt-3 font-semibold text-white">John Miller</h3>
          <p class="text-xs text-gray-400">Investor ID: <span class="text-emerald-300">#FR1084</span></p>
        </div>

        <nav class="space-y-1 sm:space-y-2">
          <div
            v-for="item in menuItems"
            :key="item.key"
            @click="setActive(item.key)"
            class="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg cursor-pointer transition-all group"
            :class="activeItem === item.key ? 'bg-gradient-to-r from-emerald-400/30 to-cyan-300/10 border-l-4 border-emerald-400 text-emerald-300' : 'hover:bg-white/5 text-gray-300'"
          >
            <i :class="[item.icon, 'text-lg transition-transform group-hover:scale-110']"></i>
            <span class="font-medium text-sm sm:text-base">{{ item.label }}</span>
          </div>
        </nav>

        <div class="mt-8 border-t border-white/10 pt-4">
          <button @click="logout" class="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition">
            <i class="mdi mdi-logout"></i> Logout
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="col-span-9 bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 relative overflow-hidden">
        <transition name="fade-slide" mode="out-in">
          <component :is="currentComponent" :key="activeItem" />
        </transition>
      </main>
    </div>

    <!-- ===== Mobile Bottom Menu (پدینگ کمتر) ===== -->
    <nav
      class="lg:hidden fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl px-1.5 py-[2px] flex justify-around items-center text-sm shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
    >
      <div
        v-for="item in menuItems"
        :key="item.key"
        @click="setActive(item.key)"
        class="flex flex-col items-center cursor-pointer transition"
        :class="{ 'text-emerald-300': activeItem === item.key, 'text-gray-400': activeItem !== item.key }"
      >
        <i :class="[item.icon, 'text-lg mb-0.5']"></i>
        <span class="text-[9px] leading-tight">{{ item.label }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import AccountPerformance from "@/components/account/performance.vue"
import AccountPortfolio from "@/components/account/portfolio.vue"
import AccountCashout from "@/components/account/cashout.vue"
import AccountHistory from "@/components/account/history.vue"
import AccountSetting from "@/components/account/setting.vue"
import AccountVxPlan from "@/components/account/vxplan.vue"

const showMobileMenu = ref(false)
const activeItem = ref("performance")

const menuItems = ref([
  { key: "performance", label: "Dashboard", icon: "mdi mdi-finance" },
  { key: "portfolio", label: "My Invest", icon: "mdi mdi-currency-usd" },
  { key: "cashout", label: "Cashout", icon: "mdi mdi-bank-transfer-out" },
  { key: "history", label: "History", icon: "mdi mdi-history" },
  { key: "vxplan", label: "Referral", icon: "mdi mdi-family-tree" },
  { key: "setting", label: "Settings", icon: "mdi mdi-cog-outline" },
])

const navItems = [
  { label: "Home", route: "/" },
  { label: "Bundles", route: "/bundles" },
  { label: "Add Funds", route: "/addfunds" },
  { label: "About", route: "/abouteus" },
  { label: "Support", route: "/support" },
]

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
  }
})

const logout = () => alert("You have been logged out.")
const goToAddFunds = () => (window.location.href = "/addfunds")
</script>

<style scoped lang="scss">
.menu-link {
  color: #d1d5db;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}
.menu-link:hover {
  color: #5ff0c7;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
