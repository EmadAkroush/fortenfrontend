<template>
  <Card style="" class="cardshopm">
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
      <div class="">
        <nuxt-link :to="`/product/${productdata?.unicid}/${productdata?.name.replace(/\s+/g, '-')}`">
          <p class="first">{{ productdata?.name }}</p>
          <div class="flex">
        
            <p class="topde" v-if="productdata?.price">{{ priceser(productdata?.priceoff)   }} تومان</p>
            <span style="text-decoration: line-through" class="mt-8 mr-4">
                {{ priceser(productdata?.price) }} تومان
              </span>
          </div>
      
        </nuxt-link>
          <div class="flex downde justify-between items-center" @click="addToCart(productdata)">
            <div class="btn flex items-center justify-center cursor-pointer">
              <sapn> افزودن به سبد خرید  </sapn>

              <span>
                <img
                  src="/public/shopcard/New folder/SVG.png"
                  class="mr-2"
                  alt=""
                />
              </span>
            </div>
          </div>
       
      </div>
    </template>
  </Card>
</template>
<style lang="scss">
.cardshopm {
  width: 100%;
  box-shadow: none;
  border: 1px solid #e9e9e9;
  padding: 31px;
  .btn {
    border: 1px solid #405ff2;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    color: #405ff2;
    font-size: 19px;
  }
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
    padding: 15px 0;
  }
  .downde {
    padding: 15px 0;
  }
  .div-footer {
    padding: 15px 0 5px 0;
  }
  .tagshop {
    width: 104px;
    height: 30px;
    background-color: white;
    border-radius: 30px;
    margin-right: auto;
    color: #050b20;
  }
  .pic {
    // background-image: url("/public/shopcard/s1-300x300.jpg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 250px;
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

  }


};
</script>

<script setup>
import { useCartStore } from "../../store/cart"
const emit = defineEmits(['showtoast'])
const cart = useCartStore();

function addToCart(product) {
  const existingProduct = cart.allItems.find(item => item.id == product.id);

  if (existingProduct) {
    emit('showtoast1', `${product.name} قبلاً به سبد خرید اضافه شده است`);

    // cart.remove(product.id);
  } else {
    
    emit('showtoast', `${product.name} به سبد خرید اضافه شد`);
    cart.addToCart(product, 1);
  }

}

</script>