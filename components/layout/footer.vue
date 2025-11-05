<template>
  <footer class="finalxcard-footer relative overflow-hidden text-gray-300">
    <!-- Background Layer -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0b2a1b]/90 to-[#03140c]/95 backdrop-blur-2xl"></div>
    <div class="absolute -top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl"></div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-3 mb-3">
          <img src="/public/newlogo.png" alt="Logo" class="w-10 h-10 rounded-lg shadow-sm" />
          <h2 class="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-lime-400 bg-clip-text text-transparent">
            finalxcard
          </h2>
        </div>
        <p class="text-sm text-gray-400 leading-relaxed max-w-xs">
          Empowering investors worldwide through transparent, intelligent, and secure financial growth systems.
        </p>

     
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="footer-heading">Quick Links</h3>
        <ul class="space-y-2">
          <li><nuxt-link to="/" class="footer-link"><i class="mdi mdi-home-outline mr-2 text-emerald-400"></i>Home</nuxt-link></li>
          <li><nuxt-link to="/packages" class="footer-link"><i class="mdi mdi-package-variant-closed mr-2 text-emerald-400"></i>Packages</nuxt-link></li>
          <li><nuxt-link to="/abouteus" class="footer-link"><i class="mdi mdi-information-outline mr-2 text-emerald-400"></i>About Us</nuxt-link></li>
          <li><nuxt-link to="/support" class="footer-link"><i class="mdi mdi-lifebuoy mr-2 text-emerald-400"></i>Support</nuxt-link></li>
        </ul>
      </div>

     

      <!-- Contact -->
      <div>
        <h3 class="footer-heading">Contact</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-3">
            <i class="mdi mdi-email-outline text-emerald-400 text-xl"></i>
            <a href="mailto:support@finalxcard.io" class="footer-link">support@finalxcard.io</a>
          </li>
         
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="relative border-t border-white/10 py-4 text-center text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-6 z-10">
      <p>© {{ currentYear }} finalxcard. All Rights Reserved.</p>
      <!-- <div class="flex gap-5 mt-2 sm:mt-0">
        <a href="#" class="hover:text-emerald-300 transition">Privacy Policy</a>
        <a href="#" class="hover:text-emerald-300 transition">Terms</a>
      </div> -->
    </div>

    <!-- Bottom Animated Line -->
    <div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-400 via-emerald-400 to-green-600 animate-neon"></div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="scss">
.finalxcard-footer {
  position: relative;
  color: #e5e7eb;
  font-family: "Inter", sans-serif;

  .footer-heading {
    font-weight: 600;
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .footer-link {
    display: flex;
    align-items: center;
    color: #bdbdbd;
    font-size: 14px;
    transition: color 0.2s ease;
    &:hover {
      color: #a7f3d0;
    }
  }

  .social {
    color: #a7f3d0;
    font-size: 20px;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.15);
      color: #6ee7b7;
    }
  }

  @keyframes neon-move {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .animate-neon {
    background-size: 200% 200%;
    animation: neon-move 5s linear infinite;
  }

  @media (max-width: 650px) {
    text-align: center;
    .footer-link {
      justify-content: center;
    }
    .social {
      justify-content: center;
    }
  }
}
</style>
