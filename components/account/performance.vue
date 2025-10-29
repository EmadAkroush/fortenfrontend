<template>
  <div class="forten-performance p-0 sm:p-8">
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

      <div class="kpi-card">
        <div class="kpi-left">
          <i class="mdi mdi-timer-sand kpi-icon bg-gradient-yellow"></i>
        </div>
        <div>
          <div class="kpi-label">Next Auto-Compound</div>
          <div class="kpi-value">{{ nextCompoundCountdown }}</div>
          <div class="kpi-sub text-xs text-gray-400">
            Profit will be auto-added to principal
          </div>
        </div>
      </div>

   
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Compound Growth Simulation -->
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

      <!-- Earnings & VX Plan -->
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
const displayDailyRate = computed(() =>
  isEligibleForUpgrade.value ? upgradedDailyRate.value : baseDailyRate.value
);

// total balance = principal + compounded
const totalBalance = computed(
  () => portfolioPrincipal.value + totalCompounded.value
);

// estimated referral income (simple est)
const estimatedReferralIncome = computed(() => {
  // rough estimate based on referrals and average investment
  const avgInvest = 200;
  return (
    (referrals.value.level1 * 0.15 +
      referrals.value.level2 * 0.1 +
      referrals.value.level3 * 0.05) *
    avgInvest
  );
});

// activities
const activities = ref([
  {
    icon: "mdi mdi-cash-plus",
    title: "Deposit received",
    desc: "$250 via USDT (BEP20)",
    time: "3h ago",
  },
  {
    icon: "mdi mdi-wallet-outline",
    title: "Auto-compound applied",
    desc: "Daily profit added to principal",
    time: "15h ago",
  },
  {
    icon: "mdi mdi-account-plus",
    title: "Referral joined",
    desc: "You gained 1 direct referral",
    time: "2d ago",
  },
  {
    icon: "mdi mdi-cash-minus",
    title: "Withdrawal",
    desc: "$100 pending",
    time: "4d ago",
  },
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
  nextCompoundCountdown.value = `${String(h).padStart(2, "0")}:${String(
    m
  ).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
  totalCompounded.value = parseFloat(
    (totalCompounded.value + profit).toFixed(6)
  );
  portfolioPrincipal.value = parseFloat(
    (portfolioPrincipal.value + profit).toFixed(6)
  );
  // push activity
  activities.value.unshift({
    icon: "mdi mdi-wallet-outline",
    title: "Auto-compound applied",
    desc: `+ $${profit.toFixed(2)} added`,
    time: "just now",
  });
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

const projectedDay30 = computed(
  () => compoundSeries.value[compoundSeries.value.length - 1]
);

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
    y: {
      ticks: { color: "#cbd5e1" },
      grid: { color: "rgba(255,255,255,0.03)" },
    },
    x: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
  },
  elements: { line: { borderWidth: 2 } },
};

// Earnings breakdown donut
const earningsBreakdownData = computed(() => ({
  labels: ["Principal", "Compound Profit", "Referral (est)"],
  datasets: [
    {
      data: [
        portfolioPrincipal.value,
        totalCompounded.value,
        estimatedReferralIncome.value,
      ],
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
  activities.value.unshift({
    icon: "mdi mdi-cash-refund",
    title: "Partial release",
    desc: `$${amt.toFixed(2)} moved to balance`,
    time: "just now",
  });
  showCancelDialog.value = false;
}

// ---------- Small utilities ----------
function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function goToAddFunds() {
  // navigate to add funds page
  window.location.href = "/addfunds";
}


const level1Bonus = computed(() => referrals.value.level1 * 8)

</script>

<style scoped lang="scss">
/* Forten-style visual */
.forten-performance {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", Arial;
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
  .bg-gradient-yellow {
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: #002;
  }

  .kpi-label {
    font-size: 12px;
    color: #a6b0b5;
  }
  .kpi-value {
    font-size: 20px;
    font-weight: 700;
    color: #e6fff2;
  }

  .glass-card {
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.01)
    );
    border: 1px solid rgba(255, 255, 255, 0.04);
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

  /* small screens tweaks */
  @media (max-width: 640px) {
    .kpi-value {
      font-size: 18px;
    }
    .kpi-card {
      padding: 10px;
      gap: 8px;
    }
  }
}
</style>
