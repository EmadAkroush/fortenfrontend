<template>
  <div class="dashboard space-y-10 p-4 sm:p-8">
    <!-- ===== Header Section ===== -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-green-700">Welcome Back, Investor 👋</h1>
      <p class="text-gray-500 mt-2">
        Track your financial growth, portfolio, and VX rewards — all in one place.
      </p>
    </div>

    <!-- ===== Stats Overview ===== -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Balance -->
      <div class="card-box">
        <div class="icon-box bg-green-100 text-green-600">
          <i class="mdi mdi-cash-multiple text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Total Balance</p>
          <h3 class="text-2xl font-bold text-green-700">$4,250</h3>
        </div>
      </div>

      <!-- Profits Wallet -->
      <div class="card-box">
        <div class="icon-box bg-blue-100 text-blue-600">
          <i class="mdi mdi-chart-line text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Profits Wallet</p>
          <h3 class="text-2xl font-bold text-blue-700">$1,200</h3>
        </div>
      </div>

      <!-- VX Wallet -->
      <div class="card-box">
        <div class="icon-box bg-purple-100 text-purple-600">
          <i class="mdi mdi-wallet-outline text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">VX Wallet</p>
          <h3 class="text-2xl font-bold text-purple-700">$780</h3>
        </div>
      </div>

      <!-- Binary Bonus -->
      <div class="card-box">
        <div class="icon-box bg-yellow-100 text-yellow-600">
          <i class="mdi mdi-account-group text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Network Bonus</p>
          <h3 class="text-2xl font-bold text-yellow-700">$430</h3>
        </div>
      </div>
    </div>

    <!-- ===== Charts Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Earnings Growth -->
      <Card class="shadow-md">
        <template #title>Earnings Growth</template>
        <template #content>
          <Chart type="line" :data="earningsChart" :options="lineOptions" />
        </template>
      </Card>

      <!-- VX Plan (10x Rule) -->
      <Card class="shadow-md">
        <template #title>VX Plan Progress</template>
        <template #content>
          <Chart type="doughnut" :data="vxChart" />
        </template>
      </Card>
    </div>

    <!-- ===== Referral & Activity Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Referral Overview -->
      <Card class="shadow-md">
        <template #title>Referral Overview</template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Total Referrals</span>
              <span class="font-semibold text-green-700">124</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Active Members</span>
              <span class="font-semibold text-green-700">89</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Referral Earnings</span>
              <span class="font-semibold text-green-700">$560</span>
            </div>
            <Button
              label="Invite More"
              icon="mdi mdi-account-plus-outline"
              class="p-button-success mt-2"
            />
          </div>
        </template>
      </Card>

      <!-- Recent Activity -->
      <Card class="shadow-md">
        <template #title>Recent Activity</template>
        <template #content>
          <ul class="divide-y divide-gray-200 text-sm">
            <li v-for="(item, index) in activities" :key="index" class="py-3 flex justify-between">
              <div class="flex items-center gap-3">
                <i :class="item.icon + ' text-xl text-green-600'"></i>
                <span>{{ item.action }}</span>
              </div>
              <span class="text-gray-500">{{ item.date }}</span>
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import Chart from "primevue/chart";
import Button from "primevue/button";

const earningsChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Earnings ($)",
      data: [300, 800, 1200, 2000, 2600, 3300],
      borderColor: "#10b981",
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(16,185,129,0.15)",
    },
  ],
};

const vxChart = {
  labels: ["Achieved", "Remaining"],
  datasets: [
    {
      data: [65, 35],
      backgroundColor: ["#10b981", "#e5e7eb"],
      hoverOffset: 6,
    },
  ],
};

const lineOptions = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { grid: { color: "#f3f4f6" } },
    x: { grid: { display: false } },
  },
};

const activities = [
  { icon: "mdi mdi-cash-plus", action: "Deposit Added", date: "2h ago" },
  { icon: "mdi mdi-chart-line", action: "Profit Earned", date: "5h ago" },
  { icon: "mdi mdi-wallet-outline", action: "VX Reward Credited", date: "1d ago" },
  { icon: "mdi mdi-cash-minus", action: "Withdrawal Requested", date: "2d ago" },
];
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #f9fbfc;
  .card-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  .card-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
