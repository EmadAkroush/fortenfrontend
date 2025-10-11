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
          <div class="alert alert-danger" role="alert">
            <ul class="mb-0" style="color: red" v-if="errors">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <!-- PrimeVue Input -->
            <InputText
              placeholder="ورود شماره تلفن"
              class="border-gray-300 rounded-full px-4 py-2 w-full"
              v-model="formData.cellphone"
            />
          </div>

          <div class="flex mb-4 justify-center mt-8">
            <InputText
              placeholder="رمز عبور"
              class="border-gray-300 rounded-full px-4 py-2 w-full"
              v-model="formData.password"
            />
          </div>

          <div class="flex justify-end mb-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-gray-600 mr-3"
              >من به خاطر بسپر</label
            >
          </div>

          <Button
            label="ورود"
            icon="pi pi-sign-in"
            class="w-full bg-blue-500 text-white rounded"
            style="background-color: #405ff2; border: none"
            :loading="loading"
            @click="login()"
          />

          <div class="flex items-center justify-center my-4">
            <!-- Left Line -->
            <div class="flex-grow border-t border-gray-300"></div>

            <!-- Text -->
            <span class="mx-2 text-gray-600">یا</span>

            <!-- Right Line -->
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
          <nuxt-link to="/forgotpassword">
            <Button
              label="فراموشی رمز عبور"
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
      <Toast />
    </div>
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
const formData = reactive({
  cellphone: "",
  password: "",
});

const toast = useToast();
const { authUser } = useAuth();

function validateForm() {
  // Reset errors
  errors.value = [];

  // Check if cellphone is valid
  if (!/^09\d{9}$/.test(formData.cellphone)) {
    errors.value.push("شماره موبایل باید با 09 شروع شود و 11 رقم باشد.");
  }

  // Check if password is valid
  if (formData.password.length < 6) {
    errors.value.push("رمز عبور باید حداقل 6 کاراکتر باشد.");
  }

  return errors.value.length === 0; // Return true if there are no errors
}

async function login() {
  if (!validateForm()) {
    return; // Exit if validation fails
  }
  try {
    loading.value = true;
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    errors.value = null;
    authUser.value = user;
    console.log("fff", user);
    toast.add({
      severity: "success",
      summary: "ورود",
      detail: "ورود با موفقیت انجام شد",
      life: 3000,
    });

    return navigateTo("/");
  } catch (error) {
    errors.value = Object.values(error.data.data).flat();
    console.log("cc", error.data);
  } finally {
    loading.value = false;
  }
}
</script>
