<template>
  <div class="view">
    <div class="top mb-12 flex justify-between">
      <div>
        <h1>پر بازدید ترین قطعات</h1>
      </div>
      <div class="flex items-center justify-center">
        <img
          src="/public/SVG.png"
          alt=""
          class="ml-2"
          style="width: 14px; height: 14px"
        />
        <nuxt-link to="/shop">
          <span> دیدن همه </span>
        </nuxt-link>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
      <div v-for="(item, index) in productsAll" :key="index">
        <CardShop :productdata="item"></CardShop>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.view {
  margin: 0 80px;
  padding-bottom: 80px;
  .top {
    margin-top: 90px;
    h1 {
      font-size: 28px;
    }
  }
}
@media only screen and (max-width: 650px) {
  .view {
    margin: 0 10px;
    .top {
      margin-top: 20px;
      h1 {
        font-size: 20px;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      product: null,
      productsAll: null,
    };
  },
  methods: {
    async getproduct(par = 1) {
      try {
        this.product = await $fetch("/api/shop", {
          query: { page: par },
        });
        this.productsAll = this.product.products.slice(0, 8);
      } catch (error) {
        console.log(error);
      } finally {
        this.product = toRaw(this.product);
        console.log("pr", toRaw(this.product));
      }
    },
  },
  beforeMount() {
    this.getproduct();
  },
};
</script>
