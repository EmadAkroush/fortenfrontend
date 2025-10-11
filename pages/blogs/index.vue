<template>
  <div class="mainblog">
    <Head>
      <Title>راهنمای جامع قطعات خودرو | بررسی، مقایسه و نکات فنی</Title>
      <Meta
        name="description"
        content="راهنمای جامع قطعات خودرو | بررسی، مقایسه و نکات فنی. در این وبلاگ به بررسی و مقایسه انواع قطعات خودرو می‌پردازیم و نکات فنی و تجربیات خود را با شما به اشتراک می‌گذاریم."
      />
    </Head>
    <div>
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span>وبلاگ</span>
    </div>
    <div>
      <h1>وبلاگ</h1>
    </div>
    <div class="grid sm:grid-cols-10 grid-cols-1 gap-8 mt-8">
      <div class="sm:col-span-2">
        <LayoutSidebarblog @sefunc="handleChildClick"  @secategory="handleCategory" @setag="handleTag"></LayoutSidebarblog>
      </div>
      <div class="sm:col-span-8 grid-cols-1">
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-4"   v-if="postAll?.length != 0">
          <div v-for="(item, index) in postAll" :key="index">
            <CardBlog :postdata="item"></CardBlog>
          </div>
        </div>
        <div style="text-align: center" v-else>
          <h1>کالایی با این مشخصات پیدا نکردیم</h1>
        </div>
      </div>
      <div class="sm:col-span-10">
        <Paginator
          :rows="10"
          :totalRecords="totalRecords"
          template="PageLinks "
          @page="onPageChange"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.mainblog {
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
  background-color: #f9fbfc;
  box-sizing: border-box;
  padding: 10px 80px;
}
@media only screen and (max-width: 650px) {
  .mainblog {
    padding: 10px 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "بیش ترین قیمت", code: "NY" },
        { name: "کم ترین قیمت", code: "RM" },
        { name: "جدید ترین", code: "LDN" },
      ],
      post: null,
      postAll: null,
      currentPage: null,
      totalRecords: null,
      postdata: this.$route.query.postdata,
      posttag: this.$route.query.posttag,
      categoryname : this.$route.query.categoryname,
    };
  },
  methods: {
    clear() {
      this.$router.push({
        path: "/blogs", // Path you want to navigate to
        query: {}, // Empty query clears query params
        params: {}, // Empty params clears route params (if applicable)
      });
    },
    handleChildClick(payload) {
      this.postdata = payload;
      this.getpost()
      this.clear()
    },
    handleCategory(payload){
      this.categoryname = payload.name;
      this.getpost(); 
      this.clear()  
    },
    handleTag(payload){
      this.posttag = payload.name;
      this.getpost(); 
      this.clear()  
    },

    async getpost(par) {
      try {
        this.post = await $fetch("/api/blogfilter", {
          query: { page: par },
          method: "POST",
          body: {
            title: this.postdata,
            tag_name: this.posttag,
            category_name: this.categoryname,
          },

        });
        this.postAll = this.post.posts;
        this.totalRecords = this.post.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.post = toRaw(this.post);
        console.log("pr", toRaw(this.post));
      }
    },
    onPageChange(event) {
      this.currentPage = event.page + 1;
      this.getpost(this.currentPage);
      console.log("event", this.currentPage);
    },
  },
  beforeMount() {
    this.getpost();
  },
};
</script>
