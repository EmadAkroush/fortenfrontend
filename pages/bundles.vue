<template>
  <section class="bundles-section bg-gray-50 py-16 px-4 sm:px-12">
    <div class="max-w-7xl mx-auto text-center">
      <!-- Header -->
      <div class="mb-10">
        <h2 class="text-4xl font-bold text-green-700 mb-3">Investment Bundles</h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose your investment plan and start earning passive income through Vestavex's secure platform.
        </p>
      </div>

      <!-- Bundles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div
          v-for="(item, index) in bundlesItems"
          :key="index"
          class="bundle-card relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 w-full sm:w-96"
        >
          <!-- Header -->
          <div class="bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-4">
            <h3 class="text-2xl font-bold uppercase">{{ item.title }}</h3>
            <p class="text-sm tracking-wide">Monthly Return: {{ item.earn }}</p>
          </div>

          <!-- Body -->
          <div class="p-6 text-left">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-700 font-semibold">Invest Range:</span>
              <span class="text-green-700 font-bold">{{ item.investedDown }} – {{ item.investedUp }}</span>
            </div>

            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-700 font-semibold">Min Withdrawal:</span>
              <span class="text-green-700 font-bold">{{ item.minimumwithdrawal }}</span>
            </div>

            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-700 font-semibold">Max Cap:</span>
              <span class="text-green-700 font-bold">{{ item.maxcap }}%</span>
            </div>

            <div class="mt-4">
              <ProgressBar :value="normalize(item.maxcap)">{{ item.maxcap }}%</ProgressBar>
            </div>
          </div>

          <!-- Footer / Actions -->
          <div class="flex flex-col sm:flex-row justify-between gap-3 p-4 border-t border-gray-200">
            <Button
              label="Details"
              icon="mdi mdi-information-outline"
              class="p-button-sm p-button-outlined w-full"
              @click="openDialog(item)"
            />
            <Button
              label="Invest Now"
              icon="mdi mdi-wallet-plus-outline"
              class="p-button-sm p-button-success w-full"
              @click="openInvestDialog(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bundle Details Modal -->
    <Dialog
      v-model:visible="visibleDetails"
      modal
      :header="selectedBundle?.title + ' Bundle Details'"
      :style="{ width: '90%', maxWidth: '600px' }"
    >
      <div v-if="selectedBundle" class="space-y-4">
        <div class="flex items-center gap-2">
          <i class="mdi mdi-wallet-outline text-green-600 text-2xl"></i>
          <p class="text-gray-700">
            <span class="font-semibold">Invest Range:</span> {{ selectedBundle.investedDown }} - {{ selectedBundle.investedUp }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <i class="mdi mdi-bank-transfer text-green-600 text-2xl"></i>
          <p class="text-gray-700">
            <span class="font-semibold">Min Withdrawal:</span> {{ selectedBundle.minimumwithdrawal }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <i class="mdi mdi-chart-line text-green-600 text-2xl"></i>
          <p class="text-gray-700">
            <span class="font-semibold">Monthly Return:</span> {{ selectedBundle.earn }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <i class="mdi mdi-chart-donut text-green-600 text-2xl"></i>
          <p class="text-gray-700">
            <span class="font-semibold">Max Cap:</span> {{ selectedBundle.maxcap }}%
          </p>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <p class="text-sm text-gray-600 leading-relaxed">
            The {{ selectedBundle.title }} plan is designed for investors seeking stable returns with
            transparent growth under the VX Plan system.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="Close" icon="mdi mdi-close" class="p-button-text" @click="visibleDetails = false" />
          <Button
            label="Invest Now"
            icon="mdi mdi-wallet-plus-outline"
            class="p-button-success"
            @click="openInvestDialog(selectedBundle)"
          />
        </div>
      </template>
    </Dialog>

    <!-- Invest Modal -->
    <Dialog
      v-model:visible="visibleInvest"
      modal
      :header="'Invest in ' + (selectedBundle?.title || '')"
      :style="{ width: '90%', maxWidth: '500px' }"
    >
      <div v-if="selectedBundle">
        <p class="text-gray-700 mb-4">
          You are about to invest in the <strong>{{ selectedBundle.title }}</strong> plan.
        </p>

        <!-- Investment Form -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1">Amount (USD)</label>
            <InputNumber
              v-model="investAmount"
              inputId="amount"
              mode="currency"
              currency="USD"
              locale="en-US"
              class="w-full"
              :min="50"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1">Payment Method</label>
            <Dropdown
              v-model="selectedPayment"
              :options="paymentMethods"
              optionLabel="label"
              optionValue="value"
              placeholder="Select payment method"
              class="w-full"
            />
          </div>

          <div>
            <p class="text-sm text-gray-500">
              <i class="mdi mdi-shield-check text-green-600"></i> Your transaction is protected with 256-bit SSL encryption.
            </p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="Cancel" icon="mdi mdi-close" class="p-button-text" @click="visibleInvest = false" />
          <Button label="Confirm Investment" icon="mdi mdi-check-circle" class="p-button-success" @click="confirmInvestment" />
        </div>
      </template>
    </Dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      visibleDetails: false,
      visibleInvest: false,
      selectedBundle: null,
      investAmount: null,
      selectedPayment: null,
      paymentMethods: [
        { label: "Crypto (USDT, BTC, ETH)", value: "crypto" },
        { label: "Credit/Debit Card", value: "card" },
        { label: "Bank Transfer", value: "bank" },
      ],
      bundlesItems: [
        {
          title: "Bronze",
          minimumwithdrawal: "$50",
          investedDown: "$50",
          investedUp: "$249",
          earn: "3% per month",
          maxcap: 300,
        },
        {
          title: "Silver",
          minimumwithdrawal: "$50",
          investedDown: "$250",
          investedUp: "$499",
          earn: "4% per month",
          maxcap: 340,
        },
        {
          title: "Gold",
          minimumwithdrawal: "$50",
          investedDown: "$500",
          investedUp: "$999",
          earn: "5% per month",
          maxcap: 380,
        },
        {
          title: "Platinum",
          minimumwithdrawal: "$50",
          investedDown: "$1,000",
          investedUp: "$2,499",
          earn: "6% per month",
          maxcap: 420,
        },
        {
          title: "Diamond",
          minimumwithdrawal: "$50",
          investedDown: "$2,500",
          investedUp: "$4,999",
          earn: "7% per month",
          maxcap: 460,
        },
        {
          title: "Titanium",
          minimumwithdrawal: "$50",
          investedDown: "$5,000",
          investedUp: "and more",
          earn: "8% per month",
          maxcap: 500,
        },
      ],
    };
  },
  methods: {
    normalize(value) {
      return Math.min(100, value / 5);
    },
    openDialog(item) {
      this.selectedBundle = item;
      this.visibleDetails = true;
    },
    openInvestDialog(item) {
      this.selectedBundle = item;
      this.visibleDetails = false;
      this.visibleInvest = true;
    },
    confirmInvestment() {
      if (!this.investAmount || !this.selectedPayment) {
        alert("Please enter an amount and select a payment method.");
        return;
      }
      alert(
        `✅ Investment confirmed:\nBundle: ${this.selectedBundle.title}\nAmount: $${this.investAmount}\nMethod: ${this.selectedPayment}`
      );
      this.visibleInvest = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.bundles-section {
  background: linear-gradient(180deg, #f9fafb 0%, #eef1fb 100%);
  h2 {
    color: #0b6d20;
  }

  .p-dialog .p-dialog-header {
    background-color: #0b6d20 !important;
    color: white;
  }

  .bundle-card {
    .p-progressbar {
      background-color: #e5e7eb;
      .p-progressbar-value {
        background-color: #0b6d20 !important;
      }
    }
  }

  .p-dialog-content {
    padding: 1.5rem;
  }
}
@media (max-width: 650px) {
  .bundles-section {
    .bundle-card {
      width: 100%;
    }
  }
}
</style>
