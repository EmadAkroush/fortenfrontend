<template>
  <div class="portfolio px-6 py-10 space-y-12">
    <!-- ===== Header ===== -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-green-700">My Investment Portfolio</h1>
      <p class="text-gray-600 mt-2">
        Track your bundles, monitor profits, and manage your investments efficiently.
      </p>
    </div>

    <!-- ===== Summary Cards ===== -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card">
        <i class="mdi mdi-cash-multiple text-green-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Total Invested</p>
          <h3 class="text-2xl font-bold text-green-700">${{ totalInvested }}</h3>
        </div>
      </div>

      <div class="stat-card">
        <i class="mdi mdi-trending-up text-blue-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Expected Returns</p>
          <h3 class="text-2xl font-bold text-blue-700">${{ totalReturns }}</h3>
        </div>
      </div>

      <div class="stat-card">
        <i class="mdi mdi-wallet-outline text-purple-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Current Profit</p>
          <h3 class="text-2xl font-bold text-purple-700">${{ totalProfit }}</h3>
        </div>
      </div>

      <div class="stat-card">
        <i class="mdi mdi-chart-line text-yellow-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Active Bundles</p>
          <h3 class="text-2xl font-bold text-yellow-700">{{ portfolio.length }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Performance Chart ===== -->
    <div class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        <i class="mdi mdi-finance text-green-600 text-2xl"></i> Portfolio Performance
      </h2>
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-64" />
    </div>

    <!-- ===== Active Investments ===== -->
    <div>
      <h2 class="text-xl font-bold text-green-700 mb-4">Active Investments</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          v-for="(item, index) in portfolio"
          :key="index"
          class="shadow-lg relative border border-gray-100 rounded-2xl hover:shadow-xl transition-all"
        >
          <template #title>
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-green-700">Bundle #{{ index + 1 }}</h3>
              <span class="text-xs text-gray-400">{{ item.type }}</span>
            </div>
          </template>

          <template #content>
            <div class="text-sm text-gray-700 space-y-2">
              <p>Invested: <span class="font-semibold text-green-700">${{ item.amount }}</span></p>
              <p>Profit Rate: <span class="font-semibold">{{ item.profit }}% / month</span></p>
              <p>Duration: <span class="font-semibold">{{ item.start }} → {{ item.end }}</span></p>
              <div class="mt-3">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{{ item.progress }}%</span>
                </div>
                <ProgressBar :value="item.progress" />
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap gap-2">
              <Button
                label="Details"
                icon="mdi mdi-eye-outline"
                class="p-button-sm p-button-outlined"
                @click="openPlanModal(item)"
              />
              <Button
                label="Renew"
                icon="mdi mdi-refresh"
                class="p-button-sm p-button-success"
              />
              <Button
                label="Upgrade"
                icon="mdi mdi-arrow-up-bold"
                class="p-button-sm p-button-warning"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- ===== Interactive Analytics ===== -->
    <div class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        <i class="mdi mdi-chart-pie text-green-600 text-2xl"></i> Portfolio Analytics
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <Chart
          type="pie"
          :data="pieData"
          :options="pieOptions"
          class="max-h-80"
          @select="onPieSelect"
        />
        <div>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in portfolio"
              :key="i"
              class="flex justify-between border-b pb-2 cursor-pointer transition hover:bg-green-50 p-2 rounded-md"
              :class="{ 'bg-green-100': selectedPlan === item.type }"
              @click="selectedPlan = item.type"
            >
              <span class="font-medium text-gray-700">{{ item.type }}</span>
              <span class="font-bold text-green-600">${{ item.amount }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dynamic Plan Details -->
      <transition name="expand">
        <div
          v-if="selectedDetails"
          class="mt-6 border-t pt-4 bg-gray-50 p-4 rounded-xl shadow-inner"
        >
          <h3 class="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <i class="mdi mdi-information-outline text-green-600"></i>
            {{ selectedPlan }} Details
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="(item, i) in selectedDetails"
              :key="i"
              class="p-3 rounded-lg bg-white shadow-sm border cursor-pointer hover:border-green-500 transition"
              @click="openPlanModal(item)"
            >
              <p class="text-sm text-gray-700">Invested: <span class="font-semibold text-green-700">${{ item.amount }}</span></p>
              <p class="text-sm text-gray-700">Profit Rate: <span class="font-semibold">{{ item.profit }}%</span></p>
              <p class="text-sm text-gray-700">Duration: <span class="font-semibold">{{ item.start }} → {{ item.end }}</span></p>
              <p class="text-sm text-gray-700">Progress: <span class="font-semibold">{{ item.progress }}%</span></p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- ===== Modal: Plan Details ===== -->
    <Dialog v-model:visible="showModal" modal header="Plan Details" class="max-w-lg w-full">
      <div class="space-y-3">
        <h3 class="text-xl font-bold text-green-700">{{ modalData.type }}</h3>
        <p class="text-sm text-gray-600">
          Duration: <span class="font-semibold">{{ modalData.start }} → {{ modalData.end }}</span>
        </p>
        <p>Invested Amount: <span class="font-semibold text-green-700">${{ modalData.amount }}</span></p>
        <p>Profit Rate: <span class="font-semibold">{{ modalData.profit }}% / month</span></p>
        <p>Progress: <span class="font-semibold">{{ modalData.progress }}%</span></p>

        <ProgressBar :value="modalData.progress" class="mt-3" />
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button label="Withdraw" icon="mdi mdi-cash-minus" class="p-button-danger" />
          <Button label="Reinvest" icon="mdi mdi-repeat" class="p-button-success" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Card from "primevue/card"
import Chart from "primevue/chart"
import ProgressBar from "primevue/progressbar"
import Dialog from "primevue/dialog"
import Button from "primevue/button"

const portfolio = [
  { type: "Bronze Plan", amount: 500, profit: 6, progress: 40, start: "2025-01-01", end: "2025-06-01" },
  { type: "Silver Plan", amount: 1000, profit: 5, progress: 25, start: "2025-02-15", end: "2025-08-15" },
  { type: "Gold Plan", amount: 1500, profit: 7, progress: 60, start: "2025-03-05", end: "2026-03-05" },
]

const totalInvested = computed(() => portfolio.reduce((a, b) => a + b.amount, 0))
const totalProfit = computed(() => portfolio.reduce((a, b) => a + (b.amount * b.profit) / 100, 0))
const totalReturns = computed(() => totalInvested.value + totalProfit.value)

// === Charts ===
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Earnings",
      data: [200, 450, 700, 950, 1200, 1600],
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.15)",
      fill: true,
      tension: 0.4,
    },
  ],
}
const chartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    y: { grid: { color: "#f3f4f6" }, ticks: { color: "#4b5563" } },
    x: { grid: { display: false }, ticks: { color: "#4b5563" } },
  },
}

// === Pie Chart ===
const pieData = {
  labels: ["Bronze Plan", "Silver Plan", "Gold Plan"],
  datasets: [{ data: [500, 1000, 1500], backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"] }],
}
const pieOptions = {
  plugins: {
    legend: { position: "bottom" },
    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: $${ctx.formattedValue}` } },
  },
}

// === Interactive Section ===
const selectedPlan = ref(null)
const selectedDetails = computed(() =>
  selectedPlan.value ? portfolio.filter((p) => p.type === selectedPlan.value) : null
)
const onPieSelect = (e) => {
  const label = pieData.labels[e.element.index]
  selectedPlan.value = label
}

// === Modal ===
const showModal = ref(false)
const modalData = ref({})
const openPlanModal = (item) => {
  modalData.value = item
  showModal.value = true
}
</script>

<style lang="scss" scoped>
.portfolio {
  background-color: #f9fbfc;

  .stat-card {
    @apply flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm transition-all hover:shadow-md;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
  }
  .expand-enter-to,
  .expand-leave-from {
    max-height: 300px;
    opacity: 1;
  }
}
</style>
