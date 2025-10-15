<template>
  <div class="forten-portfolio p-3 sm:p-8">
    <!-- ===== Header ===== -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-300">My Invest</h1>
        <p class="text-sm text-gray-300 mt-1">
          Track your investments, profit growth, and package progress in real time.
        </p>
      </div>
      <Button
        class="p-button-success compact-btn"
        icon="mdi mdi-wallet-plus-outline"
        label="New Investment"
        @click="openNewInvestment"
      />
    </div>

    <!-- ===== Overview Cards ===== -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div class="summary-card">
        <i class="mdi mdi-chart-line summary-icon text-emerald-400"></i>
        <div>
          <p class="summary-label">Expected Returns</p>
          <h3 class="summary-value">${{ formatNumber(expectedReturns) }}</h3>
        </div>
      </div>

      <div class="summary-card">
        <i class="mdi mdi-cash-multiple summary-icon text-cyan-400"></i>
        <div>
          <p class="summary-label">Current Profit</p>
          <h3 class="summary-value">${{ formatNumber(currentProfit) }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Active Investment Card (Single) ===== -->
    <div class="pack-card p-5 mx-auto max-w-xl mb-10">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-bold text-emerald-300">{{ activePack.name }}</h3>
        <span class="px-2 py-0.5 text-xs rounded border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
          {{ activePack.status }}
        </span>
      </div>

      <div class="text-sm text-gray-300 space-y-1 mb-3">
        <div>Investment: <span class="font-semibold text-gray-100">${{ formatNumber(activePack.amount) }}</span></div>
        <div>Base Rate: <span class="text-emerald-300">{{ activePack.baseRate }}%</span></div>
        <div v-if="activePack.upgradedRate">
          Upgraded Rate: <span class="text-emerald-300">{{ activePack.upgradedRate }}%</span>
        </div>
        <div>Active Referrals: <span class="text-amber-300">{{ activePack.activeReferrals }}/{{ activePack.requiredReferrals }}</span></div>
      </div>

      <!-- Progress -->
      <div class="space-y-1 mb-4">
        <ProgressBar :value="Math.min((activePack.activeReferrals / activePack.requiredReferrals) * 100, 100)" class="h-2" />
        <div class="text-xs text-gray-400">
          <span v-if="activePack.activeReferrals >= activePack.requiredReferrals">✅ Upgraded to {{ activePack.upgradedRate }}%</span>
          <span v-else>{{ activePack.requiredReferrals - activePack.activeReferrals }} more referrals to upgrade</span>
        </div>
      </div>

      <!-- Profit Info -->
      <div class="glass-subcard mb-3">
        <div class="flex justify-between text-sm">
          <span>Total Profit</span>
          <span class="text-emerald-300 font-semibold">${{ formatNumber(activePack.totalProfit) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Withdrawn</span>
          <span class="text-gray-400">${{ formatNumber(activePack.withdrawn) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Available</span>
          <span class="text-emerald-200 font-semibold">${{ formatNumber(activePack.totalProfit - activePack.withdrawn) }}</span>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button class="p-button-success compact-btn" icon="mdi mdi-swap-horizontal-bold" label="Transfer Profit" @click="transferProfit" />
        <Button class="p-button-warning compact-btn" icon="mdi mdi-arrow-up-bold" label="Upgrade" @click="openUpgradeDialog" />
        <Button class="p-button-danger compact-btn" icon="mdi mdi-cancel" label="Cancel" @click="openCancelDialog" />
      </div>
    </div>

   

    <!-- ===== Cancel Dialog ===== -->
    <Dialog v-model:visible="showCancelDialog" modal header="Cancel Investment" :style="{ width: '90%', maxWidth: '420px' }">
      <p class="text-gray-300 mb-4">
        Are you sure you want to cancel your <span class="text-emerald-300 font-semibold">{{ activePack.name }}</span> package?
      </p>
      <p class="text-gray-400 text-sm mb-6">The invested amount will be returned to your main balance.</p>
      <template #footer>
        <div class="flex justify-between w-full">
          <Button label="Close" class="p-button-text" @click="showCancelDialog = false" />
          <Button label="Confirm Cancel" class="p-button-danger" @click="confirmCancel" />
        </div>
      </template>
    </Dialog>

    <!-- ===== Upgrade Dialog ===== -->
    <Dialog v-model:visible="showUpgradeDialog" modal header="Upgrade Investment" :style="{ width: '90%', maxWidth: '450px' }">
      <div class="text-gray-300 space-y-3">
        <p>You are upgrading <span class="text-emerald-300 font-semibold">{{ activePack.name }}</span> to a higher plan.</p>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Next Plan</label>
          <select v-model="selectedNextPack" class="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2">
            <option disabled value="">Choose next plan</option>
            <option v-for="p in upgradeOptions" :key="p.name" :value="p.name">{{ p.name }} — {{ p.range }}</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-400 mb-1 block">Additional Amount (USD)</label>
          <input v-model.number="additionalAmount" type="number" min="10" class="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2" placeholder="Enter amount" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button label="Close" class="p-button-text" @click="showUpgradeDialog = false" />
          <Button label="Confirm Upgrade" class="p-button-success" @click="confirmUpgrade" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Dialog from "primevue/dialog";

/* ----------- Investment Section ----------- */
const expectedReturns = ref(3185);
const currentProfit = ref(185);

const activePack = ref({
  name: "Active Pack",
  amount: 300,
  baseRate: 1.5,
  upgradedRate: 2.0,
  range: "$200 - $499",
  activeReferrals: 2,
  requiredReferrals: 3,
  totalProfit: 120,
  withdrawn: 50,
  status: "Active",
});

/* ----------- Referral & Earnings Data ----------- */
const referrals = ref({ level1: 8, level2: 21, level3: 47 });
const referralProgress = computed(() => Math.min(100, Math.round((referrals.value.level1 / 15) * 100)));
const referralLink = "https://forten.example.com/register?ref=alexjohn";

const referralInvestments = ref({
  level1: 1800,
  level2: 2500,
  level3: 4000,
});

const referralEarnings = ref({
  level1: 270,
  level2: 250,
  level3: 200,
});

const activities = ref([
  { icon: "mdi mdi-cash-plus", title: "Deposit received", desc: "$250 via USDT", time: "3h ago" },
  { icon: "mdi mdi-wallet-outline", title: "Auto-compound applied", desc: "Profit added to principal", time: "1d ago" },
  { icon: "mdi mdi-account-plus", title: "Referral joined", desc: "1 new Level 1 user", time: "2d ago" },
]);

/* ----------- Upgrade / Cancel Logic ----------- */
const showCancelDialog = ref(false);
const showUpgradeDialog = ref(false);
const selectedNextPack = ref("");
const additionalAmount = ref(0);
const upgradeOptions = ref([
  { name: "Growth Pack", range: "$500 - $1,499" },
  { name: "Pro Leader Pack", range: "$1,500 - $4,999" },
  { name: "VIP Master Pack", range: "$5,000 - $10,000" },
]);

function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function openNewInvestment() {
  window.location.href = "/account?tab=new";
}
function transferProfit() {
  const available = activePack.value.totalProfit - activePack.value.withdrawn;
  if (available <= 0) return alert("No profit available for transfer.");
  activePack.value.withdrawn += available;
  alert(`$${available.toFixed(2)} transferred to main balance.`);
}
function openCancelDialog() {
  showCancelDialog.value = true;
}
function confirmCancel() {
  alert(`❌ ${activePack.value.name} canceled — funds returned to balance.`);
  showCancelDialog.value = false;
}
function openUpgradeDialog() {
  selectedNextPack.value = "";
  additionalAmount.value = 0;
  showUpgradeDialog.value = true;
}
function confirmUpgrade() {
  if (!selectedNextPack.value || additionalAmount.value <= 0) {
    alert("Please select next plan and enter valid amount.");
    return;
  }
  activePack.value.name = selectedNextPack.value;
  activePack.value.amount += additionalAmount.value;
  showUpgradeDialog.value = false;
  alert(`✅ Upgraded to ${selectedNextPack.value}!`);
}
</script>

<style scoped lang="scss">
.forten-portfolio {
  color: #e6eef0;
  font-family: "Inter", sans-serif;

  .summary-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 255, 190, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba(0, 255, 190, 0.08);
    transition: all 0.25s ease;
  }
  .summary-card:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-3px);
    border-color: rgba(0, 255, 190, 0.6);
  }

  .pack-card {
    border: 1px solid rgba(0, 255, 190, 0.3);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    box-shadow: 0 0 20px rgba(0, 255, 190, 0.08);
    transition: all 0.25s ease;
  }

  .glass-card {
    padding: 16px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
  }

  .ref-stat {
    text-align: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }
  .ref-num {
    font-size: 18px;
    font-weight: 700;
    color: #10b981;
  }
  .ref-label {
    font-size: 12px;
    color: #9ca3af;
  }

  .glass-subcard {
    border-radius: 10px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .p-button-warning {
    background: linear-gradient(90deg, #f4b000, #facc15) !important;
    color: #0a1325 !important;
    border: none !important;
  }
  .p-button-danger {
    background-color: #ef4444 !important;
    border: none !important;
  }
  .compact-btn {
    padding: 0.4rem 0.7rem !important;
    font-size: 0.8rem !important;
  }
}
</style>
