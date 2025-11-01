<template>
  <div class="finalxcard-history p-2 sm:p-10 space-y-4">
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
    <Card class="glass-card shadow-lg finalxcard-table p-0 sm:p-0">
      <template #content>
        <DataTable
          :value="filteredTransactions"
          paginator
          :rows="6"
          responsiveLayout="scroll"
          class="text-sm"
          :loading="loading"
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
                ${{ slotProps.data.amount }}
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

          <Column header="Transaction ID" field="_id">
            <template #body="slotProps">
              <span class="font-mono text-gray-400 text-xs">
                {{ slotProps.data._id }}
              </span>
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
        <p><strong>Amount:</strong> ${{ selectedTx.amount }}</p>
        <p><strong>Status:</strong> {{ selectedTx.status }}</p>
        <p><strong>Transaction ID:</strong> {{ selectedTx._id }}</p>
        <p><strong>Details:</strong> {{ selectedTx.note || "—" }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import Card from "primevue/card"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import Calendar from "primevue/calendar"
import { useAuth } from "@/composables/useAuth"
import { useToast } from "primevue/usetoast"

const { authUser } = useAuth()
const toast = useToast()

const transactions = ref([])
const loading = ref(false)

const search = ref("")
const selectedType = ref(null)
const selectedStatus = ref(null)
const dateFrom = ref(null)
const dateTo = ref(null)

const typeOptions = [
  { label: "Cashout", value: "withdraw" },
  { label: "Top-Up", value: "deposit" },
  { label: "Profit Payout", value: "profit" },
]

const statusOptions = [
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
]

// 🟢 دریافت تراکنش‌ها از بک‌اند
onMounted(async () => {
  try {
    loading.value = true
    const userId = authUser.value?.user?.id
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Login Required",
        detail: "Please login to view transactions.",
        life: 3000,
      })
      return
    }

    const data = await $fetch("/api/transactions/my", {
      method: "POST",
      body: { userId },
    })

    transactions.value = data.map((tx) => ({
      ...tx,
      date: new Date(tx.createdAt).toLocaleDateString(),
    }))
  } catch (err) {
    console.error("❌ Failed to fetch transactions:", err)
    toast.add({
      severity: "error",
      summary: "Error",
      detail: err?.data?.message || "Failed to load transactions.",
      life: 4000,
    })
  } finally {
    loading.value = false
  }
})

// 🧠 فیلتر محلی
const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    const matchesSearch =
      !search.value ||
      tx.type?.toLowerCase().includes(search.value.toLowerCase()) ||
      tx.amount?.toString().includes(search.value)

    const matchesType = !selectedType.value || tx.type === selectedType.value
    const matchesStatus = !selectedStatus.value || tx.status === selectedStatus.value

    const txDate = new Date(tx.date)
    const matchesDate =
      (!dateFrom.value || txDate >= new Date(dateFrom.value)) &&
      (!dateTo.value || txDate <= new Date(dateTo.value))

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })
})

// آیکون نوع تراکنش
const typeIcon = (type) => {
  switch (type) {
    case "withdraw":
      return "mdi mdi-wallet-outline text-emerald-400"
    case "deposit":
      return "mdi mdi-arrow-up-bold-circle-outline text-cyan-400"
    case "profit":
      return "mdi mdi-chart-line text-amber-400"
    default:
      return "mdi mdi-cash text-gray-400"
  }
}

const statusClass = (status) => ({
  "bg-emerald-900/30 text-emerald-300": status === "completed",
  "bg-yellow-900/30 text-yellow-300": status === "pending",
  "bg-red-900/30 text-red-300": status === "failed",
})

const visible = ref(false)
const selectedTx = ref(null)
const showDetails = (tx) => {
  selectedTx.value = tx
  visible.value = true
}
</script>

<style scoped lang="scss">
.finalxcard-history {
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
.finalxcard-table ::v-deep(.p-datatable-thead > tr > th) {
  background: rgba(255, 255, 255, 0.05);
  color: #b3f6e5;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* === Table Rows === */
.finalxcard-table ::v-deep(.p-datatable-tbody > tr) {
  background: transparent;
  transition: all 0.25s ease;
}

.finalxcard-table ::v-deep(.p-datatable-tbody > tr:nth-child(odd)) {
  background: rgba(16, 185, 129, 0.05);
}

.finalxcard-table ::v-deep(.p-datatable-tbody > tr:nth-child(even)) {
  background: rgba(6, 182, 212, 0.04);
}

.finalxcard-table ::v-deep(.p-datatable-tbody > tr:hover) {
  background: rgba(16, 185, 129, 0.15);
  transform: scale(1.002);
}

/* Pagination */
.finalxcard-table ::v-deep(.p-paginator) {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
