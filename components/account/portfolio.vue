<template>
  <div class="finalxcard-portfolio p-3 sm:p-8">
    <!-- ===== Header ===== -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-300">
          My Invest
        </h1>
        <p class="text-sm text-gray-300 mt-1">
          Track your investments, profit growth, and package progress in real
          time.
        </p>
      </div>
  
    </div>

    <!-- ===== Overview Cards ===== -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">


      <div class="summary-card">
        <i class="mdi mdi-cash-multiple summary-icon text-cyan-400"></i>
        <div>
          <p class="summary-label">Current Profit</p>
          <h3 class="summary-value">${{ formatNumber(currentProfit) }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Active Investment Card ===== -->
    <div
      v-if="activePack"
      class="pack-card p-5 mx-auto max-w-xl mb-10"
    >
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-bold text-emerald-300">
          {{ activePack.package.name }}
        </h3>
        <span
          class="px-2 py-0.5 text-xs rounded border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
        >
          {{ activePack.status }}
        </span>
      </div>

      <div class="text-sm text-gray-300 space-y-1 mb-3">
        <div>
          Investment:
          <span class="font-semibold text-gray-100"
            >${{ formatNumber(activePack.amount) }}</span
          >
        </div>
        <div>
          Daily Rate:
          <span class="text-emerald-300">{{ activePack.dailyRate }}%</span>
        </div>
        <div>
          Total Profit:
          <span class="text-emerald-300 font-semibold"
            >${{ formatNumber(activePack.totalProfit) }}</span
          >
        </div>
      </div>

      <!-- Profit Info -->
      <div class="glass-subcard mb-3">
        <div class="flex justify-between text-sm">
          <span>Withdrawn</span>
          <span class="text-gray-400"
            >${{ formatNumber(activePack.withdrawn || 0) }}</span
          >
        </div>
        <div class="flex justify-between text-sm">
          <span>Available</span>
          <span class="text-emerald-200 font-semibold"
            >${{ formatNumber(activePack.totalProfit - (activePack.withdrawn || 0)) }}</span
          >
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <!-- <Button
          class="p-button-success compact-btn"
          icon="mdi mdi-swap-horizontal-bold"
          label="Transfer Profit"
          :loading="loadingAction"
          @click="transferProfit"
        /> -->
        <Button
          class="p-button-warning compact-btn"
          icon="mdi mdi-arrow-up-bold"
          label="Upgrade"
          @click="openUpgradeDialog"
        />
        <Button
          class="p-button-danger compact-btn"
          icon="mdi mdi-cancel"
          label="Cancel"
          @click="openCancelDialog"
        />
      </div>
    </div>

    <p
      v-else
      class="text-gray-400 text-center py-10"
    >
      No active investment found.
    </p>

    <!-- ===== Cancel Dialog ===== -->
    <Dialog
      v-model:visible="showCancelDialog"
      modal
      header="Cancel Investment"
      :style="{ width: '90%', maxWidth: '420px' }"
    >
      <p class="text-gray-300 mb-4">
        Are you sure you want to cancel your
        <span class="text-emerald-300 font-semibold">{{
          activePack?.package?.name
        }}</span>
        package?
      </p>
      <p class="text-gray-400 text-sm mb-6">
        The invested amount will be returned to your main balance.
      </p>
      <template #footer>
        <div class="flex justify-between w-full">
          <Button
            label="Close"
            class="p-button-text"
            @click="showCancelDialog = false"
          />
          <Button
            label="Confirm Cancel"
            class="p-button-danger"
            :loading="loadingAction"
            @click="confirmCancel"
          />
        </div>
      </template>
    </Dialog>

    <!-- ===== Upgrade Dialog ===== -->
    <Dialog
      v-model:visible="showUpgradeDialog"
      modal
      header="Upgrade Investment"
      :style="{ width: '90%', maxWidth: '450px' }"
    >
      <div class="text-gray-300 space-y-3">
        <p>
          You are upgrading
          <span class="text-emerald-300 font-semibold">{{
            activePack?.package?.name
          }}</span>
          to a higher plan.
        </p>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Next Plan</label>
      
        </div>

        <div>
          <label class="text-sm text-gray-400 mb-1 block"
            >Additional Amount (USD)</label
          >
          <input
            v-model.number="additionalAmount"
            type="number"
            min="10"
            class="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2"
            placeholder="Enter amount"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button
            label="Close"
            class="p-button-text"
            @click="showUpgradeDialog = false"
          />
          <Button
            label="Confirm Upgrade"
            class="p-button-success"
            :loading="loadingAction"
            @click="confirmUpgrade"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { authUser } = useAuth();

const activePack = ref(null);
const expectedReturns = ref(0);
const currentProfit = ref(0);
const upgradeOptions = ref([]);
const selectedNextPack = ref("");
const additionalAmount = ref(0);
const loadingAction = ref(false);

const showCancelDialog = ref(false);
const showUpgradeDialog = ref(false);

/* ---------------- Fetch Active Investment ---------------- */
onMounted(async () => {
  try {
    // 🟢 ارسال درخواست POST با userId در body
    const res = await $fetch("/api/investments/my", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
      },
    });

    if (res && res.length > 0) {
      activePack.value = res[0];
      currentProfit.value = activePack.value.totalProfit;
      expectedReturns.value =
        activePack.value.amount * (activePack.value.dailyRate / 100) * 30;
    }

    // 🟢 دریافت لیست پلن‌ها
    const plans = await $fetch("/api/packages");
    upgradeOptions.value = plans;
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch investment data",
      life: 3000,
    });
  }
});


/* ---------------- Transfer Profit ---------------- */
// async function transferProfit() {
//   try {
//     loadingAction.value = true;
//     await $fetch("/api/investments/transfer-profit", {
//       method: "POST",
//       body: { userId: authUser.value.user.id },
//     });
//     toast.add({
//       severity: "success",
//       summary: "Profit Transferred",
//       detail: "Your profit has been added to main balance.",
//       life: 3000,
//     });
//   } catch (error) {
//     toast.add({
//       severity: "error",
//       summary: "Error",
//       detail: error?.data?.message || "Failed to transfer profit.",
//       life: 3000,
//     });
//   } finally {
//     loadingAction.value = false;
//   }
// }

/* ---------------- Cancel Investment ---------------- */
async function confirmCancel() {
  try {
    loadingAction.value = true;
    await $fetch("/api/investments/cancel", {
      method: "POST",
      body: {  investmentId: activePack.value._id },
    });
    toast.add({
      severity: "warn",
      summary: "Investment Cancelled",
      detail: "Funds returned to main balance.",
      life: 3000,
    });
    showCancelDialog.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error?.data?.message || "Failed to cancel investment.",
      life: 3000,
    });
  } finally {
    loadingAction.value = false;
  }
}

/* ---------------- Upgrade Investment ---------------- */
async function confirmUpgrade() {

  try {
    loadingAction.value = true;
    await $fetch("/api/investments", {
      method: "POST",
      body: {
        amount: additionalAmount.value,
        userId: authUser.value.user.id,
      },
    });
    toast.add({
      severity: "success",
      summary: "Investment Upgraded",
      detail: "Your plan has been successfully upgraded.",
      life: 3000,
    });
    showUpgradeDialog.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error?.data?.message || "Failed to upgrade plan.",
      life: 3000,
    });
  } finally {
    loadingAction.value = false;
  }
}

/* ---------------- Utility ---------------- */
function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function openCancelDialog() {
  showCancelDialog.value = true;
}
function openUpgradeDialog() {
  showUpgradeDialog.value = true;
}
</script>

<style scoped lang="scss">
.finalxcard-portfolio {
  color: #e6eef0;
  font-family: "Inter", sans-serif;
  .summary-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 255, 190, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  .pack-card {
    border: 1px solid rgba(0, 255, 190, 0.3);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
  }
  .glass-subcard {
    border-radius: 10px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
  }
  .p-button-warning {
    background: linear-gradient(90deg, #f4b000, #facc15) !important;
    color: #0a1325 !important;
    border: none !important;
  }
  .p-button-danger {
    background-color: #ef4444 !important;
    border: none !important;
  }
  .compact-btn {
    padding: 0.4rem 0.7rem !important;
    font-size: 0.8rem !important;
  }
}
</style>
