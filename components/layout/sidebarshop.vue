<template>
  <div class="sidebarblog">
    <div class="category">
      <div class="flex search items-center">
        <div class="searchicon flex items-center justify-center mr-1" @click="filtersearch">
          <img src="/public/blog/blog/Vector.svg" alt="" />
        </div>
        <InputText v-model="search" placeholder="جستجو" class="inpute"  />
      </div>
      <ul class="menu mt-6">
      
          <li class="first cursor-pointer" @click="refresh()"> همه دسته بندی ها</li>
       
        <div v-for="(item, index) in productsAll" :key="index" >
            <span v-if="item.products_count > 0" >
            <li class="flex justify-between cursor-pointer" @click="filtercategory(item, index)"  :class="{ active: selectedItem === index }"  >
              <p>{{ item.name }}</p>
              <span> ({{ item.products_count }})</span>
            </li>
          </span>
        </div>
      </ul>
    </div>
    <div class="tag">
      <p>قیمت</p>
      <div class="flex justify-center mt-6">
        <Slider
          v-model="value"
          range
          class="slide"
          :min="100"
          :max="900"
          style="width: 200px"
        />
      </div>
      <div class="flex justify-between mt-8">
        <div class="flex items-center">
          <InputText v-model.number="value[1]" class="two" />
          <span>هزارتومن</span>
        </div>
        <div class="flex items-center">
          <InputText v-model.number="value[0]" class="one" />
          <span>هزارتومن</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebarblog {
  height: fit-content;
  .active {

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
    .slide {
      width: 100px;
    }
    .one {
      width: 55px;
      border: none;
    }
    .two {
      width: 55px;
      border: none;
    }
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
<script>
export default {
  data() {
    return {
      value: [100],
      product: null,
      productsAll: null,
      search: null,
      categorydata: null,
      selectedItem: null
    
    };
  },
  watch: {
    // وقتی categoryid تغییر کند
    categoryid(newVal) {
      if (newVal !== null) {
        // اگر مقدار جدید null نباشد، فانکشن دوم را صدا می‌زنیم
        this.getca();
      }
    },
  },
  methods: {
    filtersearch() {
      this.$emit('sefunc', this.search);
    },
    refresh(){
      this.$router.go()
    },
    filtercategory(item , index ) {
      this.selectedItem = index; 
      this.categorydata = item;
      this.$emit('secategory', this.categorydata);
    
  
    },
    async getproduct(par = 1) {
      try {
        this.product = await $fetch("/api/category", {
          query: { page: par },
        });
        this.productsAll = this.product.categories;
      } catch (error) {
        console.log(error);
      } finally {
        this.product = toRaw(this.product);
        console.log("cat", toRaw(this.product));
      }
    },
    async getca(id) {
      try {
        this.ralated = await $fetch("/api/category/filter", {
          query: { categoryid: id },
        });
        this.ralatedData = this.ralated.products;
      } catch (error) {
        console.log(error);
      } finally {
        // this.product = toRaw(this.product);
        console.log("ralated", toRaw(this.ralatedData));
      }
    },
  },
  beforeMount() {
    this.getproduct();
  },
};
</script>
