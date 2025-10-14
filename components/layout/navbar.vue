<template>
  <header
    class="forten-navbar fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/10"
  >
    <div
      class="container mx-auto flex items-center justify-between px-4 sm:px-10 py-3"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img
          src="/public/Photo_1747641514372-3.png"
          alt="Logo"
          class="w-10 h-10 rounded-lg shadow-sm"
        />
        <span
          class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-lime-300 text-transparent bg-clip-text tracking-wide"
          >Forten</span
        >
      </div>

      <!-- Desktop Menu -->
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
            class="nav-link"
            :class="[
              activeRoute === item.route
                ? 'active'
                : item.command
                ? 'logout'
                : 'default',
            ]"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </nav>

      <!-- Profile (Desktop + Mobile) -->
      <div class="relative flex items-center gap-2">
        <!-- Profile Button -->
        <button
          @click="profileOpen = !profileOpen"
          class="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition"
        >
          <i class="mdi mdi-account-circle text-3xl text-white"></i>
          <span class="hidden md:inline text-sm font-medium text-white">My Account</span>
          <i class="mdi mdi-chevron-down text-gray-300 hidden md:inline"></i>
        </button>

        <!-- Profile Dropdown -->
        <transition name="fade">
          <div
            v-if="profileOpen"
            class="absolute right-0 mt-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50"
          >
            <nuxt-link
              to="/account"
              class="block px-4 py-2 text-gray-700 hover:bg-green-50"
              @click="profileOpen = false"
            >
              <i class="mdi mdi-view-dashboard-outline mr-2 text-green-600"></i>
              Dashboard
            </nuxt-link>
            <hr class="my-1 border-gray-200" />
            <button
              @click="logout(); profileOpen = false"
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <i class="mdi mdi-logout mr-2"></i>
              Logout
            </button>
          </div>
        </transition>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
          @click="mobileMenu = !mobileMenu"
        >
          <i class="mdi mdi-menu text-2xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="slide">
      <nav
        v-if="mobileMenu"
        class="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-4 space-y-3 text-white"
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
                ? 'bg-white/10 text-emerald-300 font-semibold'
                : item.command
                ? 'text-red-400 hover:bg-red-900/30'
                : 'text-gray-200 hover:text-white hover:bg-white/5',
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
.forten-navbar {
  background: linear-gradient(to right, rgba(7, 12, 20, 0.85), rgba(16, 30, 50, 0.85));
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #e5e7eb;
  transition: all 0.2s ease;
  height: 40px;
}
.nav-link i {
  font-size: 18px;
  position: relative;
  top: 0.5px;
}
.nav-link.default:hover {
  color: #a7f3d0;
}
.nav-link.active {
  color: #6ee7b7;
  border-bottom: 2px solid #6ee7b7;
}
.nav-link.logout {
  color: #f87171;
}
.nav-link.logout:hover {
  color: #fecaca;
}

/* Animations */
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
