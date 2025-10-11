<template>
  <div class="product">
    <Head>
      <Title> {{ product?.seo_title }} </Title>
      <Meta name="description" :content="product?.seo_body" />
      <Meta name="product_id" :content="product?.id" />
      <Meta name="product_name" :content="product?.name" />

      <Meta
        name="og:image"
        property="og:image"
        :content="product?.images[0]?.image"
      />
      <Meta name="product_price" :content="product?.priceoff" />
      <Meta name="product_old_price" :content="product?.price" />
      <Meta
        name="availability"
        :content="
          product?.Inventory_status == 'موجود' ? 'instock' : 'outofstock'
        "
      />
    </Head>

    <div class="mt-4">
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span>کد محصول {{ product?.productcode }}</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-12">
      <div class="sm:col-span-9 col-span-1 sm:ml-12">
        <div class="mt-6" style="position: relative">
          <div
            class="flex items-center justify-center"
            style="
              width: 80px;
              height: 40px;
              position: absolute;
              background-color: #405ff2;
              z-index: 10;
              top: 20px;
              left: 20px;
              border-radius: 20px;
              color: white;
            "
          >
            <span>
              {{ product?.Inventory_status }}
            </span>
          </div>
          <ClientOnly>
            <swiper-container ref="containerRef">
              <swiper-slide
                class="swiper-slide"
                v-for="(item, index) in product?.images"
                :key="index"
              >
                <img
                  :src="item.image"
                  :alt="product.seo_pic"
                  style="
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    object-fit: contain;
                  "
                />
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

          <!-- Go back one slide -->
          <div class="flex justify-between mt-6">
            <button
              @click="swiper.prev()"
              style="
                width: 40px;
                height: 40px;
                background-color: #ffffff;
                border: 1px solid #e1e1e1;
                border-radius: 50%;
              "
            >
              <span class="text-2xl text-gray-800">&rarr;</span>
            </button>
            <!-- Go forward one slide -->
            <button
              @click="swiper.next()"
              style="
                width: 40px;
                height: 40px;
                background-color: #ffffff;
                border: 1px solid #e1e1e1;
                border-radius: 50%;
              "
            >
              <span class="text-2xl text-gray-800">&larr;</span>
            </button>
          </div>
        </div>

        <div class="">
          <div class="text-2xl font-bold text-gray-900 mb-2 mt-8">
            {{ product?.name }}
          </div>
          <div class="text-sm text-gray-500 mb-4 mt-6">
            {{ product?.category_name }}
          </div>
          <div class="flex mt-6">
            <!-- Button 1 -->
            <button
              class="flex items-center justify-center ml-2 ml-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full"
            >
              <img src="/public/product/1.png" alt="" />
              <span class="mr-2">{{ product?.tag_name }}</span>
            </button>
          </div>
        </div>
        <div>
          <div class="bg-white rounded-lg mt-6">
            <!-- Features Section -->
            <div class="w-full">
              <h1 style="font-size: 30px">ویژگی ها</h1>
              <div class="grid sm:grid-cols-4 grid-cols-2 gap-8 mt-8">
                <!-- Suitable for Car -->
                <div>
                  <p class="font-bold mb-1">مناسب برای خودرو</p>
                  <div class="flex items-center space-x-1 mt-3">
                    <span
                      class="text-blue-700 bg-blue-50 text-blue-700 px-2 py-1 rounded-full ml-3"
                      >✓</span
                    >
                    <span class="">{{ product?.car_name }}</span>
                  </div>
                </div>

                <!-- Brand -->
                <div>
                  <p class="font-bold mb-1">برند</p>
                  <div class="flex items-center space-x-1 mt-3">
                    <span
                      class="text-blue-700 bg-blue-50 text-blue-700 px-2 py-1 rounded-full ml-3"
                      >✓</span
                    >
                    <span class="">{{ product?.brand_name }}</span>
                  </div>
                </div>

                <!-- Warranty -->
                <div>
                  <p class="font-bold mb-1">ضمانت</p>
                  <div class="flex items-center space-x-1 mt-3">
                    <span
                      class="text-blue-700 bg-blue-50 text-blue-700 px-2 py-1 rounded-full ml-3"
                      >✓</span
                    >
                    <span class="">{{ product?.product_garanty }}</span>
                  </div>
                </div>

                <!-- Manufacturer Country -->
                <div>
                  <p class="font-bold mb-1">کشور سازنده</p>
                  <div class="flex items-center space-x-1 mt-3">
                    <span
                      class="text-blue-700 bg-blue-50 text-blue-700 px-2 py-1 rounded-full ml-3"
                      >✓</span
                    >
                    <span class="">{{ product?.product_country }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <hr class="my-6" />
            <h1 style="font-size: 30px">رنگ و ابعاد</h1>
            <!-- Color and Dimensions Section -->
            <div class="px-4" style="width: 85%">
              <div class="grid grid-cols-2 gap-8 py-4 text-gray-800 text-lg">
                <!-- Length -->
                <div class="flex justify-between">
                  <div>
                    <p class="mt-2">طول</p>
                    <p class="mt-2">عرض</p>
                  </div>

                  <!-- Width -->
                  <div>
                    <p class="mt-2">{{ product?.product_length }}</p>
                    <p class="mt-2">{{ product?.product_width }}</p>
                  </div>
                </div>

                <!-- Color 1 -->
                <div class="flex justify-between">
                  <div>
                    <p class="mt-2">رنگ اول</p>
                    <p class="mt-2">رنگ دوم</p>
                  </div>

                  <!-- Color 2 -->
                  <div>
                    <p class="mt-2">
                      {{
                        product?.product_first_color == "null"
                          ? ""
                          : product?.product_first_color
                      }}
                    </p>
                    <p class="mt-2">
                      {{
                        product?.product_second_color == "null"
                          ? ""
                          : product?.product_second_color
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-6" />
          </div>
        </div>
        <div class="mx-auto bg-white rounded-lg p-6">
          <!-- Header -->
          <div class="text-right mb-4">
            <h2 class="text-xl font-bold text-gray-800">توضیحات</h2>
          </div>

          <!-- Description Content -->
          <div class="text-right text-gray-700 leading-loose space-y-4">
            <div v-html="product?.description"></div>
          </div>

          <!-- Download Button -->
          <div class="text-left mt-6">
            <button
              class="bg-blue-100 text-blue-700 py-2 px-4 rounded flex items-center mr-auto"
              v-if="product?.product_file"
            >
              <span class="ml-2">📄</span> دانلود کاتالوگ Pdf
            </button>
          </div>
        </div>
      </div>
      <div class="sm:col-span-3 col-span-1">
        <div class="flex space-x-6 flex-end justify-end mt-6">
          <!-- Save Button -->
          <button class="flex items-center text-gray-800 ml-3">
            <div
              class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
            >
              <img src="/public/product/4.png" alt="" />
            </div>

            <span class="mt-2 mr-2">ذخیره</span>
          </button>

          <!-- Share Button -->
          <button class="flex items-center text-gray-800">
            <div
              class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
            >
              <img src="/public/product/5.png" alt="" />
            </div>
            <span class="mt-2 mr-2">اشتراک</span>
          </button>
        </div>
        <div
          class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden mb-6 mt-8"
          style="border: 1px solid #e1e1e1"
        >
          <div class="p-6">
            <div class="text-xl font-semibold text-gray-800 mb-2">قیمت ما</div>
            <div class="text-2xl text-gray-900 font-bold mb-4 text-end">
              <span> تومان {{ priceser(product?.priceoff) }} </span>
            </div>
            <div class="flex flex-col text-sm text-gray-500 mb-2">
              <span style="text-decoration: line-through">
                {{ priceser(product?.price) }} تومان
              </span>
              <span class="mt-4"> سود شما: {{ priceser(profit) }} تومان</span>
            </div>
            <div class="space-y-4 w-full mx-auto">
              <!-- Add to Cart Button -->
              <button
                class="w-full flex justify-center items-center px-4 py-3 bg-blue-600 text-white rounded-xl mt-6"
                @click="addToCart(product)"
              >
                <span>افزودن به سبد خرید</span>

                <img src="/public/product/6.png" alt="" class="mr-5" />
              </button>

              <!-- Installment Payment Button -->
              <button
                class="w-full flex justify-center items-center px-4 py-3 bg-white text-gray-600 rounded-xl border border-gray-300"
              >
                <span>امکان پرداخت قسطی با ستاره یک</span>
                <img src="/public/product/7.png" alt="" class="mr-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden"
          style="border: 1px solid #e1e1e1"
        >
          <div class="p-6 flex items-center text-center">
            <!-- <img src="path/to/avatar.jpg" alt="Avatar" class="w-16 h-16 rounded-full border-2 mr-4"> -->
            <div style="width: 100%">
              <div
                class="text-lg font-bold text-gray-900 flex flex-col justify-center items-center"
              >
                <img
                  src="/public/product/8.png"
                  alt=""
                  style="width: 80px; height: 80px"
                />
                <span class="mt-2">ادمین</span>
              </div>
              <div class="text-sm text-gray-500 mt-2">کارشناس پشتیبانی</div>
              <div class="text-center space-y-4">
                <!-- Phone Number -->
                <div
                  class="flex items-center space-x-2 text-gray-800 mb-4 mt-6"
                >
                  <div
                    class="rounded-full flex items-center justify-center ml-2"
                    style="
                      width: 40px;
                      height: 40px;
                      background-color: #405ff21a;
                    "
                  >
                    <img
                      src="/public/product/9.png"
                      alt=""
                      style="z-index: 5"
                    />
                  </div>
                  <div>
                    <span> <a href="tel:+989173335691"> 09173335691 </a> </span>
                  </div>
                </div>

                <!-- Send Message Button -->
                <a href="tel:+989173335691">
                  <button
                    class="w-full flex justify-center items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-200"
                  >
                    <img src="/public/product/10.png" alt="" />
                    <span class="mr-4">ارسال پیام</span>
                  </button>
                </a>

                <!-- WhatsApp Contact Button -->
                <a href="tel:+989173335691" class="mt-8" style="display: block">
                  <button
                    class="w-full flex justify-center items-center px-4 py-2 bg-transparent text-green-600 rounded-lg border border-green-500"
                  >
                    <img src="/public/product/SVG.png" alt="" />
                    <span class="mr-4">ارتباط در واتساپ</span>
                  </button>
                </a>

                <a href="tel:+989173335692" class="mt-8" style="display: block">
                  <button
                    class="w-full flex justify-center items-center px-4 py-2 bg-transparent text-purple-400 rounded-lg border border-purple-400"
                  >
                    <img src="/public/product/SVG.png" alt="" />
                    <span class="mr-4">ارتباط در روبیکا</span>
                  </button>
                </a>
              </div>
              <div class="w-full flex justify-center items-center mt-4">
                <img src="/public/product/SVG1.png" alt="" />
                <a href="#" class="mt- block mr-4">دیدن همه‌ی تخفیف دار ها</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="secdown pb-12">
      <div class="top mb-12 flex justify-between mt-6">
        <div>
          <h1>محصولات مرتبط</h1>
        </div>
        <div class="flex items-center justify-center">
          <img
            src="/public/SVG.png"
            alt=""
            class="ml-2"
            style="width: 14px; height: 14px"
          />
          <nuxt-link :to="`/shop?categoryname=${categoryname}`">
            <span> دیدن همه </span>
          </nuxt-link>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div v-for="(item, index) in ralatedData1" :key="index">
          <CardShop :productdata="item"></CardShop>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <!-- Left Arrow Button -->
        <!-- Right Arrow Button -->
        <!-- 
        <button
          class="w-12 h-12 bg-white rounded-full shadow-md flex justify-center items-center"
        >
          <span class="text-2xl text-gray-800">&rarr;</span>
        </button>

        <button
          class="w-12 h-12 bg-white rounded-full shadow-md flex justify-center items-center"
        >
          <span class="text-2xl text-gray-800">&larr;</span>
        </button> -->
      </div>
    </div>
    <Toast position="top-left" group="tl" />
  </div>
</template>
<style lang="scss">
.product {
  box-sizing: border-box;
  padding: 10px 80px;
  .secdown {
    border-bottom: 1px solid #e1e1e1;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height: 600px;
    font-size: 4rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    border-radius: 16px;
  }
}
@media only screen and (max-width: 650px) {
  .product {
    padding: 10px 10px;
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      height: 200px;
      font-size: 4rem;
      font-weight: bold;
      font-family: "Roboto", sans-serif;
      border-radius: 16px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      pageId: this.$route.params.id,
      product: null,
      secondcolor: null,
      profit: null,
      ralated: null,
      // categoryname: null,
      // ralatedData: null,
      // ralatedData1: null,
    };
  },
  watch: {
    // وقتی categoryid تغییر کند
    categoryname(newVal) {
      if (newVal !== null) {
        // اگر مقدار جدید null نباشد، فانکشن دوم را صدا می‌زنیم
        this.getca();
      }
    },
  },

  methods: {
    // async getproduct() {
    //   try {
    //     this.product = await $fetch("/api/shop/detailsshow", {
    //       method: "POST",
    //       body: {
    //         unicid: this.pageId[0],
    //       },
    //     });

    //     this.profit = this.product.price - this.product.priceoff;
    //     this.categoryname = this.product?.category_name;
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     // this.product = toRaw(this.product);
    //     console.log("pr", toRaw(this.product));
    //   }
    // },
    // async asyncData({ $fetch, params }) {
    //   try {
    //     const unicid = Array.isArray(params.id) ? params.id[0] : params.id;
    //     const product = await $fetch("/api/shop/detailsshow", {
    //       method: "POST",
    //       body: {
    //         unicid, // Ensure unicid is correctly assigned
    //       },
    //     });
    //     console.log("producteee", product);
    //     return {
    //       product,
    //       profit: product.price - product.priceoff,
    //       categoryname: product?.category_name,
    //     };
    //   } catch (error) {
    //     console.error("Error fetching product data:", error);
    //     return {
    //       product: null,
    //       profit: null,
    //       categoryname: null,
    //     };
    //   }
    // },

    // async getca(par) {
    //   try {
    //     this.ralated = await $fetch("/api/advancedsearch", {
    //       query: { page: par },
    //       method: "POST",
    //       body: {
    //         category_name: this.categoryname,
    //       },
    //     });
    //     this.ralatedData = this.ralated.products.filter(
    //       (product) => product.id !== Number(this.pageId)
    //     );
    //     this.ralatedData1 = this.ralatedData.slice(0, 4);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     // this.product = toRaw(this.product);
    //     console.log("ralated", toRaw(this.ralatedData1));
    //   }
    // },

    priceser(price) {
      return price
        ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "";
    },
  },

  beforeMount() {
    this.pageId = this.$route.params.id;
  },
  mounted() {
    // this.getproduct();
  },

  // setup() {

  //   return {
  //     containerRef,
  //     slides,
  //     swiper,
  //   };
  // },
};
</script>
<script setup>
import { useCartStore } from "../../store/cart";

const route = useRoute();
const toast = useToast();

const { data: product } = await useAsyncData("product", () =>
  $fetch("/api/shop/detailsshow", {
    method: "POST",
    body: {
      unicid: route.params.id[0],
    },
  })
);
console.log("product44", product.value);

const profit = computed(() => product.value.price - product.value.priceoff);

const cart = useCartStore();

function addToCart(product) {
  const existingProduct = cart.allItems.find((item) => item.id == product.id);

  if (existingProduct) {
   toast.add({
      severity: "warn",
      summary: "توجه انتخاب محصول تکراری ",
      detail: `${product.name} قبلاً به سبد خرید اضافه شده است`,
      group: "tl",
      life: 4000,
    });

    // cart.remove(product.id);
  } else {
    toast.add({
      severity: "success",
      summary: "محصول با موفقیت به سبد خرید اضافه شد",
      detail: `${product.name} به سبد خرید اضافه شد`,
      group: "tl",
      life: 4000,
    });
    cart.addToCart(product, 1);
  }
}
  const ralated = ref(null);
  const ralatedData = ref(null);
  const ralatedData1 = ref(null);

  async function getca(par) {
    try {
      const response = await $fetch("/api/advancedsearch", {
        query: { page: par },
        method: "POST",
        body: {
          category_name: product.value?.category_name,
        },
      });
      ralated.value = response;
      ralatedData.value = ralated.value.products.filter(
        (product) => product.id !== Number(route.params.id)
      );
      ralatedData1.value = ralatedData.value.slice(0, 4);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("ralated", toRaw(ralatedData1.value));
    }
  }

// function addToCart(product) {
//   cart.remove(product.id);
//   cart.addToCart(product, 1);
// }
const containerRef = ref(null);
const slides = ref(Array.from({ length: 10 }));
const swiper = useSwiper(containerRef);

onMounted(() => {
  // Access Swiper instance
  // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties

    getca();
 
  console.log(swiper.instance);
});
</script>
