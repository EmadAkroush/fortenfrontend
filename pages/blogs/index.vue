<template>
  <div class="finalxcard-performance p-0 sm:p-8">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-300">
          Dashboard Overview
        </h1>
        <p class="text-sm text-gray-300 mt-1">
          Auto-compounding active — profits are automatically added to principal
          every 24 hours.
        </p>
      </div>

      <div class="flex gap-3 items-center W-full sm:w-auto">
        <Button
          class="p-button-outlined min-w-[140px]"
          icon="mdi mdi-refresh"
          @click="refreshData"
          >Refresh</Button
        >
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
          <div class="kpi-label">Total Balance</div>
          <div class="kpi-value">${{ formatNumber(totalBalance) }}</div>
          <div class="kpi-sub text-xs text-gray-400">
            Includes compounded profit
          </div>
        </div>
      </div>

      <!-- 🟢 Profit Balance -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-trending-up kpi-icon bg-gradient-cyan"></i>
          <div>
            <div class="kpi-label">Profit Balance</div>
            <div class="kpi-value">${{ formatNumber(profitBalance) }}</div>
            <div class="kpi-sub text-xs text-gray-400">
              Earned from daily profits
            </div>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('profit')"
        />
      </div>

      <!-- 🟢 Referral Profit -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-account-multiple-outline kpi-icon bg-gradient-purple"></i>
          <div>
            <div class="kpi-label">Referral Profit</div>
            <div class="kpi-value">${{ formatNumber(referralProfit) }}</div>
            <div class="kpi-sub text-xs text-gray-400">
              Income from your referrals
            </div>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('referral')"
        />
      </div>

      <!-- 🟢 Bonus Balance -->
      <div class="kpi-card flex flex-col justify-between">
        <div class="flex items-center gap-3">
          <i class="mdi mdi-gift-outline kpi-icon bg-gradient-pink"></i>
          <div>
            <div class="kpi-label">Bonus Balance</div>
            <div class="kpi-value text-emerald-300">
              ${{ formatNumber(bonusBalance) }}
            </div>
            <div class="kpi-sub text-xs text-gray-400">
              Earned from direct referrals
            </div>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="mt-3 p-button-sm p-button-outlined border-emerald-400 text-emerald-300"
          @click="transferToMain('bonus')"
        />
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="glass-card">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-100">
            Compound Growth (30 days)
          </h3>
          <div class="text-sm text-gray-400">
            Projection at current daily rate
          </div>
        </div>

        <Chart
          type="line"
          :data="compoundChartData"
          :options="compoundChartOptions"
        />

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="text-sm text-gray-300">
            <div>
              Start Amount:
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(simStart) }}</span
              >
            </div>
            <div>
              Daily Rate:
              <span class="font-semibold text-emerald-300"
                >{{ displayDailyRate }}%</span
              >
            </div>
          </div>
          <div class="text-sm text-gray-300">
            <div>
              Projected (Day 30):
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(projectedDay30) }}</span
              >
            </div>
            <div>
              Projected Gain:
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(projectedDay30 - simStart) }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings Breakdown -->
      <div class="glass-card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-100">
            Earnings Breakdown
          </h3>
          <div class="text-sm text-gray-400">Last 30 days</div>
        </div>

        <Chart
          type="doughnut"
          :data="earningsBreakdownData"
          :options="donutOptions"
        />

        <div class="grid grid-cols-1 gap-2">
          <div class="flex justify-between text-sm text-gray-300">
            <div>Principal</div>
            <div class="font-semibold">
              ${{ formatNumber(portfolioPrincipal) }}
            </div>
          </div>
          <div class="flex justify-between text-sm text-gray-300">
            <div>Compound Profit</div>
            <div class="font-semibold">
              ${{ formatNumber(totalCompounded) }}
            </div>
          </div>
          <div class="flex justify-between text-sm text-gray-300">
            <div>Referral Income (est.)</div>
            <div class="font-semibold">
              ${{ formatNumber(estimatedReferralIncome) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral & Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="glass-card col-span-2">
        <h3 class="text-lg font-semibold text-gray-100 mb-3">
          Referral & Network
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level1 }}</div>
            <div class="ref-label">Direct (L1)</div>
          </div>
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level2 }}</div>
            <div class="ref-label">Level 2</div>
          </div>
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level3 }}</div>
            <div class="ref-label">Level 3</div>
          </div>
        </div>

        <div class="mb-3 text-sm text-gray-300">
          <div>Referral commissions: L1 15% / L2 10% / L3 5%</div>
          <div class="mt-1">
            Referral link:
            <code class="text-xs px-2 py-1 bg-gray-800 rounded">{{
              referralLink
            }}</code>
          </div>
        </div>

        <ProgressBar :value="referralProgress" />
        <div class="text-xs text-gray-400 mt-2">
          Progress toward next VIP level: {{ referralProgress }}%
        </div>
      </div>

      <div class="glass-card">
        <h3 class="text-lg font-semibold text-gray-100 mb-3">
          Recent Activity
        </h3>
        <ul class="divide-y divide-white/5 text-sm text-gray-300">
          <li
            v-for="(a, i) in activities"
            :key="i"
            class="py-3 flex justify-between"
          >
            <div class="flex items-center gap-3">
              <i :class="[a.icon, 'text-emerald-300 text-xl']"></i>
              <div>
                <div class="font-medium">{{ a.title }}</div>
                <div class="text-xs text-gray-400">{{ a.desc }}</div>
              </div>
            </div>
            <div class="text-xs text-gray-400">{{ a.time }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Chart from "primevue/chart";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";

// --- Existing states ---
const portfolioPrincipal = ref(1250);
const totalCompounded = ref(320);
const totalBalance = computed(() => portfolioPrincipal.value + totalCompounded.value);

// --- New balances ---
const profitBalance = ref(275.5);
const referralProfit = ref(120.75);
const bonusBalance = ref(80.0);

// Transfer simulation
function transferToMain(type) {
  alert(`✅ ${type} balance transferred to Main Balance (demo).`);
}

// Keep rest of page logic
const displayDailyRate = ref(1.5);
const simStart = ref(500);
const projectedDay30 = ref(750);
const compoundChartData = { labels: [], datasets: [] };
const compoundChartOptions = {};
const earningsBreakdownData = { labels: [], datasets: [] };
const donutOptions = {};
const referrals = ref({ level1: 8, level2: 21, level3: 47 });
const referralProgress = ref(40);
const referralLink = "https://finalxcard.example.com/register?ref=alexjohn";
const activities = ref([]);

function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function refreshData() {
  alert("Data refreshed (demo).");
}
function goToAddFunds() {
  window.location.href = "/addfunds";
}
</script>

<style scoped lang="scss">
.finalxcard-performance {

  color: #e6eef0;

  .bg-gradient-pink {
    background: linear-gradient(135deg, #ec4899, #a855f7);
    color: #002;
  }

  .kpi-card {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.01)
    );
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
    color: #002;
  }
  .bg-gradient-cyan {
    background: linear-gradient(135deg, #06b6d4, #60a5fa);
    color: #002;
  }
  .bg-gradient-purple {
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    color: #002;
  }
}
</style>
