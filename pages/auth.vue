<template>
  <div
    class="finalxcard-auth font-sans text-gray-100 bg-[#0a1325] min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#0a1325] via-[#0f2040] to-[#0a1325] opacity-95"
    ></div>

    <!-- MAIN CARD -->
    <div
      class="relative z-10 glass-card p-10 w-full max-w-md text-center rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      <h1 class="text-3xl font-bold text-white mb-6 tracking-wide">
        <span class="text-[#00c6ae]">finalxcard</span> Account
      </h1>

      <!-- Tabs -->
      <div class="flex justify-around mb-8">
        <button
          :class="['tab-btn', activeTab === 'login' && 'active']"
          @click="activeTab = 'login'"
        >
          Sign In
        </button>
        <button
          :class="['tab-btn', activeTab === 'register' && 'active']"
          @click="activeTab = 'register'"
        >
          Sign Up
        </button>
      </div>

      <!-- Error Messages -->
      <div
        v-if="errors.length"
        class="alert mb-4 text-red-400 text-sm text-left"
      >
        <ul>
          <li v-for="(err, i) in errors" :key="i">• {{ err }}</li>
        </ul>
      </div>

      <!-- LOGIN FORM -->
      <div v-if="activeTab === 'login'" class="space-y-4">
        <InputText
          v-model="loginData.email"
          placeholder="Email address"
          class="auth-input"
        />
        <InputText
          v-model="loginData.password"
          type="password"
          placeholder="Password"
          class="auth-input"
        />

        <!-- در section LOGIN FORM، قبل از Button اضافه کنید: -->
        <div id="recaptcha-login" class="flex justify-center mt-2"></div>

        <Button
          label="Sign In"
          icon="pi pi-sign-in"
          class="finalxcard-btn w-full"
          :loading="loading"
          @click="handleLogin"
        />
        <nuxt-link
          to="/forgotpassword"
          class="text-[#00c6ae] text-sm hover:underline block mt-4"
        >
          Forgot your password?
        </nuxt-link>
      </div>

      <!-- REGISTER FORM -->
      <div v-if="activeTab === 'register'" class="space-y-4">
        <InputText
          v-model="registerData.username"
          placeholder="Username"
          class="auth-input"
        />
        <InputText
          v-model="registerData.firstName"
          placeholder="First name"
          class="auth-input"
        />
        <InputText
          v-model="registerData.lastName"
          placeholder="Last name"
          class="auth-input"
        />
        <InputText
          v-model="registerData.email"
          placeholder="Email address"
          class="auth-input"
        />
        <InputText
          v-model="registerData.password"
          type="password"
          placeholder="Password"
          class="auth-input"
        />
        <InputText
          v-model="registerData.confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="auth-input"
        />

        <!-- 🟢 NEW: Optional Leader Code -->
        <InputText
          v-model="registerData.referrerCode"
          placeholder="Leader Code (optional)"
          class="auth-input"
        />


        <Button
          label="Create Account"
          icon="pi pi-user-plus"
          class="finalxcard-btn w-full"
          :loading="loading"
          @click="handleRegister"
        />
      </div>
    </div>

    <!-- ✅ VERIFY EMAIL MODAL -->
    <Dialog
      v-model:visible="verifyModal"
      modal
      header="Verify Your Email"
      class="finalxcard-modal"
      :draggable="false"
      :closable="true"
    >
      <p class="text-gray-300 text-sm mb-3 text-center">
        We’ve sent a verification link to your email.<br />
        Please enter the code or token below to activate your account.
      </p>
      <InputText
        v-model="verifyToken"
        placeholder="Enter verification token"
        class="auth-input mt-3"
        style="color: black"
      />
      <Button
        label="Verify Email"
        icon="pi pi-check"
        class="finalxcard-btn w-full mt-4"
        :loading="loadingVerify"
        @click="handleVerifyEmail"
      />
      <p class="text-gray-400 text-xs text-center mt-3">
        Didn’t receive an email?
        <a href="#" class="text-[#00c6ae] hover:underline" @click="resendEmail">
          Resend Verification
        </a>
      </p>
    </Dialog>

    <Toast class="z-50" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const activeTab = ref("login");
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const verifyModal = ref(false);
const verifyToken = ref("");
const loadingVerify = ref(false);
const { authUser } = useAuth();

definePageMeta({ middleware: "guest" });

// === Data ===
const loginData = reactive({ email: "", password: "" });
const registerData = reactive({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  referrerCode: "", // 🟢 added optional leader code
});

// reCAPTCHA state
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref("");

// 🟢 Read ref query param (like ?ref=FO-991189)
onMounted(() => {
  if (route.query.ref) {
    registerData.referrerCode = route.query.ref;
  }

  // render reCAPTCHA widget when mounted (if grecaptcha is available)
  // Using site key that was previously present in your code.
  // If you want to change the key, replace the string below.
  const SITE_KEY = "6LdPcQssAAAAACXco4yhGz3xBHCMxqrk2qSxrPrY";




  const tryRender1 = () => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      // avoid double render
      if (recaptchaWidgetId.value !== null) return;

      try {
        // render the visible checkbox widget into the container
        recaptchaWidgetId.value = window.grecaptcha.render(
          "recaptcha-login",
          {
            sitekey: SITE_KEY,
            callback: (token) => {
              recaptchaToken.value = token;
            },
            "expired-callback": () => {
              recaptchaToken.value = "";
            },
            "error-callback": () => {
              recaptchaToken.value = "";
            },
          }
        );
      } catch (e) {
        // render might fail if container not in DOM yet
        console.warn("reCAPTCHA render error:", e);
      }
    } else {
      // grecaptcha not ready yet — try again shortly
      setTimeout(tryRender, 500);
    }
  };

  tryRender1();







});

// if user switches to register tab after mounted, ensure widget is rendered
watch(activeTab, (v) => {
  if (v === "register") {
    // attempt to render (if not already)
    setTimeout(() => {
      if (
        recaptchaWidgetId.value === null &&
        typeof window !== "undefined" &&
        window.grecaptcha
      ) {
        try {
          // use same SITE_KEY as above
          recaptchaWidgetId.value = window.grecaptcha.render(
            "recaptcha-register",
            {
              sitekey: "6LdPcQssAAAAACXco4yhGz3xBHCMxqrk2qSxrPrY",
              callback: (token) => {
                recaptchaToken.value = token;
              },
              "expired-callback": () => {
                recaptchaToken.value = "";
              },
              "error-callback": () => {
                recaptchaToken.value = "";
              },
            }
          );
        } catch (e) {
          // ignore
        }
      }
    }, 300);
  }
});







// === Validators ===
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// === LOGIN ===
async function handleLogin() {
  errors.value = [];
  if (!isValidEmail(loginData.email)) errors.value.push("Enter a valid email.");
  if (loginData.password.length < 6)
    errors.value.push("Password must be at least 6 characters.");
  if (errors.value.length) return;
  if (!recaptchaToken.value) {
    errors.value.push("Please complete the reCAPTCHA to continue.");
  }
  

  try {
    loading.value = true;
    // NOTE: using visible v2 reCAPTCHA only for register in this file.
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body:  { ...loginData, recaptchaToken: recaptchaToken.value },
    });
    authUser.value = res.user;
    toast.add({
      severity: "success",
      summary: "Welcome back!",
      detail: "You have signed in successfully.",
      life: 3000,
    });
    navigateTo("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (err) {
    errors.value = [err?.data?.message || "Login failed."];
  } finally {
    loading.value = false;
  }
}

// === REGISTER ===
async function handleRegister() {
  errors.value = [];
  if (!registerData.username) errors.value.push("Username is required.");
  if (!registerData.firstName || !registerData.lastName)
    errors.value.push("First and last name are required.");
  if (!isValidEmail(registerData.email))
    errors.value.push("Enter a valid email address.");
  if (registerData.password.length < 6)
    errors.value.push("Password must be at least 6 characters.");
  if (registerData.password !== registerData.confirmPassword)
    errors.value.push("Passwords do not match.");

  if (errors.value.length) return;

  try {
    loading.value = true;

    await $fetch("/api/auth/register", {
      method: "POST",
      body: { ...registerData },
    });
    toast.add({
      severity: "info",
      summary: "Registration successful",
      detail: "Check your email for a verification link or code.",
      life: 5000,
    });
    verifyModal.value = true;

    // after successful register, reset the widget & token
    if (
      typeof window !== "undefined" &&
      window.grecaptcha &&
      recaptchaWidgetId.value !== null
    ) {
      try {
        windowy.grecaptcha.reset(recaptchaWidgetId.value);
        recaptchaToken.value = "";
      } catch (e) {
        // ignore reset errors
      }
    }
  } catch (err) {
    errors.value = [err?.data?.message || "Registration failed."];
  } finally {
    loading.value = false;
  }
}

// === VERIFY EMAIL ===
async function handleVerifyEmail() {
  if (!verifyToken.value) {
    toast.add({
      severity: "warn",
      summary: "Enter Token",
      detail: "Verification code is required.",
    });
    return;
  }
  try {
    loadingVerify.value = true;
    const res = await $fetch("/api/auth/verifyemail", {
      method: "POST",
      body: { token: verifyToken.value },
    });
    toast.add({
      severity: "success",
      summary: "Email Verified",
      detail: res.message || "Your email has been verified.",
      life: 4000,
    });
    verifyModal.value = false;
    activeTab.value = "login";
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Verification Failed",
      detail: err?.data?.message || "Invalid token or expired link.",
      life: 4000,
    });
  } finally {
    loadingVerify.value = false;
  }
}

// === RESEND EMAIL ===
async function resendEmail() {
  try {
    await $fetch("/api/auth/resend-verification", {
      method: "POST",
      body: { email: registerData.email },
    });
    toast.add({
      severity: "info",
      summary: "Verification Resent",
      detail: "A new verification email has been sent.",
      life: 4000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Unable to resend verification email.",
      life: 4000,
    });
  }
}
</script>

<style scoped lang="scss">
.finalxcard-auth {
  background: #0a1325;
  color: #fff;
}

.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
}

.tab-btn {
  flex: 1;
  padding: 10px 0;
  border: none;
  background: transparent;
  color: #aaa;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 2px solid transparent;
}
.tab-btn.active {
  color: #00c6ae;
  border-color: #00c6ae;
}
.tab-btn:hover {
  color: #f4b000;
}

.auth-input {
  width: 100%;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 10px 16px;
  outline: none;
  transition: all 0.3s ease;
}
.auth-input:focus {
  border-color: #00c6ae;
  background: rgba(255, 255, 255, 0.1);
}

.finalxcard-btn {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
  border: none;
  border-radius: 50px;
  color: #0a1325;
  font-weight: 600;
  padding: 10px 0;
  transition: all 0.3s ease;
}
.finalxcard-btn:hover {
  transform: scale(1.03);
  filter: brightness(1.1);
}

.alert {
  background: rgba(255, 0, 0, 0.1);
  border-left: 3px solid #f87171;
  padding: 10px;
  border-radius: 8px;
}

:deep(.p-dialog) {
  background: rgba(20, 30, 50, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(0, 198, 174, 0.2);
}
:deep(.p-dialog-header) {
  color: #00c6ae !important;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

@media (max-width: 480px) {
  .glass-card {
    padding: 24px;
  }
}
</style>
