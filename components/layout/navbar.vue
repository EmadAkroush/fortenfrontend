<template>
  <header class="navbar-wrapper sticky top-0 z-50 bg-white shadow-md backdrop-blur-md">
    <div class="flex items-center justify-between px-4 sm:px-10 py-3">
      <!-- ===== Left: Logo ===== -->
      <div class="flex items-center space-x-3">
        <img
          src="/public/Photo_1747641514372-3.png"
          alt="Logo"
          class="w-10 h-10 rounded-lg shadow-sm"
        />
        <span class="text-xl font-bold text-green-700 tracking-wide">Vestavex</span>
      </div>

      <!-- ===== Desktop Menu ===== -->
      <nav class="hidden md:flex items-center space-x-6">
        <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.route"
          custom
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            @click="item.command ? item.command() : navigate()"
            class="flex items-center transition-all duration-200 px-2 py-1 rounded-lg"
            :class="[
              activeRoute === item.route
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : item.command
                ? 'text-red-500 hover:text-red-700'
                : 'text-gray-700 hover:text-green-600',
            ]"
          >
            <i :class="[item.icon, 'text-xl mr-2']"></i>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </nav>

      <!-- ===== Right: Profile Menu ===== -->
      <div class="relative">
        <button
          @click="profileOpen = !profileOpen"
          class="flex items-center space-x-2 hover:bg-green-50 p-2 rounded-full transition-all"
        >
          <i class="mdi mdi-account-circle text-3xl text-green-700"></i>
          <span class="hidden sm:inline text-sm font-medium text-gray-700">My Account</span>
          <i class="mdi mdi-chevron-down text-gray-500 text-sm"></i>
        </button>

        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="profileOpen"
            class="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50"
          >
            <nuxt-link
              to="/account"
              class="block px-4 py-2 text-gray-700 hover:bg-green-50 transition"
            >
              <i class="mdi mdi-view-dashboard-outline mr-2 text-green-600"></i>
              Dashboard
            </nuxt-link>
            <hr class="my-1 border-gray-200" />
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              <i class="mdi mdi-logout mr-2"></i>
              Logout
            </button>
          </div>
        </transition>
      </div>

      <!-- ===== Mobile Menu Button ===== -->
      <button
        class="md:hidden p-2 rounded-md text-gray-700 hover:bg-green-100"
        @click="mobileMenu = !mobileMenu"
      >
        <i class="mdi mdi-menu text-2xl"></i>
      </button>
    </div>

    <!-- ===== Mobile Dropdown Menu ===== -->
    <transition name="slide">
      <nav
        v-if="mobileMenu"
        class="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2"
      >
        <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.route"
          custom
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            @click="item.command ? item.command() : navigate(); mobileMenu = false"
            class="flex items-center py-2 px-3 rounded-lg transition-all"
            :class="[
              activeRoute === item.route
                ? 'bg-green-50 text-green-700 font-semibold'
                : item.command
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-green-50',
            ]"
          >
            <i :class="[item.icon, 'text-lg mr-3']"></i>
            {{ item.label }}
          </a>
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeRoute = computed(() => route.path)
const profileOpen = ref(false)
const mobileMenu = ref(false)

const logout = () => {
  alert('You have been logged out.')
  // localStorage.removeItem('token')
  // navigateTo('/login')
}

const items = ref([
  { label: 'Home', route: '/', icon: 'mdi mdi-home-outline' },
  { label: 'Bundles', route: '/bundles', icon: 'mdi mdi-package-variant-closed' },
  { label: 'Add Funds', route: '/addfunds', icon: 'mdi mdi-wallet-plus-outline' },
  { label: 'About Us', route: '/abouteus', icon: 'mdi mdi-information-outline' },
  { label: 'Support', route: '/support', icon: 'mdi mdi-lifebuoy' },
  { label: 'Logout', icon: 'mdi mdi-logout', command: logout },
])
</script>

<style scoped lang="scss">
.navbar-wrapper {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
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
</style>
