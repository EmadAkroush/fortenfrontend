<template>
  <div class="cashout px-4 sm:px-16 py-10 max-w-3xl mx-auto space-y-8">
    <!-- ===== Step Progress Bar ===== -->
    <div class="relative flex items-center justify-between mb-8">
      <div
        v-for="(stepItem, index) in steps"
        :key="index"
        class="flex flex-col items-center relative"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold z-10 transition-all"
          :class="
            currentStep > index
              ? 'bg-green-600 text-white border-green-600'
              : currentStep === index
              ? 'border-green-600 text-green-600 bg-white'
              : 'border-gray-300 text-gray-400'
          "
        >
          {{ index + 1 }}
        </div>
        <span
          class="mt-2 text-xs sm:text-sm font-medium"
          :class="currentStep >= index ? 'text-green-700' : 'text-gray-400'"
        >
          {{ stepItem.label }}
        </span>

        <!-- Connector Line -->
        <div
          v-if="index < steps.length - 1"
          class="absolute top-5 left-[50%] w-full h-[2px] bg-gray-300 z-0"
          :class="{ 'bg-green-500': currentStep > index }"
        ></div>
      </div>
    </div>

    <!-- ===== Step 1: Select Wallet ===== -->
    <transition name="fade">
      <div v-if="currentStep === 0">
        <Card class="shadow-md">
          <template #title>Select Wallet</template>
          <template #content>
            <Dropdown
              v-model="selectedWallet"
              :options="wallets"
              optionLabel="label"
              placeholder="Choose your wallet"
              class="w-full"
            />
            <p v-if="selectedWallet" class="mt-3 text-sm text-gray-600">
              Balance:
              <span class="font-bold text-green-600">
                ${{ selectedWallet.balance }}
              </span>
            </p>
          </template>
        </Card>

        <div class="text-center mt-6">
          <Button
            label="Next"
            icon="mdi mdi-arrow-right"
            class="p-button-success px-6 py-2"
            :disabled="!selectedWallet"
            @click="nextStep"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 2: Enter Amount ===== -->
    <transition name="fade">
      <div v-if="currentStep === 1">
        <Card class="shadow-md">
          <template #title>Enter Amount</template>
          <template #content>
            <InputNumber
              v-model="amount"
              mode="currency"
              currency="USD"
              locale="en-US"
              class="w-full"
            />
            <p class="text-xs text-gray-500 mt-2">
              Min withdrawal: $50 | Fee: 2%
            </p>
          </template>
        </Card>

        <div class="flex justify-between mt-6">
          <Button
            label="Back"
            icon="mdi mdi-arrow-left"
            class="p-button-outlined"
            @click="prevStep"
          />
          <Button
            label="Next"
            icon="mdi mdi-arrow-right"
            class="p-button-success px-6 py-2"
            :disabled="!amount || amount < 50"
            @click="nextStep"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 3: Withdrawal Method ===== -->
    <transition name="fade">
      <div v-if="currentStep === 2">
        <Card class="shadow-md">
          <template #title>Choose Withdrawal Method</template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                class="border p-4 rounded-md cursor-pointer flex items-center gap-2 transition-all"
                :class="
                  method === 'crypto'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200'
                "
                @click="method = 'crypto'"
              >
                <i class="mdi mdi-bitcoin text-yellow-500 text-2xl"></i>
                <span class="font-medium">Crypto (USDT / BTC)</span>
              </div>

              <div
                class="border p-4 rounded-md cursor-pointer flex items-center gap-2 transition-all"
                :class="
                  method === 'bank'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200'
                "
                @click="method = 'bank'"
              >
                <i class="mdi mdi-bank-outline text-blue-500 text-2xl"></i>
                <span class="font-medium">Bank Transfer</span>
              </div>
            </div>

            <!-- اگر روش Crypto انتخاب شود -->
            <div v-if="method === 'crypto'" class="mt-5">
              <label class="block text-sm font-medium mb-2"
                >Select Your Saved Wallet</label
              >
              <Dropdown
                v-model="selectedCryptoWallet"
                :options="userWallets"
                optionLabel="name"
                placeholder="Choose from your saved wallets"
                class="w-full"
              />
              <p v-if="selectedCryptoWallet" class="text-xs text-gray-500 mt-2">
                Network:
                <span class="font-semibold">{{ selectedCryptoWallet.network }}</span>
              </p>
            </div>

            <!-- اگر روش Bank انتخاب شود -->
            <div v-if="method === 'bank'" class="mt-5">
              <p class="text-sm text-gray-600">
                Bank transfers are processed manually within 3-5 business days.
              </p>
            </div>
          </template>
        </Card>

        <div class="flex justify-between mt-6">
          <Button
            label="Back"
            icon="mdi mdi-arrow-left"
            class="p-button-outlined"
            @click="prevStep"
          />
          <Button
            label="Confirm Cashout"
            icon="mdi mdi-check"
            class="p-button-success px-6 py-2"
            :disabled="!method || (method === 'crypto' && !selectedCryptoWallet)"
            @click="completeCashout"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 4: Confirmation ===== -->
    <transition name="fade">
      <div v-if="currentStep === 3" class="text-center py-10">
        <i class="mdi mdi-check-circle-outline text-green-600 text-6xl mb-4"></i>
        <h2 class="text-2xl font-bold text-green-700">
          Cashout Request Submitted
        </h2>
        <p class="text-gray-600 mt-2">
          Your withdrawal request is being processed. You’ll receive confirmation soon.
        </p>

        <div class="mt-6 bg-white inline-block px-6 py-3 rounded-lg shadow-md border">
          <p class="text-sm text-gray-500 mb-1">Transaction ID</p>
          <p class="text-lg font-mono font-semibold text-green-700">
            {{ transactionId }}
          </p>
        </div>

        <Button
          label="Back to Dashboard"
          icon="mdi mdi-view-dashboard"
          class="mt-8 p-button-outlined"
          @click="resetSteps"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import Button from "primevue/button"
import Dropdown from "primevue/dropdown"
import InputNumber from "primevue/inputnumber"
import { ref } from "vue"

const wallets = [
  { label: "Profits Wallet", balance: 1200 },
  { label: "VX Wallet", balance: 780 },
]

const userWallets = [
  { name: "USDT Wallet - TRC20", network: "TRON" },
  { name: "BTC Wallet", network: "Bitcoin" },
]

const steps = [
  { label: "Select Wallet" },
  { label: "Enter Amount" },
  { label: "Withdrawal Method" },
  { label: "Confirmation" },
]

const currentStep = ref(0)
const selectedWallet = ref(null)
const amount = ref(null)
const method = ref(null)
const selectedCryptoWallet = ref(null)
const transactionId = ref("")

const nextStep = () => (currentStep.value += 1)
const prevStep = () => (currentStep.value -= 1)

const generateTransactionId = () => {
  const random = Math.floor(100000 + Math.random() * 900000)
  return `VX-CASHOUT-${random}`
}

const completeCashout = () => {
  transactionId.value = generateTransactionId()
  nextStep()
}

const resetSteps = () => {
  currentStep.value = 0
  selectedWallet.value = null
  amount.value = null
  method.value = null
  selectedCryptoWallet.value = null
  transactionId.value = ""
}
</script>

<style lang="scss" scoped>
.cashout {
  background-color: #f9fbfc;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
