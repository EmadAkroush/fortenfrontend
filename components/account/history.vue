<template>
  <div class="history-page p-6 space-y-6 max-w-6xl mx-auto">
    <!-- ===== Header ===== -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
        Transaction History
      </h2>
      <div class="flex gap-3 items-center flex-wrap">
        <!-- Search -->
        <span class="p-input-icon-left">
          <i class="mdi mdi-magnify"></i>
          <InputText
            v-model="search"
            placeholder="Search by type or amount"
            class="p-inputtext-sm w-56"
          />
        </span>

        <!-- Filter Type -->
        <Dropdown
          v-model="selectedType"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Types"
          class="p-inputtext-sm w-40"
        />

        <!-- Filter Status -->
        <Dropdown
          v-model="selectedStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Status"
          class="p-inputtext-sm w-40"
        />

        <!-- Date Filters -->
        <div class="flex gap-2 items-center">
          <Calendar
            v-model="dateFrom"
            placeholder="From"
            showIcon
            class="p-inputtext-sm w-32"
          />
          <Calendar
            v-model="dateTo"
            placeholder="To"
            showIcon
            class="p-inputtext-sm w-32"
          />
        </div>
      </div>
    </div>

    <!-- ===== Table ===== -->
    <Card class="shadow-md">
      <template #content>
        <DataTable
          :value="filteredTransactions"
          paginator
          :rows="6"
          stripedRows
          responsiveLayout="scroll"
          class="text-sm"
          :rowHover="true"
        >
          <Column header="Date" field="date" sortable></Column>

          <Column header="Type" field="type" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <i
                  :class="typeIcon(slotProps.data.type)"
                  class="text-lg"
                ></i>
                <span>{{ slotProps.data.type }}</span>
              </div>
            </template>
          </Column>

          <Column header="Amount" field="amount" sortable>
            <template #body="slotProps">
              <span class="font-semibold text-gray-800">
                {{ slotProps.data.amount }}
              </span>
            </template>
          </Column>

          <Column header="Status" field="status">
            <template #body="slotProps">
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full"
                :class="statusClass(slotProps.data.status)"
              >
                {{ slotProps.data.status }}
              </span>
            </template>
          </Column>

          <Column header="Transaction ID" field="id">
            <template #body="slotProps">
              <span class="font-mono text-gray-600 text-xs">{{
                slotProps.data.id
              }}</span>
            </template>
          </Column>

          <Column header="Action">
            <template #body="slotProps">
              <Button
                icon="mdi mdi-eye-outline"
                class="p-button-rounded p-button-text text-gray-700"
                @click="showDetails(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- ===== Modal (Transaction Details) ===== -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Transaction Details"
      class="w-full sm:w-1/2"
    >
      <div v-if="selectedTx" class="space-y-3 text-gray-700">
        <p><strong>Date:</strong> {{ selectedTx.date }}</p>
        <p><strong>Type:</strong> {{ selectedTx.type }}</p>
        <p><strong>Amount:</strong> {{ selectedTx.amount }}</p>
        <p><strong>Status:</strong> {{ selectedTx.status }}</p>
        <p><strong>Transaction ID:</strong> {{ selectedTx.id }}</p>
        <p><strong>Details:</strong> {{ selectedTx.details }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Card from "primevue/card"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import Calendar from "primevue/calendar"

// --- Data
const transactions = ref([
  {
    date: "2025-09-01",
    type: "Cashout",
    amount: "$250",
    status: "Completed",
    id: "VX-CASHOUT-928374",
    details: "Withdrawal processed to your USDT wallet (TRC20).",
  },
  {
    date: "2025-08-15",
    type: "Top-Up",
    amount: "$500",
    status: "Completed",
    id: "VX-TOPUP-412398",
    details: "Funds added via TRC20 network.",
  },
  {
    date: "2025-08-01",
    type: "Profit Payout",
    amount: "$120",
    status: "Completed",
    id: "VX-PROFIT-219837",
    details: "Monthly profit added to Profits Wallet.",
  },
  {
    date: "2025-07-20",
    type: "Cashout",
    amount: "$300",
    status: "Pending",
    id: "VX-CASHOUT-871234",
    details: "Awaiting blockchain confirmation.",
  },
  {
    date: "2025-07-01",
    type: "Profit Payout",
    amount: "$100",
    status: "Completed",
    id: "VX-PROFIT-128765",
    details: "Profit credited successfully.",
  },
  {
    date: "2025-06-15",
    type: "Top-Up",
    amount: "$400",
    status: "Failed",
    id: "VX-TOPUP-534221",
    details: "Payment failed due to network timeout.",
  },
])

// --- Filters & Search
const search = ref("")
const selectedType = ref(null)
const selectedStatus = ref(null)
const dateFrom = ref(null)
const dateTo = ref(null)

const typeOptions = [
  { label: "Cashout", value: "Cashout" },
  { label: "Top-Up", value: "Top-Up" },
  { label: "Profit Payout", value: "Profit Payout" },
]

const statusOptions = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
]

// --- Filtering Logic
const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    const matchesSearch =
      !search.value ||
      tx.type.toLowerCase().includes(search.value.toLowerCase()) ||
      tx.amount.toLowerCase().includes(search.value.toLowerCase())

    const matchesType = !selectedType.value || tx.type === selectedType.value
    const matchesStatus =
      !selectedStatus.value || tx.status === selectedStatus.value

    const txDate = new Date(tx.date)
    const matchesDate =
      (!dateFrom.value || txDate >= new Date(dateFrom.value)) &&
      (!dateTo.value || txDate <= new Date(dateTo.value))

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })
})

// --- UI Helpers
const typeIcon = (type) => {
  switch (type) {
    case "Cashout":
      return "mdi mdi-wallet-outline text-green-600"
    case "Top-Up":
      return "mdi mdi-arrow-up-bold-circle-outline text-blue-500"
    case "Profit Payout":
      return "mdi mdi-chart-line text-purple-500"
    default:
      return "mdi mdi-cash"
  }
}

const statusClass = (status) => {
  return {
    "bg-green-100 text-green-700": status === "Completed",
    "bg-yellow-100 text-yellow-700": status === "Pending",
    "bg-red-100 text-red-700": status === "Failed",
  }
}

// --- Modal Logic
const visible = ref(false)
const selectedTx = ref(null)

const showDetails = (tx) => {
  selectedTx.value = tx
  visible.value = true
}
</script>

<style lang="scss" scoped>
.history-page {
  background-color: #f9fbfc;
}
</style>
