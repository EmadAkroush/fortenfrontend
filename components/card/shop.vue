<template>
  <Card style="" class="cardshop">
    <template #header>
      
      <nuxt-link :to="`/product/${productdata?.unicid}/${productdata?.name.replace(/\s+/g, '-')}`">
        <div
          class="pic"
          :style="{ backgroundImage: 'url(' + productdata?.primary_image + ')' }"
        >
          <div class="flex justify-center items-center tagshop">
            <p>{{ productdata?.product_garanty }}</p>
          </div>
        </div>
      </nuxt-link>
    </template>

    <template #content>
      <div class="border">
        <p class="first">{{ productdata?.name }}</p>
        <p class="topde text-center">     {{ productdata?.carpart_name }} | </p>
        <div class="flex downde justify-between items-center">
          <div class="flex items-center">
            <img
              src="/public/shopcard/Vector.png"
              class="ml-2"
              alt=""
              style="width: 12px; height: 12px"
            />
            <span style="font-size: 14px">برند : {{ productdata?.brand_name }}</span>
          </div>
          <div class="flex items-center">
            <img
              src="/public/shopcard/Vector (1).png"
              class="ml-2"
              alt=""
              style="width: 12px; height: 12px"
            />
            <span style="font-size: 14px"> خودرو : {{ productdata?.car_name }}</span>
          </div>
        </div>
        <div class="flex justify-between div-footer">
          <div class="flex items-center">
            <img
              src="/public/shopcard/SVG.png"
              class="ml-2"
              alt=""
              style="width: 14px; height: 14px"
            />
            <nuxt-link :to="`/product/${productdata?.unicid}/${productdata?.name.replace(/\s+/g, '-')}`">
              <span style="color: #405ff2; font-size: 14px">دیدن جزئیات</span>
            </nuxt-link>
          </div>
          <div style="font-size: 14px" v-if="productdata?.price">{{ priceser(productdata?.price)   }} تومان</div>
        </div>
      </div>
    </template>
  </Card>
</template>
<style lang="scss">
.cardshop {
  width: 100%;
  box-shadow: none;
  .first {
    padding-top: 15px;
    font-weight: bold;
  }
  .p-card-body {
    padding: 0;
  }

  .border {
    border: 1px solid #e9e9e9;
    border-top: none;
    padding: 0 30px 15px 30px;
    border-radius: 0 0 16px 16px;
  }

  .topde {
    border-bottom: 1px solid #e9e9e9;
    padding: 15px 0;
  }
  .downde {
    border-bottom: 1px solid #e9e9e9;
    padding: 15px 0;
  }
  .div-footer {
    padding: 15px 0 5px 0;
  }
  .tagshop {
    width: 104px;
    height: 30px;
    background-color: #3d923a;
    border-radius: 30px;
    margin-right: auto;
    color: white;
  }
  .pic {
    background-image: url("/public/Container.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 250px;
    padding: 23px 20px;
  }
}
</style>
<script>
export default {
  props: {
    productdata: {
      type: Object,
    },
  },

  methods: {
    priceser(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },


  },
};
</script>
