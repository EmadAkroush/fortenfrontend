<template>
  <section class="forten-bundles py-20 px-4 sm:px-10 bg-[#0a1325] text-gray-100">
    <div class="max-w-7xl mx-auto text-center">
      <!-- Header -->
      <div class="mb-14">
        <h2 class="text-4xl sm:text-5xl font-bold text-[#00c6ae] mb-3">Forten Investment Plans</h2>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose your plan, earn daily profit, and grow your capital automatically with compound interest.
        </p>
      </div>

      <!-- Bundles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div
          v-for="(item, index) in bundles"
          :key="index"
          class="bundle-card relative bg-[#101e42] rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-700 w-full sm:w-96"
        >
          <!-- Header -->
          <div
            class="bg-gradient-to-r from-[#00c6ae] to-[#f4b000] text-[#0a1325] text-center py-5"
          >
            <h3 class="text-2xl font-extrabold uppercase">{{ item.title }}</h3>
            <p class="text-sm font-semibold">Daily Return: {{ item.dailyReturn }}</p>
          </div>

          <!-- Body -->
          <div class="p-6 text-left space-y-4">
            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Invest Range:</span>
              <span class="text-[#00c6ae] font-bold">{{ item.range }}</span>
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Referral Requirement:</span>
              <span class="text-[#f4b000] font-semibold">{{ item.referrals }}</span>
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Upgrade Rate:</span>
              <span class="text-[#00c6ae] font-bold">{{ item.upgradeRate }}</span>
            </p>

            <p class="text-sm text-gray-400 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              label="Details"
              icon="mdi mdi-information-outline"
              class="p-button-sm p-button-outlined w-full"
              @click="openDetails(item)"
            />
            <Button
              label="Invest Now"
              icon="mdi mdi-wallet-plus-outline"
              class="p-button-sm forten-btn w-full"
              @click="openInvest(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Bundle Details Modal ===== -->
    <Dialog
      v-model:visible="visibleDetails"
      modal
      :header="selectedBundle?.title + ' Plan Details'"
      :style="{ width: '90%', maxWidth: '600px' }"
    >
      <div v-if="selectedBundle" class="space-y-3 text-gray-700">
        <p><strong>Invest Range:</strong> {{ selectedBundle.range }}</p>
        <p><strong>Base Daily Return:</strong> {{ selectedBundle.dailyReturn }}</p>
        <p><strong>Upgraded Daily Return:</strong> {{ selectedBundle.upgradeRate }}</p>
        <p><strong>Referral Requirement:</strong> {{ selectedBundle.referrals }}</p>
        <p class="pt-2 text-sm text-gray-500 border-t">
          {{ selectedBundle.longDesc }}
        </p>
      </div>

      <template #footer>
        <Button label="Close" icon="mdi mdi-close" class="p-button-text" @click="visibleDetails = false" />
        <Button
          label="Invest Now"
          icon="mdi mdi-wallet-plus-outline"
          class="forten-btn"
          @click="openInvest(selectedBundle)"
        />
      </template>
    </Dialog>

    <!-- ===== Invest Modal ===== -->
    <Dialog
      v-model:visible="visibleInvest"
      modal
      :header="'Invest in ' + (selectedBundle?.title || '')"
      :style="{ width: '90%', maxWidth: '520px' }"
    >
      <div v-if="selectedBundle" class="space-y-5">
        <p class="text-gray-700">
          You are investing in the <strong>{{ selectedBundle.title }}</strong> plan.
        </p>

        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Amount (USD)</label>
          <InputNumber
            v-model="investAmount"
            mode="currency"
            currency="USD"
            locale="en-US"
            :min="50"
            class="w-full"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Your Saved Wallet</label>
          <InputText
            v-model="userWallet"
            class="w-full"
            disabled
          />
          <p class="text-xs text-gray-500 mt-1">
            (You can change wallet address in your account settings)
          </p>
        </div>

        <div class="bg-gray-50 border border-gray-200 p-3 rounded-md">
          <p class="text-xs text-gray-700">
            <strong>Transaction ID:</strong>
            <span class="text-[#00c6ae] font-mono ml-2">{{ transactionId }}</span>
          </p>
        </div>
      </div>

      <template #footer>
        <Button label="Cancel" icon="mdi mdi-close" class="p-button-text" @click="visibleInvest = false" />
        <Button label="Confirm Investment" icon="mdi mdi-check-circle" class="forten-btn" @click="confirmInvestment" />
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { ref } from "vue"
import Dialog from "primevue/dialog"
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"

const visibleDetails = ref(false)
const visibleInvest = ref(false)
const selectedBundle = ref(null)
const investAmount = ref(null)
const userWallet = ref("0xA1F2...B56e — BEP20")
const transactionId = ref(`FRT-${Math.floor(Math.random() * 999999)}`)

const bundles = [
  {
    title: "Start Pack",
    range: "$50 - $199",
    dailyReturn: "1.5%",
    upgradeRate: "—",
    referrals: "No referral required",
    desc: "Perfect for beginners. Stable daily profit and auto-compounding every 24h.",
    longDesc: "This plan is designed for newcomers who want to test Forten’s system with low entry. You earn 1.5% daily compounded automatically.",
  },
  {
    title: "Active Pack",
    range: "$200 - $499",
    dailyReturn: "1.5%",
    upgradeRate: "2%",
    referrals: "3 active referrals for upgrade",
    desc: "Boost your profits with team activation — up to 2% daily returns.",
    longDesc: "Earn a base 1.5% daily return or upgrade to 2% after having 3 active referrals. Profits are compounded daily.",
  },
  {
    title: "Growth Pack",
    range: "$500 - $1,499",
    dailyReturn: "2%",
    upgradeRate: "2.5%",
    referrals: "5 active referrals for upgrade",
    desc: "Higher potential for growing investors with team expansion.",
    longDesc: "With the Growth Pack, you earn 2% daily or 2.5% with 5 active referrals. Full flexibility to withdraw anytime.",
  },
  {
    title: "Pro Leader Pack",
    range: "$1,500 - $4,999",
    dailyReturn: "2.5%",
    upgradeRate: "3%",
    referrals: "10 active referrals for upgrade",
    desc: "Professional investors’ choice — up to 3% daily compounded rewards.",
    longDesc: "Designed for network leaders, this plan provides 2.5–3% daily with team-based upgrade bonuses.",
  },
  {
    title: "VIP Master Pack",
    range: "$5,000 - $10,000",
    dailyReturn: "3% - 3.5%",
    upgradeRate: "VIP levels apply",
    referrals: "15 active referrals (VIP 5)",
    desc: "Exclusive plan for elite investors with highest rewards and status.",
    longDesc: "VIP members enjoy the maximum daily rate and exclusive bonuses. Progress through VIP 1–5 based on your referral count.",
  },
]

function openDetails(item) {
  selectedBundle.value = item
  visibleDetails.value = true
}

function openInvest(item) {
  selectedBundle.value = item
  visibleDetails.value = false
  visibleInvest.value = true
  transactionId.value = `FRT-CASHIN-${Math.floor(100000 + Math.random() * 900000)}`
}

function confirmInvestment() {
  if (!investAmount.value) {
    alert("Please enter an amount to invest.")
    return
  }
  alert(
    `✅ Investment Successful!\nPlan: ${selectedBundle.value.title}\nAmount: $${investAmount.value}\nTransaction: ${transactionId.value}`
  )
  visibleInvest.value = false
}
</script>

<style scoped>
.forten-btn {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
  border: none !important;
  color: #0a1325 !important;
  font-weight: 600;
  transition: all 0.3s ease;
}
.forten-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
</style>

