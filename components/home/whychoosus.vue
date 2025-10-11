<template>
  <div>
    <div class="whychoosus flex justify-center items-center w-full">
      <div class="w-full">
        <div class="flex justify-center">
          <h1 class="text-center mb-6">چرا باید مارو انتخاب کنید</h1>
        </div>

        <div
          class="grid gap-4 sm:grid-cols-4 grid-cols-1 items-center justify-center"
        >
          <div class="card flex flex-col  justify-center items-center">
            <div  class="flex justify-center items-center">
              <img src="/public/choosus/1.png" alt="" />
            </div>
            <div class="flex flex-col justify-center items-center">
              <p>ضمانت</p>
              <p style="font-size: 14px">ضمانت اصالت و سلامت کالا</p>
            </div>
          </div>
          <div class="card flex flex-col  justify-center items-center">
            <div  class="flex justify-center items-center">
              <img src="/public/choosus/2.svg.png" alt="" />
            </div>
            <div class="flex flex-col justify-center items-center">
              <p>پشتیبانی</p>
              <p style="font-size: 14px">پشتیبانی و مشاوره به مشتریان</p>
            </div>
          </div>
          <div class="card flex flex-col  justify-center items-center">
            <div  class="flex justify-center items-center">
              <img src="/public/choosus/Group 36.png" alt="" />
            </div>
            <div class="flex flex-col justify-center items-center">
              <p>خدمات</p>
              <p style="font-size: 14px">خدمات پس از فروش هست</p>
            </div>
          </div>
          <div class="card flex flex-col  justify-center items-center">
            <div  class="flex justify-center items-center">
              <img src="/public/choosus/Group 41.png" alt="" />
            </div>
            <div class="flex flex-col justify-center items-center">
              <p>ارسال به موقع</p>
              <p style="font-size: 14px">ارسال سریع و به موقع کالا</p>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.whychoosus {
  h1 {
    font-size: 24px;
    text-align: center;
  }
  padding: 0 80px 100px 80px;
  background-color: #f9fbfc;
  padding-top: 80px;
  .p-card-body {
    padding-right: 0;
  }
  .card {
    box-shadow: none;
    background-color: #f9fbfc;
    padding-right: 0;
    p {
      line-height: 40px;
    }
  }
}
@media only screen and (max-width: 650px) {
  .whychoosus {
    padding: 10px 10px;
    .card {
      display: flex;
      justify-content: center;
      flex-direction: row;
      .p-card-body {
        display: flex;
        justify-content: center;
      }
      .p-card-content {
        text-align: center;
      }
    }
  }
}
</style>
