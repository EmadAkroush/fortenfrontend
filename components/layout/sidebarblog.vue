<template>
  <div class="sidebarblog">
    <div class="category">
      <div class="flex search items-center">
        <div
          class="searchicon flex items-center justify-center mr-1"
          @click="filtersearch"
        >
          <img src="/public/blog/blog/Vector.svg" alt="" />
        </div>
        <InputText v-model="search" placeholder="جستجو" class="inpute" />
      </div>
      <ul class="menu mt-6">
   
          <li class="first cursor-pointer" @click="refresh()" >همه دسته بندی ها</li>
        
        <div v-for="(item, index) in productsAll" :key="index">
          <li
            class="cursor-pointer"
            @click="filtercategory(item, index)"
            :class="{ active: selectedItem === index }"
          >
            {{ item.name }}
          </li>
        </div>
      </ul>
    </div>
    <div class="tag">
      <h2>برچسب ها</h2>
      <div class="flex flex-wrap gap-2">
        <div
          class="lable mt-2 flex items-center justify-center px-2"
          style="width: fit-content"
          v-for="(item, indext) in tagsAll"
          :key="indext"
        >
          <p
            class="cursor-pointer"
            @click="filtertag(item, indext)"
            :class="{ activet: selectedItemtag === indext }"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [100],
      product: null,
      productsAll: null,
      tags: null,
      tagsAll: null,
      search: null,
      categorydata: null,
      tagdata: null,
      selectedItem: null,
      selectedItemtag: null,
    };
  },
  methods: {
    filtersearch() {
      this.$emit("sefunc", this.search);
    },
    refresh(){
      this.$router.go()
    },
    filtercategory(item, index) {
      this.selectedItem = index;
      this.categorydata = item;
      this.$emit("secategory", this.categorydata);
    },
    filtertag(item, indext) {
      this.selectedItemtag = indext;
      this.tagdata = item;
      this.$emit("setag", this.tagdata);
    },
    async getproduct(par = 1) {
      try {
        this.product = await $fetch("/api/categoryblog", {
          query: { page: par },
        });
        this.productsAll = this.product.PostCategory;
      } catch (error) {
        console.log(error);
      } finally {
        this.product = toRaw(this.product);
        console.log("cat", toRaw(this.product));
      }
    },
    async gettags(par = 1) {
      try {
        this.tags = await $fetch("/api/tagsblog", {
          query: { page: par },
        });
        this.tagsAll = this.tags.PostTags;
      } catch (error) {
        console.log(error);
      } finally {
        this.tags = toRaw(this.tags);
        console.log("tag", toRaw(this.tags));
      }
    },
  },
  beforeMount() {
    this.getproduct();
    this.gettags();
  },
};
</script>

<style lang="scss">
.sidebarblog {
  height: fit-content;
  .active {
    color: #405ff2;
  }
  .activet {
    color: #405ff2;
  }

  .menu {
    .first {
      font-size: 20px;
    }

    font-size: 17px;
    line-height: 35px;
  }
  .searchicon {
    width: 35px;
    height: 35px;
    background-color: #405ff2;
    border-radius: 50%;
  }
  .search {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 2px;
  }
  .category {
    border: 1px solid #e9e9e9;
    border-radius: 16px;
    padding: 26px;
    background-color: white;
  }
  .tag {
    border: 1px solid #e9e9e9;
    margin-top: 20px;
    border-radius: 16px;
    padding: 26px;
    background-color: white;
    h2 {
      font-size: 20px;
    }
    .lable {
      min-width: 100px;
      height: 40px;
      background-color: #e9f2ff;
      border-radius: 34px;
    }
  }
  .inpute {
    border: none;
    width: 80%;
  }
}
@media only screen and (max-width: 650px) {
  .sidebarblog {
    .category {
      border: none;
    }
    height: fit-content;
    .tag {
      display: none;
    }
    .menu {
      display: none;
    }
  }
}
</style>
