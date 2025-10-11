<template>
  <div class="searchcar mt-16">
    <div class="top mb-12 flex justify-between">
      <div>
        <h1>جستجو بر اساس خودرو</h1>
      </div>
      <nuxt-link to="product">
      <div class="flex items-center justify-center">
       
        <img
          src="/public/SVG.png"
          alt=""
          class="ml-2"
          style="width: 14px; height: 14px"
        />
        <span> دیدن همه </span>
 
      </div>
    </nuxt-link>
    </div>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <nuxt-link to="/product?carmodel=206">
        <div class="khodro id1 flex items-end">
          <div class="tag flex items-center justify-center">
            <img
              src="/public/khodro/Clip path group.png"
              class="ml-2"
              alt=""
              style="width: 25px; height: 25px"
            />
            <p>206</p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/product?carmodel=تیبا">
        <div class="khodro id2 flex items-end">
          <div class="tag flex items-center justify-center">
            <img
              src="/public/khodro/Clip path group.png"
              class="ml-2"
              alt=""
              style="width: 25px; height: 25px"
            />
            <p>تیبا</p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="grid grid-cols-1 mt-4 gap-3 sm:grid-cols-3">
      <nuxt-link to="/product?carmodel=405">
        <div class="khodro id3 flex items-end">
          <div class="tag flex items-center justify-center">
            <img
              src="/public/khodro/Clip path group.png"
              class="ml-2"
              alt=""
              style="width: 25px; height: 25px"
            />
            <p>405</p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/product?carmodel=پراید">
        <div class="khodro id4 flex items-end">
          <div class="tag flex items-center justify-center">
            <img
              src="/public/khodro/Clip path group.png"
              class="ml-2"
              alt=""
              style="width: 25px; height: 25px"
            />
            <p>پراید</p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/product?carmodel=سمند">
        <div class="khodro id5 flex items-end">
          <div class="tag flex items-center justify-center">
            <img
              src="/public/khodro/Clip path group.png"
              class="ml-2"
              alt=""
              style="width: 25px; height: 25px"
            />
            <p>سمند</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<style lang="scss">
.searchcar {
  margin: 0 80px;
  .top {
    h1 {
      font-size: 28px;
    }
  }
  .tag {
    width: 97px;
    height: 36px;
    border-radius: 30px;
    background-color: white;
    margin-right: auto;
    font-size: 12px;
  }
  .id1 {
    background-image: url("/public/khodro/1.jpg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 27px;
  }
  .id2 {
    background-image: url("/public/khodro/Link.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 27px;
  }
  .id3 {
    background-image: url("/public/khodro/a1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 27px;
  }
  .id4 {
    background-image: url("/public/khodro/a2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 27px;
  }
  .id5 {
    background-image: url("/public/khodro/a3.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 27px;
  }

  .khodro {
    width: 100%;
    height: 350px;
    border-radius: 16px;
  }
}
@media only screen and (max-width: 650px) {
  .searchcar {
    margin: 10px 10px;
    .top {
      h1 {
        font-size: 20px;
      }
    }
  }
}
</style>
