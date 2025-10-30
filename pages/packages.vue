<template>
  <section
    class="forten-bundles py-20 px-4 sm:px-10 bg-[#0a1325] text-gray-100"
  >
    <div class="max-w-7xl mx-auto text-center">
      <!-- Header -->
      <div class="mb-14">
        <h2 class="text-4xl sm:text-5xl font-bold text-[#00c6ae] mb-3">
          Forten Investment Plans
        </h2>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose your plan, earn daily profit, and grow your capital
          automatically with compound interest.
        </p>
      </div>

      <!-- Bundles Grid -->
      <div v-if="loading" class="text-center text-gray-400 py-20">
        <i class="pi pi-spin pi-spinner text-3xl"></i>
        <p class="mt-2">Loading plans...</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      >
        <div
          v-for="(item, index) in bundles"
          :key="index"
          class="bundle-card relative bg-[#101e42] rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-700 w-full sm:w-96"
        >
          <!-- Header -->
          <div
            class="bg-gradient-to-r from-[#00c6ae] to-[#f4b000] text-[#0a1325] text-center py-5"
          >
            <h3 class="text-2xl font-extrabold uppercase">{{ item.name }}</h3>
            <p class="text-sm font-semibold">
              Daily Return: {{ item.dailyRate }}%
            </p>
          </div>

          <!-- Body -->
          <div class="p-6 text-left space-y-4">
            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Invest Range:</span>
              <span class="text-[#00c6ae] font-bold">{{ item.range }}</span>
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Duration:</span>
              <span class="text-[#f4b000] font-semibold"
                >{{ item.durationDays }} days</span
              >
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-300"
                >Referral Requirement:</span
              >
              <span class="text-[#f4b000] font-semibold">{{
                item.referralRequirement
              }}</span>
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-300">Upgrade Rate:</span>
              <span class="text-[#00c6ae] font-bold">{{
                item.upgradeRate || "-"
              }}%</span>
            </p>

            <p class="text-sm text-gray-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Footer -->
          <div
            class="p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between gap-3"
          >
            <Button
              label="Details"
              icon="mdi mdi-information-outline"
              class="p-button-sm p-button-outlined w-full"
              @click="openDetails(item)"
            />
            <Button
              label="Invest Now"
              icon="mdi mdi-wallet-plus-outline"
              class="p-button-sm forten-btn w-full"
              @click="openInvest(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Bundle Details Modal ===== -->
    <Dialog
      v-model:visible="visibleDetails"
      modal
      :header="selectedBundle?.name + ' Plan Details'"
      :style="{ width: '90%', maxWidth: '600px' }"
    >
      <div v-if="selectedBundle" class="space-y-3 text-gray-700">
        <p>
          <strong>Invest Range:</strong> {{ selectedBundle.range }}
        </p>
        <p>
          <strong>Base Daily Return:</strong> {{ selectedBundle.dailyRate }}%
        </p>
        <p>
          <strong>Referral Requirement:</strong>
          {{ selectedBundle.referralRequirement }}
        </p>
        <p class="pt-2 text-sm text-gray-500 border-t">
          {{ selectedBundle.description }}
        </p>
      </div>

      <template #footer>
        <Button
          label="Close"
          icon="mdi mdi-close"
          class="p-button-text"
          @click="visibleDetails = false"
        />
        <Button
          label="Invest Now"
          icon="mdi mdi-wallet-plus-outline"
          class="forten-btn"
          @click="openInvest(selectedBundle)"
        />
      </template>
    </Dialog>

    <!-- ===== Invest Modal ===== -->
    <Dialog
      v-model:visible="visibleInvest"
      modal
      :header="'Invest in ' + (selectedBundle?.name || '')"
      :style="{ width: '90%', maxWidth: '520px' }"
    >
      <div v-if="selectedBundle" class="space-y-5">
        <p class="text-gray-700">
          You are investing in the
          <strong>{{ selectedBundle.name }}</strong> plan.
        </p>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-100 text-red-700 border border-red-300 p-3 rounded-md text-sm"
        >
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1"
            >Amount (USD)</label
          >
          <InputNumber
            v-model="investAmount"
            mode="currency"
            currency="USD"
            locale="en-US"
            class="w-full"
            placeholder="Enter amount"
          />
        </div>

   

        
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="mdi mdi-close"
          class="p-button-text"
          @click="visibleInvest = false"
        />
        <Button
          label="Confirm Investment"
          icon="mdi mdi-check-circle"
          class="forten-btn"
          :loading="loadingInvest"
          @click="confirmInvestment"
        />
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const { authUser } = useAuth();
const visibleDetails = ref(false);
const visibleInvest = ref(false);
const selectedBundle = ref(null);
const investAmount = ref(null);
const userWallet = ref("");
const transactionId = ref("");
const bundles = ref([]);
const loading = ref(true);
const loadingInvest = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  try {
    const data = await $fetch(`api/packages`);
    bundles.value = data;
  } catch (err) {
    console.error("❌ Failed to fetch plans:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load plans.",
      life: 3000,
    });
  } finally {
    loading.value = false;
  }

  if (authUser.value) {
    userWallet.value = authUser.value.walletAddress || "Not set";
  } else {
    userWallet.value = "Please login first";
  }
});

function openDetails(item) {
  selectedBundle.value = item;
  visibleDetails.value = true;
}

function openInvest(item) {
  if (!authUser.value) {
    toast.add({
      severity: "warn",
      summary: "Login Required",
      detail: "Please login to invest.",
      life: 3000,
    });
    return navigateTo("/auth");
  }
  selectedBundle.value = item;
  visibleDetails.value = false;
  visibleInvest.value = true;
  errorMessage.value = "";
}

async function confirmInvestment() {
  errorMessage.value = "";

  if (!investAmount.value) {
    errorMessage.value = "Please enter an investment amount.";
    return;
  }

  const min = selectedBundle.value.minDeposit;
  const max = selectedBundle.value.maxDeposit;

  if (investAmount.value < min) {
    errorMessage.value = `Minimum investment for this plan is $${min}.`;
    return;
  }

  if (investAmount.value > max) {
    errorMessage.value = `Maximum investment for this plan is $${max}.`;
    return;
  }

  try {
    loadingInvest.value = true;

    const res = await $fetch(`api/investments`, {
      method: "POST",
      body: {
        amount: investAmount.value,
        userId: authUser.value.user.id,
      },
    });

    toast.add({
      severity: "success",
      summary: "Investment Successful",
      detail: `Plan: ${selectedBundle.value.name} | $${investAmount.value}`,
      life: 5000,
    });
    visibleInvest.value = false;
  } catch (error) {
    console.error("Investment Error:", error);
    const msg =
      error?.data?.message ||
      error?.response?._data?.message ||
      "Something went wrong.";

    if (msg.includes("Insufficient balance")) {
      errorMessage.value = "Your main balance is not enough for this investment.";
    } else {
      errorMessage.value = msg;
    }
  } finally {
    loadingInvest.value = false;
  }
}
</script>

<style scoped>
.forten-btn {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
  border: none !important;
  color: #0a1325 !important;
  font-weight: 600;
  transition: all 0.3s ease;
}
.forten-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
</style>
