<template>
  <div class="home">
    <Head>
      <Title>Vestavex — Smart Network Investment</Title>
      <Meta name="description" content="Join Vestavex: a smart investment platform built for network growth and passive income." />
    </Head>

    <!-- HERO SECTION -->
    <section class="relative text-center flex flex-col items-center justify-center min-h-[85vh] px-4 bg-cover bg-center bg-no-repeat rounded-b-3xl shadow-md"
      style="background-image: url('/public/bg.jpg')">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 rounded-b-3xl"></div>

      <div class="relative z-10 max-w-2xl text-white">
        <p class="uppercase tracking-widest text-green-400 font-semibold mb-2">
          Vestavex
        </p>
        <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
          Smart investment platform <br />
          with network-driven profit growth
        </h1>
        <p class="text-gray-200 text-base sm:text-lg mb-6">
          Multiply your earnings through intelligent compounding and binary growth — powered by VX Plan.
        </p>
        <Button
          label="Sign up now and start investing"
          icon="mdi mdi-arrow-right"
          class="p-button-success px-5 py-3 text-base sm:text-lg rounded-full font-medium hover:scale-105 transition"
          @click="goToSignup"
        />
      </div>

      <!-- Floating illustration -->
      <div class="absolute bottom-[-50px] sm:bottom-[-70px]">
        <img src="/public/Team work-bro.svg" alt="Investment Illustration" class="w-36 sm:w-40 drop-shadow-lg" />
      </div>
    </section>

    <!-- FEATURE SECTION -->
    <section class="secmain py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Platform Highlights
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="flex flex-col items-center bg-gray-50 rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition"
          >
            <i :class="feature.icon" class="text-5xl text-green-600 mb-4"></i>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BRAND SLIDER -->
    <section class="py-10 bg-gray-50 border-t">
      <HomeBrands />
    </section>
  </div>
</template>

<script setup>
import HomeBrands from "@/components/home/brands.vue"
import { useRouter } from 'vue-router'
const router = useRouter()

const goToSignup = () => router.push('/signup')

// Features (بر اساس سند PDF)
const features = [
  {
    title: "Tech & Trading",
    icon: "mdi mdi-cog-outline",
    description:
      "Our unique combination of technology and trading strategies delivers consistent passive income to investors.",
  },
  {
    title: "VX Plan System",
    icon: "mdi mdi-family-tree",
    description:
      "Earn through your network with our binary VX Plan — unlock up to 10x rewards based on your investment.",
  },
  {
    title: "Bundles & Packages",
    icon: "mdi mdi-package-variant-closed",
    description:
      "Choose from flexible investment bundles with monthly yields from 3% up to 8%.",
  },
  {
    title: "Secure Wallet",
    icon: "mdi mdi-wallet-outline",
    description:
      "Deposit and withdraw safely with built-in wallet support and transparent fees.",
  },
  {
    title: "Real-Time Dashboard",
    icon: "mdi mdi-chart-line",
    description:
      "Track your portfolio, team volume, and growth progress in real-time through an intuitive dashboard.",
  },
  {
    title: "24/7 Support",
    icon: "mdi mdi-lifebuoy",
    description:
      "Our team is always here to help — contact us anytime for guidance and account assistance.",
  },
]
</script>

<style lang="scss">
.home {
  box-sizing: border-box;
  background-color: #eef1fb;

  .secmain {
    box-sizing: border-box;
  }

  .p-button-success {
    background-color: #0b6d20 !important;
    border: none;
  }
  .p-button-success:hover {
    background-color: #0d8024 !important;
  }

  .Htext {
    color: white;
  }
}

@media only screen and (max-width: 650px) {
  .home {
    text-align: center;

    h1 {
      font-size: 28px;
      line-height: 1.4;
    }
    .p-button {
      font-size: 14px;
      padding: 0.5rem 1.5rem;
    }
  }
}
</style>
