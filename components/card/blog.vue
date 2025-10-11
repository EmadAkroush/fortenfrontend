<template>
  <Card style="" class="cardblog">
    <template #header>
      <nuxt-link :to="`/blogs/${postdata?.id}`">
      <div class="pic"  :style="{ backgroundImage: 'url(' + postdata?.primary_image + ')' }">
        <div class="tag flex items-center justify-center">
          <p>{{ postdata?.category_name }} </p>
        </div>
      </div>
    </nuxt-link>
    </template>
    <template #title>
      <span style="font-size: 12px"> ادمین </span>
      <span style="font-size: 12px"> {{ postdata?.date }}     </span>
    </template>
    <template #subtitle>
      <nuxt-link :to="`/blogs/${postdata?.id}`">
        <p class="text-primary">
          {{ postdata?.title }} 
        </p>
      </nuxt-link>
    </template>

    <template #footer>
      <div class="flex gap-4 mt-1"></div>
    </template>
  </Card>
</template>
<style lang="scss">
.cardblog {
  box-shadow: none;
  background-color: #f9fbfc;
  .pic {
    background-image: url("/public/blog/1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 290px;
    padding: 17px 23px;
    border-radius: 16px;
  }
  .tag {
    padding: 0 20px;
    width: fit-content;
    height: 36px;
    border-radius: 30px;
    background-color: white;
    margin-right: auto;
  }
}
</style>
<script>
export default {
  props: {
    postdata: {
      type: Object,
    },
  },

  methods: {
    // priceser(price) {
    //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // },

  }


};
</script>
