<template>
  <div class="forten-performance p-0 sm:p-8 ">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-300">Performance Overview</h1>
        <p class="text-sm text-gray-300 mt-1">
          Auto-compounding active — profits are automatically added to principal every 24 hours.
        </p>
      </div>

      <div class="flex gap-3 items-center W-full sm:w-auto">
        <Button class="p-button-outlined min-w-[140px]" icon="mdi mdi-refresh" @click="refreshData">Refresh</Button>
        <Button class="p-button-success min-w-[140px]" icon="mdi mdi-wallet-plus-outline" @click="goToAddFunds">Add Funds</Button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-cash-multiple kpi-icon bg-gradient-emerald"></i>
        </div>
        <div>
          <div class="kpi-label">Total Balance</div>
          <div class="kpi-value">${{ formatNumber(totalBalance) }}</div>
          <div class="kpi-sub text-xs text-gray-400">Includes compounded profit</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-chart-line kpi-icon bg-gradient-cyan"></i>
        </div>
        <div>
          <div class="kpi-label">Daily Rate</div>
          <div class="kpi-value">
            <span class="mr-2 text-lg">{{ displayDailyRate }}%</span>
            <span v-if="isEligibleForUpgrade" class="text-xs text-amber-300">upgraded</span>
            <span v-else class="text-xs text-gray-400">base</span>
          </div>
          <div class="kpi-sub text-xs text-gray-400">Auto-applies when referral condition met</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-wallet-outline kpi-icon bg-gradient-purple"></i>
        </div>
        <div>
          <div class="kpi-label">Total Compounded</div>
          <div class="kpi-value">${{ formatNumber(totalCompounded) }}</div>
          <div class="kpi-sub text-xs text-gray-400">Sum of all auto-added profits</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-timer-sand kpi-icon bg-gradient-yellow"></i>
        </div>
        <div>
          <div class="kpi-label">Next Auto-Compound</div>
          <div class="kpi-value">{{ nextCompoundCountdown }}</div>
          <div class="kpi-sub text-xs text-gray-400">Profit will be auto-added to principal</div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Compound Growth Simulation -->
      <div class="glass-card">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-100">Compound Growth (30 days)</h3>
          <div class="text-sm text-gray-400">Projection at current daily rate</div>
        </div>

        <Chart type="line" :data="compoundChartData" :options="compoundChartOptions" />

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="text-sm text-gray-300">
            <div>Start Amount: <span class="font-semibold text-emerald-300">${{ formatNumber(simStart) }}</span></div>
            <div>Daily Rate: <span class="font-semibold text-emerald-300">{{ displayDailyRate }}%</span></div>
          </div>
          <div class="text-sm text-gray-300">
            <div>Projected (Day 30): <span class="font-semibold text-emerald-300">${{ formatNumber(projectedDay30) }}</span></div>
            <div>Projected Gain: <span class="font-semibold text-emerald-300">${{ formatNumber(projectedDay30 - simStart) }}</span></div>
          </div>
        </div>
      </div>

      <!-- Earnings & VX Plan -->
      <div class="glass-card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-100">Earnings Breakdown</h3>
          <div class="text-sm text-gray-400">Last 30 days</div>
        </div>

        <Chart type="doughnut" :data="earningsBreakdownData" :options="donutOptions" />

        <div class="grid grid-cols-1 gap-2">
          <div class="flex justify-between text-sm text-gray-300">
            <div>Principal</div>
            <div class="font-semibold">${{ formatNumber(portfolioPrincipal) }}</div>
          </div>
          <div class="flex justify-between text-sm text-gray-300">
            <div>Compound Profit</div>
            <div class="font-semibold">${{ formatNumber(totalCompounded) }}</div>
          </div>
          <div class="flex justify-between text-sm text-gray-300">
            <div>Referral Income (est.)</div>
            <div class="font-semibold">${{ formatNumber(estimatedReferralIncome) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referrals & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="glass-card col-span-2">
        <h3 class="text-lg font-semibold text-gray-100 mb-3">Referral & Network</h3>

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
          <div class="mt-1">Referral link: <code class="text-xs px-2 py-1 bg-gray-800 rounded">{{ referralLink }}</code></div>
        </div>

        <ProgressBar :value="referralProgress" />
        <div class="text-xs text-gray-400 mt-2">Progress toward next VIP level: {{ referralProgress }}%</div>
      </div>

      <div class="glass-card">
        <h3 class="text-lg font-semibold text-gray-100 mb-3">Recent Activity</h3>
        <ul class="divide-y divide-white/5 text-sm text-gray-300">
          <li v-for="(a, i) in activities" :key="i" class="py-3 flex justify-between">
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

    <!-- Actions -->
    <div class="flex justify-end gap-3 mt-6">
      <Button class="p-button-outlined min-w-[140px]" icon="mdi mdi-file-document-outline" @click="downloadStatement">Export CSV</Button>
      <Button class="p-button-success min-w-[140px]" icon="mdi mdi-swap-horizontal-bold" @click="openPortfolio">Manage Portfolio</Button>
    </div>

    <!-- Cancel Investment Dialog -->
    <Dialog v-model:visible="showCancelDialog" modal :header="'Cancel Investment — ' + cancelItem?.title" :style="{ width: '90%', maxWidth: '480px' }">
      <div v-if="cancelItem" class="space-y-4">
        <p class="text-sm text-gray-300">Choose how much of the principal you want to release (free partial cancellation — no time lock):</p>

        <label class="text-xs text-gray-400">Amount (USD)</label>
        <InputNumber v-model="cancelAmount" :min="1" :max="cancelItem.principal" mode="currency" currency="USD" locale="en-US" class="w-full" />

        <div class="text-sm text-gray-400">After confirmation, the selected amount will be moved to your main balance.</div>
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button label="Close" class="p-button-text" @click="showCancelDialog = false" />
          <Button label="Confirm Release" class="p-button-success" @click="confirmCancel" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
/* Performance.vue — Forten style performance dashboard
   - Uses PrimeVue components: Chart, Button, Dialog, InputNumber, ProgressBar
   - Sample data included (replace with API calls in real integration)
*/
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Chart from "primevue/chart";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import ProgressBar from "primevue/progressbar";

// ---------- Sample / reactive state ----------
const portfolioPrincipal = ref(1250.0); // principal across user's active investments
const totalCompounded = ref(320.45); // accumulated auto-compounded profit
const baseDailyRate = ref(1.5); // base %
const upgradedDailyRate = ref(2.0); // when referral condition met
const referrals = ref({ level1: 8, level2: 21, level3: 47 });

const isEligibleForUpgrade = computed(() => {
  // example: eligible if level1 >= 3 (Active Pack) OR other rules depending on package
  return referrals.value.level1 >= 3;
});

// used display rate depending on eligibility
const displayDailyRate = computed(() => (isEligibleForUpgrade.value ? upgradedDailyRate.value : baseDailyRate.value));

// total balance = principal + compounded
const totalBalance = computed(() => portfolioPrincipal.value + totalCompounded.value);

// estimated referral income (simple est)
const estimatedReferralIncome = computed(() => {
  // rough estimate based on referrals and average investment
  const avgInvest = 200;
  return (referrals.value.level1 * 0.15 + referrals.value.level2 * 0.10 + referrals.value.level3 * 0.05) * avgInvest;
});

// activities
const activities = ref([
  { icon: "mdi mdi-cash-plus", title: "Deposit received", desc: "$250 via USDT (BEP20)", time: "3h ago" },
  { icon: "mdi mdi-wallet-outline", title: "Auto-compound applied", desc: "Daily profit added to principal", time: "15h ago" },
  { icon: "mdi mdi-account-plus", title: "Referral joined", desc: "You gained 1 direct referral", time: "2d ago" },
  { icon: "mdi mdi-cash-minus", title: "Withdrawal", desc: "$100 pending", time: "4d ago" },
]);

// ---------- Referral / VIP progress ----------
const referralProgress = computed(() => {
  // sample: VIP5 requires 15 active direct referrals
  const needed = 15;
  const p = Math.min(100, Math.round((referrals.value.level1 / needed) * 100));
  return p;
});

// referral link (note: per requirement should use username-based link, here mocked)
const username = "alexjohn"; // replace with auth user
const referralLink = `https://forten.example.com/register?ref=${username}`;

// ---------- Auto-compound countdown ----------
const nextCompoundAt = ref(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 30); // sample: 5h30m from now
const nextCompoundCountdown = ref("");

// update countdown every second
let countdownTimer = null;
function updateCountdown() {
  const diff = Math.max(0, nextCompoundAt.value - Date.now());
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  nextCompoundCountdown.value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  if (diff === 0) {
    // simulate auto-compound execution (for demo)
    applyAutoCompound();
    nextCompoundAt.value = Date.now() + 24 * 60 * 60 * 1000;
  }
}
onMounted(() => {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
});
onBeforeUnmount(() => clearInterval(countdownTimer));

// simulate auto-compound: add today's profit to totalCompounded and principal
function applyAutoCompound() {
  const rate = displayDailyRate.value / 100;
  const profit = parseFloat((portfolioPrincipal.value * rate).toFixed(6));
  totalCompounded.value = parseFloat((totalCompounded.value + profit).toFixed(6));
  portfolioPrincipal.value = parseFloat((portfolioPrincipal.value + profit).toFixed(6));
  // push activity
  activities.value.unshift({ icon: "mdi mdi-wallet-outline", title: "Auto-compound applied", desc: `+ $${profit.toFixed(2)} added`, time: "just now" });
  // keep activity list size reasonable
  if (activities.value.length > 12) activities.value.pop();
}

// ---------- Compound growth simulation ----------
const simStart = ref(500.0); // starting amount for simulation (could be user's selected portfolio)
const simDays = ref(30);

const simDailyRate = computed(() => displayDailyRate.value / 100);

// compute projected values day-by-day (compound)
const compoundSeries = computed(() => {
  let arr = [];
  let value = simStart.value;
  for (let d = 0; d <= simDays.value; d++) {
    arr.push(parseFloat(value.toFixed(6)));
    value = value * (1 + simDailyRate.value);
  }
  return arr;
});

const projectedDay30 = computed(() => compoundSeries.value[compoundSeries.value.length - 1]);

// Chart data
const compoundChartData = computed(() => {
  return {
    labels: Array.from({ length: simDays.value + 1 }, (_, i) => `D${i}`),
    datasets: [
      {
        label: "Balance",
        data: compoundSeries.value,
        borderColor: "#34D399",
        backgroundColor: "rgba(52,211,153,0.12)",
        tension: 0.35,
        fill: true,
        pointRadius: 0,
      },
    ],
  };
});

const compoundChartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    y: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.03)" } },
    x: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
  },
  elements: { line: { borderWidth: 2 } },
};

// Earnings breakdown donut
const earningsBreakdownData = computed(() => ({
  labels: ["Principal", "Compound Profit", "Referral (est)"],
  datasets: [
    {
      data: [portfolioPrincipal.value, totalCompounded.value, estimatedReferralIncome.value],
      backgroundColor: ["#0b9f7a", "#34d399", "#fbbf24"],
      hoverOffset: 6,
    },
  ],
}));

const donutOptions = {
  plugins: { legend: { position: "bottom", labels: { color: "#cbd5e1" } } },
};

// ---------- Modal: Cancel investment ----------
const showCancelDialog = ref(false);
const cancelItem = ref(null);
const cancelAmount = ref(null);

function openCancelDialog(item) {
  cancelItem.value = item;
  cancelAmount.value = Math.min(item.principal, 50);
  showCancelDialog.value = true;
}
function confirmCancel() {
  if (!cancelAmount.value || cancelAmount.value <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  // simulate moving to main balance
  const amt = Number(cancelAmount.value);
  if (amt > cancelItem.value.principal) {
    alert("Amount exceeds principal.");
    return;
  }
  cancelItem.value.principal -= amt;
  // move to main balance
  // in real app: call API -> update balances
  activities.value.unshift({ icon: "mdi mdi-cash-refund", title: "Partial release", desc: `$${amt.toFixed(2)} moved to balance`, time: "just now" });
  showCancelDialog.value = false;
}

// ---------- Small utilities ----------
function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function refreshData() {
  // in real implementation: fetch user data from API
  alert("Data refreshed (demo).");
}
function goToAddFunds() {
  // navigate to add funds page
  window.location.href = "/addfunds";
}
function openPortfolio() {
  window.location.href = "/account?tab=portfolio";
}
function downloadStatement() {
  alert("Exported CSV (demo).");
}
</script>

<style scoped lang="scss">
/* Forten-style visual */
.forten-performance {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #e6eef0;

  .kpi-card {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 12px;
    backdrop-filter: blur(8px);
  }

  .kpi-left { width: 56px; display:flex; align-items:center; justify-content:center; }
  .kpi-icon { font-size: 22px; padding: 10px; border-radius: 10px; color: #002; }
  .bg-gradient-emerald { background: linear-gradient(135deg,#10b981,#06b6d4); color: #002; }
  .bg-gradient-cyan { background: linear-gradient(135deg,#06b6d4,#60a5fa); color: #002; }
  .bg-gradient-purple { background: linear-gradient(135deg,#a78bfa,#f472b6); color: #002; }
  .bg-gradient-yellow { background: linear-gradient(135deg,#f59e0b,#f97316); color: #002; }

  .kpi-label { font-size: 12px; color: #a6b0b5; }
  .kpi-value { font-size: 20px; font-weight:700; color: #e6fff2; }

  .glass-card {
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.04);
    backdrop-filter: blur(8px);
  }

  .ref-stat {
    text-align: center;
    padding: 10px;
    background: rgba(255,255,255,0.02);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.03);
  }
  .ref-num { font-size: 18px; font-weight: 700; color: #10b981; }
  .ref-label { font-size: 12px; color: #9ca3af; }

  /* small screens tweaks */
  @media (max-width: 640px) {
    .kpi-value { font-size: 18px; }
    .kpi-card { padding: 10px; gap: 8px; }
  }
}
</style>
