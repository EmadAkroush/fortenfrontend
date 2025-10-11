<template>
    <div class="login">
      <div>
        <nuxt-link to="/">
          <span style="color: #405ff2"> صفحه اصلی / </span>
        </nuxt-link>
        <span>ورود</span>
      </div>
      <div>
        <h1>حساب کاربری</h1>
      </div>
      <div class="mainlogin">
        <div class="flex justify-center w-full my-16 pb-16">
          <div class="bg-white sm-p-6 rounded w-full paper">
          
   
        
              
                  <div class="alert alert-danger mt-2" role="alert" v-if="errorsfront" style="color: red;">
                    {{ errorsfront }}
                  </div>
                  <div class="flex flex-col   mt-4">
                    <!-- PrimeVue Input -->
                    <InputText
                      placeholder="ورود شماره تلفن"
                      class="border-gray-300 rounded-full pt-4  w-full"
                      v-model="formData.cellphone"
                    />
                    <ul class="mb-0" style="color: red" v-if="errors">
                      <li v-for="(error, index) in errors" :key="index">
                        {{ error?.cellphone }}
                      </li>
                    </ul>
               
                  </div>
  
                  <div class="flex mb-4 justify-center mt-8">
                    <InputText
                      placeholder=" رمز عبور جدید "
                      class="border-gray-300 rounded-full px-4 py-2 w-full"
                      v-model="formData.password"
                    />
                  </div>
                  <div class="flex flex-col mb-4 justify-center mt-8">
                    <InputText
                      placeholder="تکرار رمز عبور جدید"
                      class="border-gray-300 rounded-full px-4 py-2 w-full"
                      v-model="formData.password_confirmation"
                    />
                    
                    <ul class="mb-0" style="color: red" v-if="errors">
                      <li v-for="(error, index) in errors" :key="index">
                        {{ error?.password }}
                      </li>
                    </ul>
    
                  </div>
            
           
  
         
  
                  <Button
                    label="تغییر رمز عبور"
                    icon="pi pi-sign-in"
                    class="w-full bg-blue-500 text-white rounded"
                    :loading="loading"
                    style="background-color: #405ff2; border: none"
                    @click="register()"
                  />
  
                  <div class="flex items-center justify-center my-4">
                    <!-- Left Line -->
                    <div class="flex-grow border-t border-gray-300"></div>
  
                    <!-- Text -->
                    <span class="mx-2 text-gray-600">یا</span>
  
                    <!-- Right Line -->
                    <div class="flex-grow border-t border-gray-300"></div>
                  </div>
                  <nuxt-link to="/loginuser">
                    <Button
                      label="بازگشت به صفحه ورود"
                      icon="pi pi-user"
                      class="w-full py-2 rounded"
                      variant="outlined"
                     
                      style="
                        background-color: white;
                        color: rgb(64, 95, 242);
                        border: 1px solid rgb(64, 95, 242);
                      "
                    />
                  </nuxt-link>

       
      
          </div>
        </div>
        <hr />
      </div>
      <Toast />
    </div>
  </template>
  <style lang="scss">
  .login {
    width: 100%;
    .cubtn {
      padding: 10px 0;
    }
    .p-tab-active {
      color: #405ff2;
      border-color: #405ff2 !important;
    }
    .paper {
      width: 450px;
    }
  
    h1 {
      font-size: 30px;
      margin-top: 10px;
    }
    box-sizing: border-box;
    padding: 10px 80px;
  }
  @media only screen and (max-width: 650px) {
    .login {
      padding: 10px 10px;
      .paper {
        width: 100%;
      }
    }
  }
  </style>
  <script setup>
  definePageMeta({
    middleware: "guest",
  });
  
  
  
  const loading = ref(false);
  const errors = ref([]);
  const errorsfront = ref(false);
  const formData = reactive({
    cellphone: "",
    password: "",
    password_confirmation: "",
    
  });
  const toast = useToast();
  const { authUser } = useAuth();
  
  function validateForm() {
    // Reset errors
    errorsfront.value = [];
  
    // Check if cellphone is valid
    if (!/^09\d{9}$/.test(formData.cellphone)) {
      errorsfront.value.push("شماره موبایل باید با 09 شروع شود و 11 رقم باشد.");
    }
  
    // Check if password is valid
    if (formData.password.length < 6) {
      errorsfront.value.push("رمز عبور باید حداقل 6 کاراکتر باشد.");
    }
  
    return errorsfront.value.length === 0; // Return true if there are no errors
  }
  
  
  async function register() {
    
    if (!validateForm()) {
      return; // Exit if validation fails
    }
    try {
      loading.value = true;
      const user = await $fetch("/api/auth/forgotpassword", {
        method: "POST",
        body: formData,
      });
      // this.errors.value = null;
      console.log("user" , user );
      
    //   authUser.value = user;
  
      toast.add({ severity: 'success', summary: 'ثبت نام', detail: 'رمز عبور با موفقیت تغییر کرد', life: 3000 });
      return navigateTo("/loginuser");
    } catch (error) {
      console.log("error" , error);
      
      errors.value = Object.values(error?.data?.data).flat();
    } finally {
      loading.value = false;
    }
  }
  </script>
  