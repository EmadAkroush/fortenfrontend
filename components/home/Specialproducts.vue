<template>
  <div class="newarticle mt-14">
    <div class="top py-12 flex justify-between">
      <div>
        <h1> محصولات ویژه  </h1>
      </div>
      <!-- <div class="flex justify-center items-center">
        <img
          src="/public/SVG.png"
          alt=""
          class="ml-2"
          style="width: 14px; height: 14px"
        />
        <nuxt-link to="/blogs">
        <span> دیدن همه </span>
        </nuxt-link>
      </div> -->
    </div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-3">
      <div v-for="(item, index) in postAll" :key="index">
        <CardBlog :postdata="item"></CardBlog>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.newarticle {
  .top {
    h1 {
      font-size: 28px;
    }
  }
  padding: 0 80px;
  background-color: #f9fbfc;
}
@media only screen and (max-width: 650px) {
  .newarticle {
    padding: 10px 10px;
    .top {
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
      post: null,
      postAll: null,
  
 
    };
  },
  methods: {
    async getpost(par = 1) {
      try {
        this.post = await $fetch("/api/post", {
          query: { page: par },
        });
        this.postAll = this.post.posts.slice(0, 3);

      } catch (error) {
        console.log(error);
      } finally {
        this.post = toRaw(this.post);
        console.log("pr", toRaw(this.post));
      }
    },
 
  },
  beforeMount() {
    this.getpost();
  },
};
</script>

