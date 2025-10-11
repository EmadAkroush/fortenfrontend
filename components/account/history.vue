<template>
  <div class="forten-history p-2 sm:p-10 space-y-4">
    <!-- ===== Header ===== -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-2xl font-bold text-emerald-300 mb-4 sm:mb-0">
        Transaction History
      </h2>

      <div class="flex flex-wrap gap-3 items-center">
        <!-- Search -->
        <span class="p-input-icon-left glass-input">
          <i class="mdi mdi-magnify text-emerald-300"></i>
          <InputText
            v-model="search"
            placeholder="Search by type or amount"
            class="w-56 bg-transparent border-none text-sm text-emerald-50 placeholder-gray-400"
          />
        </span>

        <!-- Filter Type -->
        <Dropdown
          v-model="selectedType"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Types"
          class="glass-input w-40"
        />

        <!-- Filter Status -->
        <Dropdown
          v-model="selectedStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Status"
          class="glass-input w-40"
        />

        <!-- Date Filters -->
        <div class="flex gap-2 items-center">
          <Calendar
            v-model="dateFrom"
            placeholder="From"
            showIcon
            class="glass-input w-32"
          />
          <Calendar
            v-model="dateTo"
            placeholder="To"
            showIcon
            class="glass-input w-32"
          />
        </div>
      </div>
    </div>

    <!-- ===== Table ===== -->
    <Card class="glass-card shadow-lg forten-table p-0 sm:p-0">
      <template #content>
        <DataTable
          :value="filteredTransactions"
          paginator
          :rows="6"
          responsiveLayout="scroll"
          class="text-sm"
        >
          <Column header="Date" field="date" sortable></Column>

          <Column header="Type" field="type" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <i :class="typeIcon(slotProps.data.type)" class="text-lg"></i>
                <span>{{ slotProps.data.type }}</span>
              </div>
            </template>
          </Column>

          <Column header="Amount" field="amount" sortable>
            <template #body="slotProps">
              <span class="font-semibold text-emerald-200">
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
              <span class="font-mono text-gray-400 text-xs">{{
                slotProps.data.id
              }}</span>
            </template>
          </Column>

          <Column header="Action">
            <template #body="slotProps">
              <Button
                icon="mdi mdi-eye-outline"
                class="p-button-rounded p-button-text text-emerald-300 hover:text-emerald-400"
                @click="showDetails(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- ===== Modal ===== -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Transaction Details"
      class="w-full sm:w-1/2"
    >
      <div v-if="selectedTx" class="space-y-3 text-gray-300">
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

const transactions = ref([
  { date: "2025-09-01", type: "Cashout", amount: "$250", status: "Completed", id: "VX-CASHOUT-928374", details: "Withdrawal processed to your USDT wallet (TRC20)." },
  { date: "2025-08-15", type: "Top-Up", amount: "$500", status: "Completed", id: "VX-TOPUP-412398", details: "Funds added via TRC20 network." },
  { date: "2025-08-01", type: "Profit Payout", amount: "$120", status: "Completed", id: "VX-PROFIT-219837", details: "Monthly profit added to Profits Wallet." },
  { date: "2025-07-20", type: "Cashout", amount: "$300", status: "Pending", id: "VX-CASHOUT-871234", details: "Awaiting blockchain confirmation." },
  { date: "2025-07-01", type: "Profit Payout", amount: "$100", status: "Completed", id: "VX-PROFIT-128765", details: "Profit credited successfully." },
  { date: "2025-06-15", type: "Top-Up", amount: "$400", status: "Failed", id: "VX-TOPUP-534221", details: "Payment failed due to network timeout." },
])

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

const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    const matchesSearch =
      !search.value ||
      tx.type.toLowerCase().includes(search.value.toLowerCase()) ||
      tx.amount.toLowerCase().includes(search.value.toLowerCase())

    const matchesType = !selectedType.value || tx.type === selectedType.value
    const matchesStatus = !selectedStatus.value || tx.status === selectedStatus.value

    const txDate = new Date(tx.date)
    const matchesDate =
      (!dateFrom.value || txDate >= new Date(dateFrom.value)) &&
      (!dateTo.value || txDate <= new Date(dateTo.value))

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })
})

const typeIcon = (type) => {
  switch (type) {
    case "Cashout": return "mdi mdi-wallet-outline text-emerald-400"
    case "Top-Up": return "mdi mdi-arrow-up-bold-circle-outline text-cyan-400"
    case "Profit Payout": return "mdi mdi-chart-line text-amber-400"
    default: return "mdi mdi-cash text-gray-400"
  }
}

const statusClass = (status) => ({
  "bg-emerald-900/30 text-emerald-300": status === "Completed",
  "bg-yellow-900/30 text-yellow-300": status === "Pending",
  "bg-red-900/30 text-red-300": status === "Failed",
})

const visible = ref(false)
const selectedTx = ref(null)
const showDetails = (tx) => {
  selectedTx.value = tx
  visible.value = true
}
</script>

<style scoped lang="scss">

.forten-history {
  background: radial-gradient(circle at top left, #021312, #01060a);
  font-family: "Inter", sans-serif;
  color: #e6fef5;

}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(12px);
}

.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e6fef5;
  border-radius: 10px;
  height: 40px;
  font-size: 0.85rem;
}

/* === Table Header === */
.forten-table ::v-deep(.p-datatable-thead > tr > th) {
  background: rgba(255, 255, 255, 0.05);
  color: #b3f6e5;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

}

/* === Table Rows === */
.forten-table ::v-deep(.p-datatable-tbody > tr) {
  background: transparent;
  transition: all 0.25s ease;
}

.forten-table ::v-deep(.p-datatable-tbody > tr:nth-child(odd)) {
  background: rgba(16, 185, 129, 0.05);
}

.forten-table ::v-deep(.p-datatable-tbody > tr:nth-child(even)) {
  background: rgba(6, 182, 212, 0.04);
}

.forten-table ::v-deep(.p-datatable-tbody > tr:hover) {
  background: rgba(16, 185, 129, 0.15);
  transform: scale(1.002);
}

/* Pagination */
.forten-table ::v-deep(.p-paginator) {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
