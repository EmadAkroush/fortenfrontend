<template>
  <section class="forten-about overflow-hidden">
    <!-- HERO -->
    <div class="hero relative flex flex-col items-center justify-center text-center px-6 py-28 sm:py-40">
      <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="/" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-[#030915]/90 to-[#012d2e]/80"></div>

      <div class="relative z-10 max-w-3xl">
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 animate-fade-in">
          The <span class="text-[#00d1b2]">Future</span> of  
          <span class="text-[#f4b000]">Smart Investing</span>
        </h1>
        <p class="text-gray-300 text-lg sm:text-xl leading-relaxed">
          Forten is redefining how people grow wealth — securely, transparently, and intelligently.
        </p>
      </div>
    </div>

    <!-- WHO WE ARE -->
    <div class="bg-[#0b1a2e] text-gray-200 py-20 px-6 sm:px-12 text-center">
      <div class="max-w-5xl mx-auto space-y-6">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#00d1b2] mb-4">Who We Are</h2>
        <p class="text-gray-300 text-lg leading-relaxed">
          <strong>Forten</strong> is an advanced blockchain-based investment ecosystem built for those who
          seek consistent growth and real transparency.  
          Through automated compounding, AI-driven analytics, and community-powered expansion,
          Forten gives investors total control over their financial evolution.
        </p>
      </div>
    </div>

    <!-- TIMELINE / EVOLUTION -->
    <div class="relative bg-[#101f3c] py-24 px-6 sm:px-12">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#f4b000] text-center mb-16">Our Evolution</h2>
        <div class="timeline relative">
          <div
            v-for="(milestone, i) in milestones"
            :key="i"
            class="timeline-item flex flex-col sm:flex-row items-center mb-16 relative"
          >
            <!-- Circle with Icon -->
            <div class="circle absolute left-1/2 sm:left-1 transform -translate-x-1/2 sm:translate-x-0 sm:relative bg-[#00d1b2] w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-[#0d2345]">
              <i :class="milestone.icon" class="text-2xl text-[#0d2345]"></i>
            </div>

            <!-- Content -->
            <div
              class="content bg-[#0d2345] border border-[#0e3642] rounded-2xl p-6 sm:ml-12 sm:w-2/3 hover:shadow-xl hover:shadow-[#00d1b2]/20 transition-all duration-300"
            >
              <h3 class="text-xl font-semibold text-[#f4b000] mb-2">{{ milestone.title }}</h3>
              <p class="text-gray-300 text-sm leading-relaxed">{{ milestone.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VALUES -->
    <div class="bg-gradient-to-r from-[#071326] via-[#102a38] to-[#0b1a2e] py-20 px-6 sm:px-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        <div
          v-for="(v, i) in values"
          :key="i"
          class="p-8 bg-[#0f203a] rounded-2xl shadow-md hover:shadow-[#f4b000]/20 hover:-translate-y-2 transition-all duration-300"
        >
          <i :class="v.icon" class="text-5xl mb-4 text-[#f4b000]"></i>
          <h3 class="text-xl font-semibold text-[#00d1b2] mb-2">{{ v.title }}</h3>
          <p class="text-gray-400 text-sm">{{ v.text }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center py-24 bg-[#00d1b2] text-[#0a1325] px-6 sm:px-16">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4">Join the Intelligent Investment Revolution</h2>
      <p class="text-gray-800 mb-6 max-w-2xl mx-auto">
        Start growing your wealth with daily compounding and total transparency — powered by Forten’s smart finance system.
      </p>
      <nuxt-link to="/addfunds">
        <Button
          label="Start Now"
          icon="mdi mdi-arrow-right"
          class="p-button-success bg-[#0a1325] text-[#00d1b2] hover:bg-[#14294b] border-none px-6 py-3 rounded-full font-semibold transition"
        />
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";

const milestones = [
  {
    title: "Founded with Purpose",
    icon: "mdi mdi-lightbulb-on-outline",
    text: "Forten was created to revolutionize traditional investing by combining blockchain transparency with real financial intelligence.",
  },
  {
    title: "Empowering Global Investors",
    icon: "mdi mdi-earth",
    text: "We introduced accessible crypto-based bundles allowing everyone to grow wealth through daily compounded profits.",
  },
  {
    title: "Building Trust Worldwide",
    icon: "mdi mdi-shield-check-outline",
    text: "Our platform evolved into a global ecosystem driven by trust, community engagement, and sustainable profitability.",
  },
  {
    title: "Expanding Through Innovation",
    icon: "mdi mdi-rocket-launch-outline",
    text: "Forten continues to innovate with AI-powered tools, smart contracts, and a strong referral system that rewards active investors.",
  },
];
const values = [
  {
    icon: "mdi mdi-shield-check-outline",
    title: "Trust & Transparency",
    text: "Every transaction is secured and verifiable on-chain, ensuring full financial clarity for all users.",
  },
  {
    icon: "mdi mdi-finance",
    title: "Smart Profit Growth",
    text: "Daily automated compounding means your funds work harder — even while you rest.",
  },
  {
    icon: "mdi mdi-earth",
    title: "Global Community",
    text: "Thousands of investors worldwide growing together under one unified system.",
  },
];
</script>

<style scoped lang="scss">
.forten-about {
  font-family: "Inter", sans-serif;

  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #00d1b2, #f4b000);
    opacity: 0.5;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
