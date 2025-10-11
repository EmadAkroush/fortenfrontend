<template>
  <ClientOnly>
    <div
      class="flex justify-center items-center bg-gray-100 p-4 cardsop"
      style="height: 600px"
      
    >
  
      <Card class="w-full   shadow-lg cardin" >
        <template #content>
          <div class="flex flex-col items-center justify-center h-full p-6 insidede" >
            <div class="text-center mb-6">
            <template v-if="payment?.Status == 0">
              <i class="pi pi-check-circle text-green-500 text-5xl"></i>
              <h5 class="mt-3 text-green-500 text-lg font-semibold">پرداخت شما با موفقیت انجام شد</h5>
              <!-- <h6 class="mt-2 text-gray-700">شماره پیگیری: <span class="font-bold">{{ payment?.PaidAt }}</span></h6> -->
            </template>
            <template v-else>
              <i class="pi pi-times-circle text-red-500 text-5xl"></i>
              <h5 class="mt-3 text-red-500 text-lg font-semibold">پرداخت با موفقیت انجام نشد</h5>
            </template>
          </div>
            <div
              class="flex justify-center items-center   md:p-4" 
            >
              <div class="bg-white shadow-lg rounded-2xl p-8  w-full" style="border: 1px solid ;">
                <h1 class="text-2xl font-bold text-red-800 mb-4">
                  با سلام و احترام،
                </h1>
                <p class="text-gray-700 leading-relaxed mb-4 ">
                  از خرید شما سپاسگزاریم! ما همواره در تلاشیم تا بهترین خدمات را
                  به شما ارائه دهیم.
                </p>
                <p class="text-gray-700 leading-relaxed mb-4">
                  به اطلاع شما می‌رسانیم که در هنگام تحویل سفارش توسط مامور
                  تیپاکس، لطفاً نکات زیر را مورد توجه قرار دهید:
                </p>
                <ul
                  class="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4"
                >
                  <li>
                    <span class="font-semibold">بررسی سفارش:</span> حتماً در
                    حضور مامور تیپاکس یا در دفتر نمایندگی تیپاکس، سفارش خود را
                    به دقت بررسی کنید.
                  </li>
                  <li>
                    <span class="font-semibold">گزارش مغایرت یا آسیب:</span> در
                    صورتی که هرگونه مغایرت، آسیب دیدگی یا کسری در محصول مشاهده
                    کردید، فوراً این موارد را به مامور تیپاکس اعلام کنید و
                    صورتجلسه‌ای در این خصوص تنظیم نمایید.
                  </li>
                  <li>
                    <span class="font-semibold">عدم مسئولیت حامل:</span> توجه
                    داشته باشید که در صورت عدم بررسی و عدم ثبت مغایرت‌ها، هیچ
                    گونه خسارتی شامل حامل نمی‌شود و مسئولیتی در این زمینه متوجه
                    ما نخواهد بود.
                  </li>
                </ul>
                <p class="text-gray-700 leading-relaxed mb-6 ">
                  با آرزوی خریدی موفق و تجربه‌ای خوشایند برای شما.
                </p>
                <p class="text-gray-900 font-semibold">با احترام،</p>
              </div>
            </div>

            <div class="flex flex-wrap justify-center gap-2 w-full mt-4">
              <Button
                v-if="payment?.Status == 0"
                label="مشاهده سفارش"
                class="p-button-primary"
                @click="$router.push('/account')"
              />
              <Button
                v-else
                label="سبد خرید"
                class="p-button-primary"
                @click="$router.push('/card')"
              />
              <Button
                label="بازگشت به سایت"
                class="p-button-secondary"
                @click="$router.push('/')"
              />
     
            </div>
          </div>
        </template>
      </Card>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useCartStore } from "../../store/cart";

// definePageMeta({
//   middleware: "auth",
// });

const cart = useCartStore();
const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();
const errors = ref([]);
const payment = ref(null);

if (process.client) {
  try {
    const data = await $fetch(`/api/payment/verifysetareyek`, {
      method: "POST",
      body: {TrackId : route.query.trackid},
    });
    console.log("data verify", data);

    payment.value = data.data;

    if (payment?.value?.Status == 0) {
      cart.clear();
    }
  } catch (error) {
    // errors.value = Object.values(error?.data?.message).flat();
  }
}

</script>
<style lang="scss" scoped>

@media only screen and (max-width: 600px) {
  .cardsop {
   height: max-content !important;

   
  }

  .cardin {

    padding: 0 !important;
  
  }
  .insidede {
    padding: 0 !important;
 
  }
}

</style>
