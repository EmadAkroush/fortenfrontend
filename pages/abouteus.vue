<template>
  <section class="about-page bg-gray-50 text-gray-800">
    <!-- Hero Section -->
    <div class="hero-section relative overflow-hidden text-center py-20 px-6 sm:px-16">
      <div class="absolute inset-0 bg-gradient-to-b from-green-900/80 to-green-600/60 z-0"></div>
      <img
        src="/public/bg.jpg"
        alt="background"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div class="relative z-10 text-white max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">About <span class="text-green-300">Vestavex</span></h1>
        <p class="text-lg leading-relaxed">
          Empowering people to build wealth through innovation, transparency, and a trusted global network.
        </p>
      </div>
    </div>

    <!-- Company Overview -->
    <div class="max-w-5xl mx-auto py-16 px-6 sm:px-12 text-center">
      <h2 class="text-3xl font-bold text-green-700 mb-6">Who We Are</h2>
      <p class="text-gray-600 leading-relaxed text-lg">
        Vestavex is a next-generation investment ecosystem designed to provide sustainable growth opportunities
        for individuals around the world. We combine smart technology, financial expertise, and a
        community-driven reward model to make investing transparent, secure, and accessible to everyone.
        Through our structured bundles and the innovative VX Plan, investors can earn monthly returns,
        grow their portfolios, and achieve financial independence with confidence.
      </p>
    </div>

    <!-- Mission / Vision / Values -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 sm:px-12 py-16">
      <div class="card p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <i class="mdi mdi-rocket-launch text-4xl text-green-600 mb-3"></i>
        <h3 class="text-xl font-semibold mb-2">Our Mission</h3>
        <p class="text-gray-600 text-sm">
          To simplify digital investing and enable users to build long-term wealth through structured, ethical,
          and transparent financial growth systems.
        </p>
      </div>

      <div class="card p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <i class="mdi mdi-eye-outline text-4xl text-green-600 mb-3"></i>
        <h3 class="text-xl font-semibold mb-2">Our Vision</h3>
        <p class="text-gray-600 text-sm">
          To become a global leader in smart investment solutions by connecting people, technology, and
          sustainable growth strategies within one trusted ecosystem.
        </p>
      </div>

      <div class="card p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <i class="mdi mdi-shield-check-outline text-4xl text-green-600 mb-3"></i>
        <h3 class="text-xl font-semibold mb-2">Our Values</h3>
        <p class="text-gray-600 text-sm">
          We stand for integrity, transparency, innovation, and community. Our investors’ success is our
          ultimate measure of achievement.
        </p>
      </div>
    </div>

    <!-- Why Choose Vestavex -->
    <div class="why-section bg-white py-16 px-6 sm:px-12">
      <div class="max-w-6xl mx-auto text-center mb-10">
        <h2 class="text-3xl font-bold text-green-700 mb-4">Why Choose Vestavex</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          We are more than just an investment platform — we are a financial partner for your future.
          Our system is designed to maximize growth, minimize risk, and empower every investor to succeed.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div class="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition text-center">
          <i class="mdi mdi-lock-outline text-4xl text-green-700 mb-3"></i>
          <h3 class="font-semibold mb-2">Secure Transactions</h3>
          <p class="text-gray-600 text-sm">
            Advanced encryption and multi-layer protection for every transaction.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition text-center">
          <i class="mdi mdi-chart-line text-4xl text-green-700 mb-3"></i>
          <h3 class="font-semibold mb-2">Consistent Returns</h3>
          <p class="text-gray-600 text-sm">
            Monthly profits and dynamic plans to match your growth goals.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition text-center">
          <i class="mdi mdi-account-group-outline text-4xl text-green-700 mb-3"></i>
          <h3 class="font-semibold mb-2">Global Community</h3>
          <p class="text-gray-600 text-sm">
            Join thousands of investors building success through the VX Plan.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition text-center">
          <i class="mdi mdi-lightbulb-on-outline text-4xl text-green-700 mb-3"></i>
          <h3 class="font-semibold mb-2">Smart Innovation</h3>
          <p class="text-gray-600 text-sm">
            Data-driven tools and transparent analytics that keep you in control.
          </p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta bg-green-700 text-white text-center py-20 px-6 sm:px-16">
      <h2 class="text-3xl font-bold mb-4">Join the Future of Investment</h2>
      <p class="mb-6 max-w-2xl mx-auto text-gray-100">
        Start growing your wealth with a secure, transparent, and intelligent investment system.
      </p>
      <nuxt-link to="/addfunds">
        <Button label="Start Investing Now" icon="mdi mdi-arrow-right" class="p-button-success bg-white text-green-700 hover:bg-green-50" />
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style lang="scss" scoped>
.about-page {
  .hero-section {
    h1 {
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
  }
  .why-section i {
    transition: transform 0.2s ease;
  }
  .why-section:hover i {
    transform: scale(1.1);
  }
}
</style>
