<template>
  <section class="finalxcard-addfunds min-h-screen py-16 px-4 sm:px-10 bg-[#0a1325] text-gray-100">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#00c6ae] mb-3">Add Funds</h2>
        <p class="text-gray-300 max-w-md mx-auto">
          Deposit funds securely using <span class="text-[#f4b000] font-semibold">USDT (BEP20)</span>.
          Minimum deposit: <strong>$50</strong>.
        </p>
      </div>

      <!-- Custom Stepper -->
      <div class="flex justify-between items-center mb-10 relative finalxcard-stepper">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex-1 text-center relative"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center mx-auto z-10 transition-all duration-300 font-semibold"
            :class="{
              'bg-gradient-to-r from-[#00c6ae] to-[#f4b000] text-[#0a1325]': currentStep >= index + 1,
              'bg-gray-700 text-gray-400': currentStep < index + 1,
            }"
          >
            <i :class="step.icon" class="text-lg"></i>
          </div>

          <p
            class="mt-2 text-sm"
            :class="currentStep >= index + 1 ? 'text-[#00c6ae]' : 'text-gray-400'"
          >
            {{ step.label }}
          </p>

          <div
            v-if="index < steps.length - 1"
            class="absolute top-5 left-1/2 w-full h-0.5 z-0"
            :class="currentStep > index + 1 ? 'bg-gradient-to-r from-[#00c6ae] to-[#f4b000]' : 'bg-gray-700'"
          ></div>
        </div>
      </div>

      <!-- Step 1 -->
      <div v-if="currentStep === 1" class="bg-[#101e42] rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2 text-[#f4b000]">
          <i class="mdi mdi-wallet-outline text-[#00c6ae] text-2xl"></i>
          Select Payment Network
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div
            v-for="network in networks"
            :key="network.name"
            @click="selected = network"
            class="cursor-pointer flex flex-col items-center p-4 border rounded-xl transition-all hover:shadow-md"
            :class="selected?.name === network.name
              ? 'border-[#00c6ae] bg-[#14294b]'
              : 'border-gray-700 bg-[#0d1835]'
            "
          >
            <img :src="network.icon" alt="logo" class="w-10 h-10 mb-2" />
            <p class="text-sm font-semibold">{{ network.name }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Amount (USD)</label>
          <input
            v-model="amount"
            type="number"
            min="50"
            class="w-full border border-gray-700 rounded-lg p-2 bg-[#0d1835] text-gray-200 focus:border-[#00c6ae] focus:ring-0"
            placeholder="Enter amount (min $50)"
          />
        </div>

        <Button
          label="Continue"
          icon="mdi mdi-arrow-right-bold"
          class="w-full mt-6 finalxcard-btn"
          :disabled="!selected || amount < 50"
          :loading="loading"
          @click="createPayment"
        />
      </div>

      <!-- Step 2 -->
      <div v-else-if="currentStep === 2" class="bg-[#101e42] rounded-2xl shadow-xl p-6 border border-gray-700 text-center">
        <img :src="selected.icon" alt="crypto logo" class="w-14 h-14 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-[#f4b000] mb-3">{{ selected.name }} Payment</h3>
        <p class="text-gray-300 mb-4">
          Send exactly <span class="text-[#00c6ae] font-semibold">${{ amount }}</span> to:
        </p>

        <div class="bg-[#0d1835] border border-gray-700 rounded-xl p-3 mb-4 select-all text-left">
          <p class="text-sm font-mono break-all text-gray-100">{{ generatedAddress }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <Button
            label="Copy Address"
            icon="mdi mdi-content-copy"
            class="w-full p-button-outlined border-[#00c6ae] text-[#00c6ae]"
            @click="copyAddress"
          />
          <Button
            label="I’ve Paid"
            icon="mdi mdi-check-circle"
            class="w-full finalxcard-btn"
            @click="nextStep"
          />
        </div>

        <p class="text-xs text-gray-400 mt-4">Confirmation takes 3–5 minutes on blockchain.</p>
      </div>

      <!-- Step 3 -->
      <div v-else-if="currentStep === 3" class="bg-[#101e42] rounded-2xl shadow-xl p-6 border border-gray-700 text-center">
        <i class="mdi mdi-shield-check-outline text-[#00c6ae] text-6xl mb-3"></i>
        <h3 class="text-2xl font-bold text-[#f4b000] mb-2">Payment Verification</h3>
        <p class="text-gray-300 mb-4">
          Your payment of <span class="text-[#00c6ae] font-semibold">${{ amount }}</span> is being verified.
        </p>

        <ProgressBar :value="progress" class="w-full finalxcard-progress mb-4"></ProgressBar>

        <p v-if="progress < 100" class="text-xs text-gray-400">Processing blockchain confirmation...</p>
        <Button
          v-else
          label="Go to Dashboard"
          icon="mdi mdi-arrow-right"
          class="w-full finalxcard-btn"
          @click="goToDashboard"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import { useAuth } from "@/composables/useAuth";

const toast = useToast();
const router = useRouter();
const { authUser } = useAuth();

const currentStep = ref(1);
const selected = ref(null);
const amount = ref(null);
const progress = ref(0);
const generatedAddress = ref("");
const loading = ref(false);

const steps = [
  { label: "Select Network", icon: "mdi mdi-wallet-outline" },
  { label: "Payment", icon: "mdi mdi-currency-usd" },
  { label: "Verification", icon: "mdi mdi-shield-check" },
];

const networks = [
  { name: "USDT (BEP20)", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { name: "ETH (ERC20)", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "TRON (TRC20)", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
];

async function createPayment() {
  loading.value = true;
  try {
    console.log("🟢 Sending payment request...");
    const res = await $fetch("/api/payment", {
      method: "POST",
      body: {
        network: selected.value.name,
        amountUsd: amount.value,
        userId: authUser.value.user.id,
      },
    });

    console.log("✅ Response:", res);

    if (res?.payAddress) {
      generatedAddress.value = res.payAddress;
      currentStep.value = 2;
    } else {
      console.error("❌ Invalid backend response:", res);
      throw new Error("Invalid response from server");
    }
  } catch (err) {
    console.error("Deposit error:", err);
    toast.add({
      severity: "error",
      summary: "Payment Error",
      detail: err?.data?.message || "Failed to initiate deposit.",
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
}

function nextStep() {
  if (currentStep.value < 3) currentStep.value++;
  if (currentStep.value === 3) startProgress();
}

function startProgress() {
  progress.value = 0;
  const timer = setInterval(() => {
    if (progress.value >= 100) clearInterval(timer);
    else progress.value += 10;
  }, 500);
}

function copyAddress() {
  navigator.clipboard.writeText(generatedAddress.value);
  toast.add({
    severity: "success",
    summary: "Copied",
    detail: "Wallet address copied to clipboard!",
    life: 2000,
  });
}

function goToDashboard() {
  router.push("/account");
}
</script>

<style scoped>
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
.finalxcard-progress .p-progressbar-value {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
}
.finalxcard-stepper::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 5%;
  right: 5%;
  height: 2px;
  background: #1f2b48;
  z-index: 0;
}
</style>
