<template>
  <div class="finalxcard-home font-sans text-gray-100 bg-[#0a1325] overflow-hidden">
    <!-- ===== HERO SECTION ===== -->
    <section
      class="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 overflow-hidden"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a1325] via-[#0f2040] to-[#0a1325] opacity-95"></div>
      <div class="relative z-10 max-w-3xl animate-fade-in">
        <h1
          class="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
        >
          Empower Your <span class="text-[#00c6ae]">Wealth</span><br />
          with <span class="text-[#f4b000]">finalxcard</span>
        </h1>
        <p class="text-gray-300 text-lg sm:text-xl mb-8 opacity-90">
          Smart investment with daily compounded profit and a powerful referral system.
        </p>
        <Button
          label="Start Investing"
          icon="mdi mdi-arrow-right"
          class="p-button-rounded p-button-lg finalxcard-btn shadow-lg hover:shadow-[0_0_25px_rgba(244,176,0,0.5)]"
          @click="router.push('/signup')"
        />
      </div>

      <img
        src="/public/ChatGPT Image Oct 12, 2025, 05_46_40 AM.png"
        alt="Investment illustration"
        class="investmentimg absolute bottom-0 w-72 sm:w-66 opacity-80 animate-float pt-10 mt-10"
        style="border-radius: 10%;"
      />
    </section>

    <!-- ===== FEATURES ===== -->
    <section class="py-20 bg-[#0e1a35] relative z-10">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#00c6ae] mb-10 tracking-wide">
          Why Choose finalxcard?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="f in features"
            :key="f.title"
            class="p-6 rounded-2xl glass-card hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          >
            <i :class="f.icon" class="text-5xl text-[#f4b000] mb-4 drop-shadow-[0_0_10px_rgba(244,176,0,0.3)]"></i>
            <h3 class="text-xl font-semibold mb-2 text-white">{{ f.title }}</h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== INVESTMENT PACKAGES ===== -->
    <section class="sese py-20 bg-[#0a1325] border-t border-gray-700">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#f4b000] mb-12">Investment Packages</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="p in packages"
            :key="p.name"
            class="p-6 rounded-2xl glass-card border border-gray-700 hover:border-[#00c6ae] hover:scale-[1.04] transition-all duration-300"
          >
            <h3 class="text-2xl font-bold text-white mb-2">{{ p.name }}</h3>
            <p class="text-gray-400 mb-4">{{ p.range }}</p>
            <p class="text-[#00c6ae] text-4xl font-extrabold mb-4">{{ p.rate }}</p>
            <p class="text-sm text-gray-300 mb-6">{{ p.condition }}</p>
            <Button
              label="Invest Now"
              icon="mdi mdi-arrow-right-bold"
              class="p-button-rounded finalxcard-btn w-full shadow-md hover:shadow-[0_0_20px_rgba(0,198,174,0.4)]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ===== REFERRAL SYSTEM ===== -->
    <section class="py-20 bg-[#0e1a35] border-t border-gray-700 text-center relative">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-[#00c6ae] mb-6">Referral Rewards</h2>
        <p class="text-gray-300 mb-10 opacity-90">
          Earn commissions for each active referral up to 3 levels deep.
        </p>
        <ul class="text-gray-200 space-y-3 text-lg">
          <li>• Level 1 — 15% direct referral bonus</li>
          <li>• Level 2 — 10% sub-level reward</li>
          <li>• Level 3 — 5% team depth reward</li>
        </ul>
      </div>
    </section>

    <!-- ===== SECURITY SECTION ===== -->
    <section class="py-20 bg-[#0a1325] border-t border-gray-700 relative z-10">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        <div class="animate-fade-in">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f4b000] mb-6">Secure & Transparent</h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            All transactions are processed through USDT (BEP20) for instant deposits and withdrawals.
            finalxcard provides full wallet transparency and audited smart systems for user protection.
          </p>
          <Button label="Learn More" icon="mdi mdi-shield-check" class="finalxcard-btn mt-4" />
        </div>
        <div class="flex justify-center">
          <img src="/public/ChatGPT Image Oct 12, 2025, 05_53_45 AM.png" alt="Security" class="w-80 opacity-90 animate-float" />
        </div>
      </div>
    </section>

    <!-- ===== CALL TO ACTION ===== -->
    <section class="py-20 bg-[#0f2040] text-center border-t border-gray-700">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
      <p class="text-gray-300 mb-8">
        Join thousands of investors building their future with finalxcard.
      </p>
      <Button
        label="Create Your Account"
        icon="mdi mdi-rocket-launch-outline"
        class="p-button-rounded p-button-lg finalxcard-btn shadow-lg hover:shadow-[0_0_25px_rgba(0,198,174,0.4)]"
        @click="router.push('/signup')"
      />
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Button from "primevue/button";
const router = useRouter();

const features = [
  { title: "Auto Compounding Profit", icon: "mdi mdi-sync", desc: "Earn profit every 24 hours automatically added to your balance — full compound growth." },
  { title: "Flexible Withdrawals", icon: "mdi mdi-cash-minus", desc: "Withdraw your capital anytime. No lock-up period — your money, your control." },
  { title: "Referral Growth System", icon: "mdi mdi-account-group-outline", desc: "Earn multi-level rewards through finalxcard’s advanced referral system." },
  { title: "24/7 Support", icon: "mdi mdi-lifebuoy", desc: "Our expert support team is always here to assist you — anytime, anywhere." },
  { title: "Smart Analytics", icon: "mdi mdi-chart-line", desc: "Track your performance and earnings in real-time via your personalized dashboard." },
  { title: "Trusted by Investors", icon: "mdi mdi-shield-star-outline", desc: "finalxcard is designed with transparency, verified security, and reliability at its core." },
];

const packages = [
  { name: "Start Pack", range: "$50 - $199", rate: "1.5% / day", condition: "No referrals required" },
  { name: "Active Pack", range: "$200 - $499", rate: "2% / day", condition: "3 active referrals for boost" },
  { name: "Growth Pack", range: "$500 - $1499", rate: "2.5% / day", condition: "5 active referrals for boost" },
];
</script>

<style scoped>
.sese {
  background-image: url(/public/bu.jpg) ;
  background-size: cover;
  /* background-position: center;
  background-repeat: no-repeat;
  */

}

.finalxcard-btn {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
  border: none !important;
  color: #0a1325 !important;
  font-weight: 600;
  transition: all 0.3s ease;
}
.finalxcard-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* --- Frosted Glass Effect for Cards --- */
.glass-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 198, 174, 0.3);
}

/* --- Smooth Floating Animation --- */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}

/* --- Fade In Animation --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}

@media screen and (max-width: 480px) {
.investmentimg {
  width: 200px !important;
}

}


</style>
