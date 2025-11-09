<template>
  <div class="finalxcard-performance p-0 sm:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-300">
          Dashboard Overview
        </h1>
        <p class="text-sm text-gray-300 mt-1">
          Auto-compounding active — profits are automatically added to principal every 24 hours.
        </p>
      </div>

      <div class="flex gap-3 items-center W-full sm:w-auto">
        <Button
          class="p-button-success min-w-[140px]"
          icon="mdi mdi-wallet-plus-outline"
          @click="goToAddFunds"
          >Add Funds</Button
        >
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <!-- Total Balance -->
      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-cash-multiple kpi-icon bg-gradient-emerald"></i>
        </div>
        <div>
          <div class="kpi-label">Main Balance</div>
          <div class="kpi-value">${{ formatNumber(balances.mainBalance) }}</div>
          <div class="kpi-sub text-xs text-gray-400">Includes compounded profit</div>
        </div>
      </div>

      <!-- Profit Balance -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-trending-up kpi-icon bg-gradient-cyan"></i>
          <div>
            <div class="kpi-label">Profit Balance</div>
            <div class="kpi-value">${{ formatNumber(balances.profitBalance) }}</div>
            <div class="kpi-sub text-xs text-gray-400">Earned from daily profits</div>
          </div>
        </div>
        <!-- <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('profit')"
          :loading="loadingTransfer === 'profit'"
        /> -->
      </div>

      <!-- Referral Profit -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-account-multiple-outline kpi-icon bg-gradient-purple"></i>
          <div>
            <div class="kpi-label">Referral Balance</div>
            <div class="kpi-value">${{ formatNumber(balances.referralBalance) }}</div>
            <div class="kpi-sub text-xs text-gray-400">Income from your referrals</div>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('referral')"
          :loading="loadingTransfer === 'referral'"
        />
      </div>

      <!-- Bonus Balance -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-gift-outline kpi-icon bg-gradient-pink"></i>
          <div>
            <div class="kpi-label">Bonus Balance</div>
            <div class="kpi-value text-emerald-300">${{ formatNumber(balances.bonusBalance) }}</div>
            <div class="kpi-sub text-xs text-gray-400">Earned from direct referrals</div>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('bonus')"
          :loading="loadingTransfer === 'bonus'"
        />
      </div>

      <!-- Auto Compound -->
      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-timer-sand kpi-icon bg-gradient-yellow"></i>
        </div>
        <div>
          <div class="kpi-label"> Auto-Compound</div>
          <div class="kpi-value">Your profit is calculated every 24 hours. </div>
          <div class="kpi-sub text-xs text-gray-400">
            Profit will be auto-added to principal
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Profit Growth -->
      <div class="glass-card">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-100">Profit Balance Growth (30 days)</h3>
          <div class="text-sm text-gray-400">Performance over last month</div>
        </div>

        <Chart type="line" :data="profitGrowthChartData" :options="profitGrowthChartOptions" />
      </div>

      <!-- Balance Distribution -->
      <div class="glass-card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-100">Balance Distribution</h3>
          <div class="text-sm text-gray-400">Across all earnings</div>
        </div>

        <Chart type="doughnut" :data="balanceDistributionData" :options="donutOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import Chart from "primevue/chart";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
const { authUser } = useAuth();

const toast = useToast();

// ✅ Reactive states
const balances = ref({
  mainBalance: 0,
  profitBalance: 0,
  referralBalance: 0,
  bonusBalance: 0,
});

const totalBalance = computed(() =>
  balances.value.mainBalance +
  balances.value.profitBalance +
  balances.value.referralBalance +
  balances.value.bonusBalance
);

// ✅ Chart states
const profitGrowthChartData = ref({ labels: [], datasets: [] });
const profitGrowthChartOptions = {
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.parsed.y;
          return toEnglishDigits(value.toLocaleString("en-US", { maximumFractionDigits: 2 }));
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#cbd5e1",
        callback: function (val) {
          return toEnglishDigits(this.getLabelForValue(val));
        }
      },
      grid: { color: "rgba(255,255,255,0.05)" }
    },
    y: {
      ticks: {
        color: "#cbd5e1",
        callback: function (val) {
          return toEnglishDigits(val.toLocaleString("en-US", { maximumFractionDigits: 2 }));
        }
      },
      grid: { color: "rgba(255,255,255,0.05)" }
    }
  }
};

const balanceDistributionData = computed(() => ({
  labels: ["Profit", "Referral", "Bonus"],
  datasets: [
    {
      data: [
        balances.value.profitBalance,
        balances.value.referralBalance,
        balances.value.bonusBalance,
      ],
      backgroundColor: ["#10b981", "#06b6d4", "#ec4899"],
    },
  ],
}));
const donutOptions = {
  plugins: { legend: { position: "bottom", labels: { color: "#cbd5e1" } } },
};





/* ======================
   ✅ API Calls (Backend)
   ====================== */

async function fetchBalances() {
  try {
    const userId = authUser.value?.user?.id;
    if (!userId) return;
    const res = await $fetch("/api/balances", {
      method: "POST",
      body: { userId },
    });
    balances.value = res;
   
    
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error loading balances",
      detail: error?.data?.message || "Failed to fetch balances",
      life: 4000,
    });
  }
}

/* ==========================
   ✅ Transfer to Main Logic
   ========================== */
const loadingTransfer = ref(null);
async function transferToMain(type) {
  try {
    loadingTransfer.value = type;
    const userId = authUser.value.user.id;

    let endpoint = "";
    if (type === "profit") endpoint = "/api/activity/transferprofit";
    else if (type === "referral") endpoint = "/api/activity/transferreferral";
    else if (type === "bonus") endpoint = "/api/activity/transferbonus";

    const res = await $fetch(endpoint, {
      method: "POST",
      body: { userId, amount: balances.value[`${type}Balance`] },
    });

    toast.add({
      severity: "success",
      summary: "Transfer Successful",
      detail: res.message || "Funds moved to Main Balance",
      life: 4000,
    });

    fetchBalances();
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Transfer Failed",
      detail: err?.data?.message || "Unable to transfer balance",
      life: 4000,
    });
  } finally {
    loadingTransfer.value = null;
  }
}

/* ======================
   ✅ Utils
   ====================== */
function toEnglishDigits(str) {
  return str.toString().replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728));
}

function formatNumber(v) {
  const english = Number(v)
    .toLocaleString("en-US", { maximumFractionDigits: 2 })
    .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728));
  return english;
}
function goToAddFunds() {
  navigateTo("/addfunds");
}

/* ======================
   ✅ Ensure balances are fetched
   - Try fetch on mount if authUser is ready
   - Watch authUser and fetch once user becomes available
   ====================== */
onMounted(() => {
  if (authUser?.value?.user?.id) {
    fetchBalances();
  }
});

watch(
  () => authUser.value,
  (newVal) => {
    if (newVal?.user?.id) fetchBalances();
  }
);
</script>


<style scoped lang="scss">
.finalxcard-performance {

  color: #e6eef0;
  .bg-gradient-pink {
    background: linear-gradient(135deg, #ec4899, #a855f7);
  }
  .kpi-card {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    backdrop-filter: blur(8px);
  }
  .kpi-left {
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .kpi-icon {
    font-size: 22px;
    padding: 10px;
    border-radius: 10px;
    color: #002;
  }
  .bg-gradient-emerald {
    background: linear-gradient(135deg, #10b981, #06b6d4);
  }
  .bg-gradient-cyan {
    background: linear-gradient(135deg, #06b6d4, #60a5fa);
  }
  .bg-gradient-purple {
    background: linear-gradient(135deg, #a78bfa, #f472b6);
  }
  .bg-gradient-yellow {
    background: linear-gradient(135deg, #f59e0b, #f97316);
  }
  .glass-card {
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border: 1px solid rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(8px);
  }
}
</style>
