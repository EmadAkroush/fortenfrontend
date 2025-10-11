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
          <!-- <h2 style="color: red; line-height: 35px">
            در حال حاضر ورود با اسمس فعال نمی باشد گزینه ورود با نام کاربری و
            رمز عبور را انتخاب کنید
          </h2> -->
    
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
const counter = ref(0);
let interval = null;

const startCountdown = () => {
  counter.value = 120;
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (counter.value > 0) {
      counter.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const handleSendSms = () => {

  sendsms();
  startCountdown();
};

const loading = ref(false);
const errors = ref([]);
const errorsfront = ref(false);
const errorsfrontsms = ref(false);

const formData = reactive({
  cellphone: "",
  password: "",
  c_password: "",
});
const cellphonesms = ref();
const otpcode = ref();
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

function validateFormSms() {
  // Reset errors
  errorsfrontsms.value = [];

  // Check if cellphone is valid
  if (!/^09\d{9}$/.test(cellphonesms.value)) {
    errorsfrontsms.value.push(
      "شماره موبایل باید با 09 شروع شود و 11 رقم باشد."
    );
  }

  // Check if password is valid
  // if (formData.password.length < 6) {
  //   errorsfront.value.push("رمز عبور باید حداقل 6 کاراکتر باشد.");
  // }

  return errorsfrontsms.value.length === 0; // Return true if there are no errors
}

async function sendsms() {
  if (!validateFormSms()) {
    return; // Exit if validation fails
  }
  try {
    loading.value = true;
    const user = await $fetch("/api/auth/sendsms", {
      method: "POST",
      body: {
        cellphone: cellphonesms.value,
      },
    });
    // this.errors.value = null;
    console.log("data", user);

    // authUser.value = user;

    toast.add({
      severity: "success",
      summary: "ارسال رمز عبور",
      detail: "رمز عبور با موفقیت ارسال شد",
      life: 3000,
    });
  } catch (error) {
    console.log("error", error);

    // errors.value = Object.values(error?.data?.data).flat();
  } finally {
    loading.value = false;
  }
}

async function verifyotp() {
  if (!validateFormSms()) {
    return; // Exit if validation fails
  }
  try {
    loading.value = true;
    const user = await $fetch("/api/auth/verifyotp", {
      method: "POST",
      body: {
        cellphone: cellphonesms.value,
        otp_code: otpcode.value,
      },
    });
    // this.errors.value = null;
    console.log("data", user);

    authUser.value = user;

    toast.add({
      severity: "success",
      summary: "ورود موفق",
      detail: "ورود به سایت با موفقیت انجام شد",
      life: 3000,
    });
    return navigateTo("/");
  } catch (error) {
    console.log("error otp", error);

    errors.value = Object.values(error?.data).flat();
  } finally {
    loading.value = false;
  }
}

async function register() {
  if (!validateForm()) {
    return; // Exit if validation fails
  }
  try {
    loading.value = true;
    const user = await $fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });
    // this.errors.value = null;
    console.log("user", user);

    authUser.value = user;

    toast.add({
      severity: "success",
      summary: "ثبت نام",
      detail: "ثبت نام با موفقیت انجام شد",
      life: 3000,
    });
    return navigateTo("/");
  } catch (error) {
    console.log("error", error);

    errors.value = Object.values(error?.data?.data).flat();
  } finally {
    loading.value = false;
  }
}
onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>
