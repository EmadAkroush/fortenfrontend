<template>
  <footer class="footer-container">
    <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-4 gap-10 text-gray-300">
      <!-- Brand / Description -->
      <div>
        <h2 class="text-2xl font-bold text-green-500 mb-3">Vestavex</h2>
        <p class="text-sm leading-relaxed text-gray-400">
          A smart investment platform where technology meets network growth.
          Invest securely, earn passively, and grow your team through the VX Plan.
        </p>

        <div class="flex items-center gap-3 mt-4">
          <a href="#" aria-label="Telegram" class="hover:text-green-400 transition">
            <i class="mdi mdi-telegram text-2xl"></i>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-green-400 transition">
            <i class="mdi mdi-twitter text-2xl"></i>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-green-400 transition">
            <i class="mdi mdi-linkedin text-2xl"></i>
          </a>
          <a href="#" aria-label="YouTube" class="hover:text-green-400 transition">
            <i class="mdi mdi-youtube text-2xl"></i>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><nuxt-link to="/" class="footer-link">Home</nuxt-link></li>
          <li><nuxt-link to="/bundles" class="footer-link">Bundles</nuxt-link></li>
          <li><nuxt-link to="/addfunds" class="footer-link">Add Funds</nuxt-link></li>
          <li><nuxt-link to="/vxplan" class="footer-link">VX Plan</nuxt-link></li>
          <li><nuxt-link to="/support" class="footer-link">Support</nuxt-link></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Legal</h3>
        <ul class="space-y-2">
          <li><a href="#" class="footer-link">Privacy Policy</a></li>
          <li><a href="#" class="footer-link">Terms of Service</a></li>
          <li><a href="#" class="footer-link">AML & KYC Policy</a></li>
          <li><a href="#" class="footer-link">Risk Disclosure</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Contact Us</h3>
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <i class="mdi mdi-email-outline text-green-500 text-xl"></i>
            <a href="mailto:support@vestavex.com" class="footer-link">support@vestavex.com</a>
          </li>
          <li class="flex items-center gap-3">
            <i class="mdi mdi-map-marker text-green-500 text-xl"></i>
            <span>London, UK</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="mdi mdi-phone text-green-500 text-xl"></i>
            <a href="tel:+447712345678" class="footer-link">+44 7712 345678</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm flex flex-col sm:flex-row justify-between items-center px-6">
      <p>© {{ new Date().getFullYear() }} Vestavex. All Rights Reserved.</p>
      <div class="flex gap-4 mt-2 sm:mt-0">
        <a href="#" class="hover:text-green-400 transition">Privacy Policy</a>
        <a href="#" class="hover:text-green-400 transition">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed here yet — static footer.
</script>

<style lang="scss" scoped>
.footer-container {
  background-color: #0a0a0a;
  color: white;
  position: relative;
  bottom: 0;
  font-family: "Inter", sans-serif;
}

.footer-link {
  color: #bdbdbd;
  font-size: 14px;
  transition: color 0.2s ease;
  &:hover {
    color: #10b981;
  }
}

@media only screen and (max-width: 650px) {
  .footer-container {
    text-align: center;
    .footer-link {
      display: inline-block;
      margin: 4px 0;
    }
  }
}
</style>
