<template>
  <div class="forten-cashout min-h-screen p-4 sm:p-10 max-w-3xl mx-auto space-y-8">
    <!-- ===== Step Progress ===== -->
    <div class="steps relative flex items-center justify-between mb-10">
      <div v-for="(stepItem, i) in steps" :key="i" class="flex flex-col items-center relative">
        <div
          class="step-circle"
          :class="{
            done: currentStep > i,
            active: currentStep === i
          }"
        >
          {{ i + 1 }}
        </div>
        <span
          class="step-label mt-2 text-xs sm:text-sm font-medium"
          :class="{ active: currentStep >= i }"
        >
          {{ stepItem.label }}
        </span>
        <div
          v-if="i < steps.length - 1"
          class="connector absolute top-5 left-[50%] w-full h-[2px]"
          :class="{ done: currentStep > i }"
        ></div>
      </div>
    </div>

    <!-- ===== Step 1 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 0" class="glass-card">
        <h2 class="section-title">Select Wallet</h2>
        <Dropdown
          v-model="selectedWallet"
          :options="wallets"
          optionLabel="label"
          placeholder="Choose your wallet"
          class="w-full mb-4"
        />
        <p v-if="selectedWallet" class="text-sm text-gray-300">
          Balance:
          <span class="text-emerald-300 font-semibold">${{ selectedWallet.balance }}</span>
        </p>
        <div class="text-center mt-6">
          <Button
            label="Next"
            icon="mdi mdi-arrow-right"
            class="p-button-success glass-btn"
            :disabled="!selectedWallet"
            @click="nextStep"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 2 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 1" class="glass-card">
        <h2 class="section-title">Enter Amount</h2>
        <InputNumber
          v-model="amount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
        />
        <p class="text-xs text-gray-400 mt-2">Min withdrawal: $50 | Fee: 2%</p>
        <div class="flex justify-between mt-8">
          <Button
            label="Back"
            icon="mdi mdi-arrow-left"
            class="p-button-outlined glass-btn"
            @click="prevStep"
          />
          <Button
            label="Next"
            icon="mdi mdi-arrow-right"
            class="p-button-success glass-btn"
            :disabled="!amount || amount < 50"
            @click="nextStep"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 3 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 2" class="glass-card">
        <h2 class="section-title">Withdrawal Method</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="method-card"
            :class="{ active: method === 'crypto' }"
            @click="method = 'crypto'"
          >
            <i class="mdi mdi-bitcoin text-yellow-400 text-2xl"></i>
            <span>Crypto (USDT / BTC)</span>
          </div>

          <div
            class="method-card"
            :class="{ active: method === 'bank' }"
            @click="method = 'bank'"
          >
            <i class="mdi mdi-bank-outline text-blue-400 text-2xl"></i>
            <span>Bank Transfer</span>
          </div>
        </div>

        <div v-if="method === 'crypto'" class="mt-5">
          <label class="block text-sm mb-2 text-gray-300">Select Saved Wallet</label>
          <Dropdown
            v-model="selectedCryptoWallet"
            :options="userWallets"
            optionLabel="name"
            placeholder="Choose from your saved wallets"
            class="w-full"
          />
          <p v-if="selectedCryptoWallet" class="text-xs text-gray-400 mt-2">
            Network: <span class="text-emerald-300 font-medium">{{ selectedCryptoWallet.network }}</span>
          </p>
        </div>

        <div v-if="method === 'bank'" class="mt-5 text-sm text-gray-300">
          Bank transfers are processed manually within 3–5 business days.
        </div>

        <div class="flex justify-between mt-8">
          <Button
            label="Back"
            icon="mdi mdi-arrow-left"
            class="p-button-outlined glass-btn"
            @click="prevStep"
          />
          <Button
            label="Confirm Cashout"
            icon="mdi mdi-check"
            class="p-button-success glass-btn"
            :disabled="!method || (method === 'crypto' && !selectedCryptoWallet)"
            @click="completeCashout"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 4 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 3" class="glass-card text-center py-10">
        <i class="mdi mdi-check-decagram text-emerald-400 text-6xl mb-3"></i>
        <h2 class="text-2xl font-bold text-gray-100">Cashout Request Submitted</h2>
        <p class="text-gray-400 mt-2">
          Your withdrawal request is being processed. You’ll receive confirmation soon.
        </p>

        <div class="bg-emerald-950/30 border border-emerald-500/30 mt-6 inline-block px-6 py-3 rounded-lg shadow-md">
          <p class="text-xs text-gray-400">Transaction ID</p>
          <p class="text-lg font-mono font-semibold text-emerald-300">{{ transactionId }}</p>
        </div>

        <Button
          label="Back to Dashboard"
          icon="mdi mdi-view-dashboard"
          class="mt-8 p-button-outlined glass-btn"
          @click="resetSteps"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";

const wallets = [
  { label: "Profits Wallet", balance: 1200 },
  { label: "VX Wallet", balance: 780 },
];

const userWallets = [
  { name: "USDT Wallet - TRC20", network: "TRON" },
  { name: "BTC Wallet", network: "Bitcoin" },
];

const steps = [
  { label: "Select Wallet" },
  { label: "Enter Amount" },
  { label: "Withdrawal Method" },
  { label: "Confirmation" },
];

const currentStep = ref(0);
const selectedWallet = ref(null);
const amount = ref(null);
const method = ref(null);
const selectedCryptoWallet = ref(null);
const transactionId = ref("");

const nextStep = () => (currentStep.value += 1);
const prevStep = () => (currentStep.value -= 1);

const generateTransactionId = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `FTN-CASHOUT-${random}`;
};

const completeCashout = () => {
  transactionId.value = generateTransactionId();
  nextStep();
};

const resetSteps = () => {
  currentStep.value = 0;
  selectedWallet.value = null;
  amount.value = null;
  method.value = null;
  selectedCryptoWallet.value = null;
  transactionId.value = "";
};
</script>

<style scoped lang="scss">
.forten-cashout {
  background: radial-gradient(circle at top left, #0c1d17, #07130f);
  color: #e6eef0;
  font-family: "Inter", sans-serif;

  .glass-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 1.5rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }

  .section-title {
    font-weight: 700;
    color: #b0f2c2;
    margin-bottom: 1rem;
  }

  /* Step Progress */
  .step-circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    transition: all 0.3s ease;
  }
  .step-circle.active {
    border-color: #10b981;
    color: #10b981;
  }
  .step-circle.done {
    background: #10b981;
    border-color: #10b981;
    color: white;
  }

  .step-label {
    color: #64748b;
  }
  .step-label.active {
    color: #b0f2c2;
  }

  .connector {
    background: rgba(255, 255, 255, 0.1);
  }
  .connector.done {
    background: #10b981;
  }

  /* Method Cards */
  .method-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    padding: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .method-card:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .method-card.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.15);
  }

  /* Buttons */
  .glass-btn {
    backdrop-filter: blur(8px);
    border-radius: 8px;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    padding: 1rem !important;
    .glass-card {
      padding: 1rem;
    }
  }
}
</style>
