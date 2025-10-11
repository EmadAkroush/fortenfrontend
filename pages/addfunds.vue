<template>
  <section class="addfunds min-h-screen bg-gray-50 py-16 px-4 sm:px-12">
    <div class="max-w-2xl mx-auto">
      <!-- Breadcrumb -->
      <!-- <div class="text-sm text-gray-500 mb-6">
        <nuxt-link to="/" class="text-green-700 hover:underline">Home</nuxt-link> /
        <span class="text-gray-600">Add Funds</span>
      </div> -->

      <!-- Header -->
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-green-700 mb-3">Add Funds</h2>
        <p class="text-gray-600 max-w-md mx-auto">
          Deposit funds securely using blockchain payment methods.  
          Minimum deposit is <span class="font-semibold">$50</span>.
        </p>
      </div>

      <!-- Custom Stepper -->
      <div class="flex justify-between items-center mb-10 relative">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex-1 text-center"
        >
          <div class="flex flex-col items-center relative">
            <!-- Circle -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300"
              :class="{
                'bg-green-600 text-white': currentStep >= index + 1,
                'bg-gray-200 text-gray-500': currentStep < index + 1,
              }"
            >
              <i :class="step.icon" class="text-lg"></i>
            </div>
            <p
              class="mt-2 text-sm font-medium"
              :class="{
                'text-green-700': currentStep >= index + 1,
                'text-gray-500': currentStep < index + 1,
              }"
            >
              {{ step.label }}
            </p>

            <!-- Connector line -->
            <div
              v-if="index < steps.length - 1"
              class="absolute top-5 left-[calc(50%+20px)] w-full h-0.5"
              :class="currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Step 1: Select Network -->
      <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <i class="mdi mdi-wallet-outline text-green-600 text-2xl"></i>
          Select Network & Amount
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div
            v-for="network in networks"
            :key="network.name"
            @click="selected = network"
            class="cursor-pointer flex flex-col items-center p-4 border rounded-xl transition-all hover:shadow-md"
            :class="selected?.name === network.name ? 'border-green-500 bg-green-50' : 'border-gray-200'"
          >
            <img :src="network.icon" alt="logo" class="w-10 h-10 mb-2" />
            <p class="text-sm font-semibold text-gray-700">{{ network.name }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Amount (USD)</label>
          <input
            v-model="amount"
            type="number"
            min="50"
            class="w-full border rounded-lg p-2 mb-6"
            placeholder="Enter amount (min $50)"
          />
        </div>

        <Button
          label="Continue"
          icon="mdi mdi-arrow-right-bold"
          class="w-full p-button-success"
          :disabled="!selected || amount < 50"
          @click="nextStep"
        />
      </div>

      <!-- Step 2: Payment Confirmation -->
      <div v-else-if="currentStep === 2" class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <div class="flex flex-col items-center">
          <img :src="selected.icon" alt="crypto logo" class="w-14 h-14 mb-4" />
          <h3 class="text-xl font-semibold mb-2">{{ selected.name }} Payment</h3>
          <p class="text-gray-600 mb-4">
            Send exactly <span class="font-bold text-green-700">${{ amount }}</span> to this wallet:
          </p>

          <div class="bg-gray-100 border border-gray-200 rounded-xl p-3 mb-4 select-all">
            <p class="text-sm font-mono break-all text-gray-800">{{ generatedAddress }}</p>
          </div>

          <Button
            label="Copy Address"
            icon="mdi mdi-content-copy"
            class="w-full p-button-outlined mb-3"
            @click="copyAddress"
          />
          <Button
            label="I’ve Paid"
            icon="mdi mdi-check-circle"
            class="w-full p-button-success"
            @click="nextStep"
          />

          <p class="text-xs text-gray-500 mt-4">
            Payment confirmation may take up to 5 minutes depending on network load.
          </p>
        </div>
      </div>

      <!-- Step 3: Payment Verification -->
      <div v-else-if="currentStep === 3" class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <div class="flex flex-col items-center">
          <i class="mdi mdi-timer-sand text-green-600 text-5xl mb-4"></i>
          <h3 class="text-2xl font-semibold mb-3">Payment Verification</h3>
          <p class="text-gray-600 mb-4">
            Your payment of <span class="text-green-700 font-bold">${{ amount }}</span> via
            <span class="font-semibold">{{ selected.name }}</span> is being verified.
          </p>
          <ProgressBar :value="progress" class="w-full mb-4"></ProgressBar>
          <Button
            v-if="progress >= 100"
            label="Go to Dashboard"
            icon="mdi mdi-arrow-right"
            class="w-full p-button-success"
            @click="goToDashboard"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";

const router = useRouter();
const currentStep = ref(1);
const selected = ref(null);
const amount = ref(null);
const progress = ref(0);

const generatedAddress = ref("0xA1B2C3D4E5F678901234567890ABCDEF12345678");

const steps = [
  { label: "Select Network", icon: "mdi mdi-wallet-outline" },
  { label: "Payment", icon: "mdi mdi-currency-usd" },
  { label: "Verification", icon: "mdi mdi-shield-check-outline" },
];

const networks = [
  { name: "TRON (TRC20)", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { name: "ETH (ERC20)", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
];

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
  if (currentStep.value === 3) startProgress();
}

function startProgress() {
  progress.value = 0;
  const timer = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(timer);
    } else {
      progress.value += 10;
    }
  }, 500);
}

function copyAddress() {
  navigator.clipboard.writeText(generatedAddress.value);
  alert("✅ Wallet address copied to clipboard.");
}

function goToDashboard() {
  router.push("/account");
}
</script>

<style lang="scss" scoped>
.addfunds {
  background: linear-gradient(180deg, #f9fafb 0%, #eef1fb 100%);
  h2 {
    color: #0b6d20;
  }

  /* custom stepper line fix */
  .relative::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    height: 2px;
    background: #d1d5db;
    z-index: 0;
  }
}
</style>


