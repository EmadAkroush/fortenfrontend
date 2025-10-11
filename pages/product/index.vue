<template>
  <div class="mainshop">
    <Head>
      <Title>خرید مطمئن قطعات خودرو با بهترین قیمت پارس اتوپارت</Title>
      <Meta
        name="description"
        content="پارس اتو پارتمرجع تخصصی فروش قطعات یدکی خودرو، ارائه‌دهنده قطعات اصل و باکیفیت برای انواع خودروها. تضمین اصالت کالا، ارسال سریع و بهترین قیمت بازار."
      />
    </Head>
    <div class="mt-4">
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span>فروشگاه</span>
    </div>
    <div>
      <h1>فروشگاه</h1>
    </div>
    <div class="grid sm:grid-cols-10 grid-cols-1 gap-4 sm:mt-8">
      <div class="sm:col-span-2">
      
        <LayoutSidebarshop @sefunc="handleChildClick" @secategory="handleCategory"></LayoutSidebarshop>
      </div>
      <div class="sm:col-span-8 grid-cols-1 flex justify-center" v-if="spiner">
        <ProgressSpinner />
      </div>
      <div class="sm:col-span-8 grid-cols-1" v-else>
        <div class="flex sm:flex-row flex-col justify-between" v-if="cardata || carpart || carmodel || carcompany || brandname">
          <div class="flex flex-row  filter ">
            <span class="text ml-2" style="color: #818181"> فیلتر ها :</span>
            <span class="flex flex-row  w-full ">
             <p style="width: 80px;" v-if="cardata"> {{ cardata }} </p> <p style="width: 200px;" v-if="carpart">  {{ carpart }} </p> <p style="width: 80px;" v-if="carmodel">  {{ carmodel }} </p> <p style="width: 80px;" v-if="carcompany">  {{ carcompany }} </p> <p style="width: 40px;" v-if="brandname">  {{ brandname }} </p>
            </span>
          </div>
          <div class="">
            <div class="cursor-pointer" @click="clear()">همه موارد</div>
          </div>
        </div>
        <div class="flex sm:flex-row flex-col justify-between" v-else>
          <div class="basis-1/1 flex items-center filter">
            <span class="text ml-2" style="color: #818181">
              مرتب سازی بر اساس
            </span>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="مرتب سازی براساس"
              class="w-full drop"
              @click=""
            />
          </div>
          <div class="basis-1/1">
            <span style="">نمایش 9 عدد از {{ totalRecords }} نتایج</span>
          </div>
        </div>
        <div
          class="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-8"
          v-if="productsAll.length != 0"
        >
          <div v-for="(item, index) in productsAll" :key="index">
            <CardShopminimal @showtoast="handleEvent"  @showtoast1="handleEvent1"   :productdata="item"></CardShopminimal>
          </div>
        </div>
        <div style="text-align: center" v-else>
          <h1>کالایی با این مشخصات پیدا نکردیم</h1>
        </div>
      </div>
      <div class="sm:col-span-10">
        <Paginator
          :rows="12"
          :totalRecords="totalRecords"
          template=" FirstPageLink PrevPageLink PageLinks  NextPageLink  LastPageLink "
          @page="onPageChange"
          :currentPage="currentPage"
        />
      </div>
      <Toast position="top-left" group="tl" />
    </div>
  </div>
</template>
<style lang="scss">
.mainshop {
  .p-paginator {
    .p-paginator-first {
      transform: rotate(180deg)
    }
    .p-paginator-prev {
      transform: rotate(180deg)
    }
    .p-paginator-next {
      transform: rotate(180deg)
    }
    .p-paginator-last {
      transform: rotate(180deg)
    }

  }


  .filter {
    .text {
      width: 100%;
    }
    .drop {
      border: none;
    }
    .p-placeholder {
      color: #050b20;
    }
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
  background-color: #f9fbfc;
  box-sizing: border-box;
  padding: 10px 80px;
}
@media only screen and (max-width: 650px) {
  .mainshop {
    padding: 10px 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      selectedCity: { name: "همه موارد", code: "1" },
      cities: [
        { name: "همه موارد", code: "1" },
        { name: "کم ترین قیمت", code: "2" },
        { name: "بیش ترین قیمت", code: "3" },
      ],
      product: null,
      productsAll: null,
      currentPage: null,
      totalRecords: null,
      search: null,
      cardata: this.$route.query.cardata,
      carpart: this.$route.query.carpart,
      carmodel: this.$route.query.carmodel,
      carcompany: this.$route.query.carcompany,
      brandname: this.$route.query.brandname,
      categoryname : this.$route.query.categoryname,
      spiner: true,
    };
  },

  computed: {
    productsAll() {
      if (this.productsAll) {
        if (this.selectedCity.code == 1) {
          return this.productsAll.sort((a, b) => a.id - b.id);
        }
        if (this.selectedCity.code == 2) {
          return this.productsAll.sort((a, b) => a.priceoff - b.priceoff);
          // console.log("Sorted products by min price", this.productsAll , this.selectedCity);
        }
        if (this.selectedCity.code == 3) {
          return this.productsAll.sort((a, b) => b.priceoff - a.priceoff);
          // console.log("Sorted products by min price", this.productsAll , this.selectedCity);
        }
      }

      return this.productsAll;
    },
 
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      // Execute fetchDetails method every time the query parameter changes
      if (newQuery !== oldQuery) {
       this.$router.go()
      }
    }
  },


  methods: {
    clear() {
      this.$router.push({
      path: "/product", // Path you want to navigate to
      query: {}, // Empty query clears query params
      params: {}, // Empty params clears route params (if applicable)
      })
    },
    handleEvent(payload) {
      this.$toast.add({ severity: 'success', summary: 'محصول با موفقیت به سبد خرید اضافه شد', detail: payload, group: 'tl', life: 4000 });
    },
    handleEvent1(payload) {
      this.$toast.add({ severity: 'warn', summary: 'توجه انتخاب محصول تکراری ', detail: payload, group: 'tl', life: 4000 });
    },
  
    async getproduct(par) {
      try {
        this.product = await $fetch("/api/shop", {
          query: { page: par },
        });
        this.productsAll = this.product.products;
        this.totalRecords = this.product.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.product = toRaw(this.product);
        console.log("pr", toRaw(this.product));
      }
    },

    async getproductfilter(par) {
      try {
        this.product = await $fetch("/api/advancedsearch", {
          query: { page: par },
          method: "POST",
          body: {
            data: this.cardata,
            carpart_name: this.carpart,
            car_name: this.carmodel,
            company_name: this.carcompany,
            brand_name: this.brandname,
            category_name: this.categoryname,
          },
        });
        this.productsAll = this.product.products;
        this.totalRecords = this.product.total;
      } catch (error) {
        // errors.value = Object.values(error.data.data.message).flat();
        console.log(error);
      } finally {
        this.spiner = false;
        console.log("product", toRaw(this.product));
      }
    },

    handleChildClick(payload) {
      this.cardata = payload;
      this.getproductfilter()
      this.clear()
    },
    handleCategory(payload){
      this.categoryname = payload.name;
      this.getproductfilter(); 
      this.clear()  
    },

    onPageChange(event) {
      this.currentPage = event.page + 1;
      this.getproductfilter(this.currentPage);
      console.log("event", this.currentPage);
    },
  },

  beforeMount() {
    this.getproductfilter();
    
  },
};
</script>
