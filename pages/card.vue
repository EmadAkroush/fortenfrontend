<template>
  <div class="cardpage">
    <div>
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span> سبد خرید</span>
    </div>
    <div>
      <h1>سبد خرید</h1>
    
    </div>
    <div class="maincard grid grid-cols-1 sm:grid-cols-12 gap-4 sm:my-16 my-4">
      <div class="sm:col-span-3">
        <div
          class="max-w-sm mx-auto sm:my-6 bg-white rounded-lg border border-gray-200 p-4 rightc"
        >
          <div class="">
            <h2 class="text-right text-lg font-semibold mt-6">
              مجموع سبد خرید
            </h2>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span>جمع خرید</span>
        
                <span>{{ priceser(totalAmount) }} تومان</span>
              </div>
              <div class="flex justify-between">
                <span>جمع تخفیف</span>
                <span> {{ priceser(totalAmountoff) }}  تومان</span>
              </div>
            </div>
            <div class="border-t border-gray-300 my-2"></div>
            <div class="flex justify-between font-bold mt-4">
              <span>مجموع</span>
              <span>{{ priceser(totalAmountkol) }}  تومان</span>
            </div>
          </div>

          <Button
            label="رفتن به صفحه تسویه حساب"
            icon="mdi mdi-arrow-left"
            iconPos="right"
            class="w-full text-white py-3 rounded-b-lg mt-4"
            style="background-color: #405ff2; border: 1px solid #405ff2"
            @click="checkauths()"
          />
        </div>
      </div>
      <div class="sm:col-span-9">
        <div class="mx-auto my-6 bg-white rounded-lg border border-gray-200">
          <div class="p-4 border-b border-gray-300">
            <h2 class="text-right text-lg font-semibold">سبد خرید</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-right">
              <thead class="bg-gray-100">
                <tr>
                  <th class="py-3 px-2 pr-4">قیمت کل</th>
                  <th class="py-3 px-2">تعداد</th>
                  <th class="py-3 px-2">قیمت</th>
                  <th class="py-3 px-2">محصولات</th>
                  <th class="py-3 px-2">تصویر محصول</th>
                  <th class="py-3 px-2"> حذف محصول</th>

                </tr>
              </thead>
              <tbody>
                <tr class="" v-for="item in cartItems" :key="item.id">
                  <td class="py-4 px-2 pr-4">
                    {{ priceser(item.priceoff * item.qty) }} تومان
                  </td>
                  <td
                    class="py-4 px-2 flex items-center justify-start space-x-2 mt-4"
                  >
                    <Button
                      icon="mdi mdi-plus"
                      class="p-button-outlined p-button-sm ml-2"
                      style="color: #405ff2; border: 1px solid #405ff2"
                      @click="() => cart.increment(item.id)"
                    />
                    <InputNumber
                      v-model="item.qty"
                      min="1"
                      class="text-center"
                    />

                    <Button
                      icon="mdi mdi-minus"
                      class="p-button-outlined p-button-sm"
                      style="color: #405ff2; border: 1px solid #405ff2"
                      @click="() => item.qty > 1 && cart.decrement(item.id)"
                    />
                  </td>
                  <td class="py-4 px-2">{{ priceser(item.priceoff) }} تومان</td>
                  <td class="py-4 px-2">{{ item.name }}</td>
                  <td class="py-4 px-2">
                    <div class="flex items-center space-x-4">
                      <img
                        :src="item.primary_image"
                        alt="Product"
                        class="w-20 h-20 ml-3"
                      />
       
                    </div>
                  </td>
                  <td class="py-4 px-2">
                    <div class="flex justify-center items-center space-x-4">
             
                      <Button
                        icon="mdi mdi-close"
                        class="p-button-rounded p-button-secondary"
                        style="width: 40px; height: 40px"
                        @click="removeFromCart(item.id)"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between px-4 py-4">
            <Button
              label="بروزرسانی"
              class="p-button-outlined"
              style="color: #405ff2; border: 1px solid #405ff2"
              @click="updatepage()"
            />
            <nuxt-link to="/shop">
              <Button
                label="برگشت به فروشگاه"
                class="p-button-outlined"
                icon="mdi mdi-arrow-left"
                iconPos="right"
                style="color: #405ff2; border: 1px solid #405ff2"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
      <Dialog
        v-model:visible="visible"
        modal
        header="ورود به سایت"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8">
          برای رفتن به صفحه ی تسویه حساب شما باید وارد سایت بشوید
        </span>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="انصراف"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <nuxt-link to="/login">
            <Button
              type="button"
              label="ورود ثبت نام"
            ></Button>
          </nuxt-link>
        </div>
      </Dialog>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "../store/cart";
const visible = ref(false);
const { authUser } = useAuth();
const router = useRouter();

const toast = useToast();
const cart = useCartStore();
const countCart = computed(() => cart.count);
const cartItems = computed(() => cart.allItems);
const totalAmount = computed(() => cart.totalAmount)
const totalAmountoff = computed(() => cart.totalAmountoff)
const totalAmountkol = computed(() => cart.totalAmountkol)



function removeFromCart(id) {
  cart.remove(id);
  // toast.warning('محصول مورد نظر از سبد خرید پاک شد')
}
function priceser(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function checkauths() {
  if (authUser.value === null) {
    visible.value = true;
  } else {
    router.push("/checkout");
  }
}
function updatepage() {
  router.go();
}
</script>
<style lang="scss">
.cardpage {
  .rightc {
    width: 100%;
  }
  .p-inputnumber-input {
    width: 40px;
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
  box-sizing: border-box;
  padding: 10px 80px;
}
@media only screen and (max-width: 650px) {
  .cardpage {
    padding: 10px 10px;
  }
}
</style>
