<template>
  <section class="features py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2 class="text-green-700 text-3xl sm:text-4xl font-bold mb-12">
        Key Features
      </h2>

      <!-- Features Row -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-stretch"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card relative bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between text-left hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div>
            <div
              class="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 mb-5"
            >
              <i :class="feature.icon" class="text-3xl text-green-600"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
          <div class="mt-6">
            <a
              href="#"
              class="inline-flex items-center text-green-700 text-sm font-semibold hover:text-green-900 transition"
            >
              Learn More
              <i class="mdi mdi-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ویژگی‌ها بر اساس سند PDF
const features = [
  {
    title: "Smart Investment",
    icon: "mdi mdi-chart-line",
    description:
      "Earn up to 8% monthly with automated, data-driven investment strategies managed through secure smart systems.",
  },
  {
    title: "VX Plan System",
    icon: "mdi mdi-family-tree",
    description:
      "Our binary network system empowers members to earn 10x returns through structured team growth and balanced branches.",
  },
  {
    title: "Secure Wallet",
    icon: "mdi mdi-wallet-outline",
    description:
      "Add funds and withdraw easily with bank-level encryption, 2FA, and transparent 7% fee on withdrawals.",
  },
  {
    title: "Global Network",
    icon: "mdi mdi-earth",
    description:
      "Vestavex connects investors worldwide — build your team, track progress, and grow together on a global scale.",
  },
]
</script>

<style lang="scss" scoped>
.features {
  background: linear-gradient(180deg, #f8fafc 0%, #eef1fb 100%);
  .feature-card {
    border: 1px solid #e5e7eb;
  }
  h2 {
    color: #0b6d20;
  }
  .feature-card:hover {
    border-color: #0b6d20;
  }
}

@media (max-width: 650px) {
  .features {
    padding: 2rem 1rem;
    .feature-card {
      text-align: center;
    }
  }
}
</style>
