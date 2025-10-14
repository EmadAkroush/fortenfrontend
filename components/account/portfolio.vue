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
      <div class="summary-card ">
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

      <div class="summary-card">
        <i class="mdi mdi-package-variant-closed summary-icon text-amber-400"></i>
        <div>
          <p class="summary-label">Active Bundles</p>
          <h3 class="summary-value">{{ activeBundles }}</h3>
        </div>
      </div>
    </div>


    <!-- ===== Investment Packages ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="(pack, i) in packages" :key="i" class="pack-card p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-bold text-emerald-300">{{ pack.name }}</h3>
          <span class="px-2 py-0.5 text-xs rounded border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
            {{ pack.status }}
          </span>
        </div>

        <div class="text-sm text-gray-300 space-y-1 mb-3">
          <div>Investment: <span class="font-semibold text-gray-100">${{ formatNumber(pack.amount) }}</span></div>
          <div>Base Rate: <span class="text-emerald-300">{{ pack.baseRate }}%</span></div>
          <div v-if="pack.upgradedRate">
            Upgraded Rate: <span class="text-emerald-300">{{ pack.upgradedRate }}%</span>
          </div>
          <div>Active Referrals: <span class="text-amber-300">{{ pack.activeReferrals }}/{{ pack.requiredReferrals }}</span></div>
        </div>

        <!-- Progress -->
        <div class="space-y-1 mb-4">
          <ProgressBar :value="Math.min((pack.activeReferrals / pack.requiredReferrals) * 100, 100)" class="h-2" />
          <div class="text-xs text-gray-400">
            <span v-if="pack.activeReferrals >= pack.requiredReferrals">✅ Upgraded to {{ pack.upgradedRate }}%</span>
            <span v-else>{{ pack.requiredReferrals - pack.activeReferrals }} more referrals to upgrade</span>
          </div>
        </div>

        <!-- Profit Info -->
        <div class="glass-subcard mb-3">
          <div class="flex justify-between text-sm">
            <span>Total Profit</span>
            <span class="text-emerald-300 font-semibold">${{ formatNumber(pack.totalProfit) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Withdrawn</span>
            <span class="text-gray-400">${{ formatNumber(pack.withdrawn) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Available</span>
            <span class="text-emerald-200 font-semibold">${{ formatNumber(pack.totalProfit - pack.withdrawn) }}</span>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button
            class="p-button-success compact-btn"
            icon="mdi mdi-swap-horizontal-bold"
            label="Transfer Profit"
            @click="transferProfit(pack)"
          />
          <Button
            class="p-button-danger compact-btn"
            icon="mdi mdi-cancel"
            label="Cancel"
            @click="openCancelDialog(pack, i)"
          />
        </div>
      </div>
    </div>

    <!-- ===== Cancel Confirmation Dialog ===== -->
    <Dialog v-model:visible="showCancelDialog" modal header="Cancel Investment" :style="{ width: '90%', maxWidth: '420px' }">
      <p class="text-gray-300 mb-4">
        Are you sure you want to cancel your <span class="text-emerald-300 font-semibold">{{ selectedPack?.name }}</span> package?
      </p>
      <p class="text-gray-400 text-sm mb-6">The invested amount will be returned to your main balance.</p>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button label="Close" class="p-button-text" @click="showCancelDialog = false" />
          <Button label="Confirm Cancel" class="p-button-danger" @click="confirmCancel" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Dialog from "primevue/dialog";
import Chart from "primevue/chart";

const expectedReturns = ref(3185);
const currentProfit = ref(185);
const activeBundles = ref(3);
const showCancelDialog = ref(false);
const selectedPack = ref(null);
const selectedIndex = ref(null);

const packages = ref([
  { name: "Start Pack", amount: 150, baseRate: 1.5, upgradedRate: null, activeReferrals: 0, requiredReferrals: 0, totalProfit: 48.75, withdrawn: 20, status: "Active" },
  { name: "Active Pack", amount: 300, baseRate: 1.5, upgradedRate: 2.0, activeReferrals: 2, requiredReferrals: 3, totalProfit: 120, withdrawn: 50, status: "Active" },
  { name: "Growth Pack", amount: 800, baseRate: 2.0, upgradedRate: 2.5, activeReferrals: 4, requiredReferrals: 5, totalProfit: 260, withdrawn: 130, status: "Active" },
  { name: "Pro Leader Pack", amount: 2000, baseRate: 2.5, upgradedRate: 3.0, activeReferrals: 8, requiredReferrals: 10, totalProfit: 700, withdrawn: 200, status: "Active" },
  { name: "VIP Master Pack", amount: 6500, baseRate: 3.0, upgradedRate: 3.5, activeReferrals: 12, requiredReferrals: 15, totalProfit: 1800, withdrawn: 500, status: "Active" },
]);

const earningsChart = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: "Profit ($)",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100 + 50)),
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.15)",
      fill: true,
      tension: 0.35,
    },
  ],
};

const earningsOptions = {
  plugins: { legend: { display: false } },
  scales: {
    y: { ticks: { color: "#a1a1aa" }, grid: { color: "rgba(255,255,255,0.05)" } },
    x: { ticks: { color: "#a1a1aa" }, grid: { display: false } },
  },
};

function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function openNewInvestment() {
  window.location.href = "/account?tab=new";
}
function transferProfit(pack) {
  const available = pack.totalProfit - pack.withdrawn;
  if (available <= 0) return alert("No profit available for transfer.");
  pack.withdrawn += available;
  alert(`$${available.toFixed(2)} transferred to main balance.`);
}

// ===== Cancel Logic =====
function openCancelDialog(pack, index) {
  selectedPack.value = pack;
  selectedIndex.value = index;
  showCancelDialog.value = true;
}
function confirmCancel() {
  if (selectedPack.value && selectedIndex.value !== null) {
    alert(`❌ ${selectedPack.value.name} canceled — funds returned to balance.`);
    packages.value.splice(selectedIndex.value, 1);
    activeBundles.value = packages.value.length;
  }
  showCancelDialog.value = false;
}
</script>

<style scoped lang="scss">
.forten-portfolio {
  color: #e6eef0;
  font-family: "Inter", sans-serif;

  /* ===== Summary Cards ===== */
  .summary-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    transition: all 0.25s ease;
  }
  .summary-card:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.05);
  }
  .summary-icon {
    font-size: 2rem;
  }
  .summary-label {
    font-size: 0.9rem;
    color: #9ca3af;
  }
  .summary-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e5fbea;
  }

  /* ===== Cards ===== */
  .glass-card,
  .pack-card,
  .glass-subcard {
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.25s ease;
  }
  .pack-card:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 255, 190, 0.1);
  }

  .glass-subcard {
    border-radius: 10px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
  }

  /* ===== Buttons ===== */
  .compact-btn {
    padding: 0.4rem 0.7rem !important;
    font-size: 0.8rem !important;
  }
  .p-button-danger {
    background-color: #ef4444 !important;
    border: none !important;
  }

  @media (max-width: 640px) {
    padding: 0.75rem !important;
    .summary-card {
      padding: 0.8rem;
    }
    .pack-card {
      padding: 10px;
    }
    .compact-btn {
      padding: 0.25rem 0.6rem !important;
      font-size: 0.75rem !important;
    }
  }
}
</style>
