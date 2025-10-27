<template>
  <div class="forten-auth font-sans text-gray-100 bg-[#0a1325] min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1325] via-[#0f2040] to-[#0a1325] opacity-95"></div>

    <div class="relative z-10 glass-card p-10 w-full max-w-md text-center rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <h1 class="text-3xl font-bold text-white mb-6 tracking-wide">
        <span class="text-[#00c6ae]">Forten</span> Account
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
      <div v-if="errors.length" class="alert mb-4 text-red-400 text-sm text-left">
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
        <Button
          label="Sign In"
          icon="pi pi-sign-in"
          class="forten-btn w-full"
          :loading="loading"
          @click="handleLogin"
        />
        <nuxt-link to="/forgotpassword" class="text-[#00c6ae] text-sm hover:underline block mt-4">
          Forgot your password?
        </nuxt-link>
      </div>

      <!-- REGISTER FORM -->
      <div v-if="activeTab === 'register'" class="space-y-4">
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
        <Button
          label="Create Account"
          icon="pi pi-user-plus"
          class="forten-btn w-full"
          :loading="loading"
          @click="handleRegister"
        />
      </div>
    </div>

    <Toast class="z-50" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'

definePageMeta({
  middleware: 'guest',
})

const activeTab = ref('login')
const loading = ref(false)
const errors = ref([])
const toast = useToast()
const { authUser } = useAuth()

// === Data ===
const loginData = reactive({ email: '', password: '' })
const registerData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// === Validators ===
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// === LOGIN ===
async function handleLogin() {
  errors.value = []
  if (!isValidEmail(loginData.email)) errors.value.push('Enter a valid email.')
  if (loginData.password.length < 6)
    errors.value.push('Password must be at least 6 characters.')
  if (errors.value.length) return

  try {
    loading.value = true
    const res = await $fetch('/api/auth/login', { method: 'POST', body: loginData })
    authUser.value = res.user
    toast.add({
      severity: 'success',
      summary: 'Welcome back!',
      detail: 'You have signed in successfully.',
      life: 3000,
    })
    return navigateTo('/')
  } catch (err) {
    errors.value = [err?.data?.message || 'Login failed.']
  } finally {
    loading.value = false
  }
}

// === REGISTER ===
async function handleRegister() {
  errors.value = []

  if (!registerData.firstName || !registerData.lastName)
    errors.value.push('First and last name are required.')
  if (!isValidEmail(registerData.email))
    errors.value.push('Enter a valid email address.')
  if (registerData.password.length < 6)
    errors.value.push('Password must be at least 6 characters.')
  if (registerData.password !== registerData.confirmPassword)
    errors.value.push('Passwords do not match.')
  if (errors.value.length) return

  try {
    loading.value = true
    await $fetch('/api/auth/register', { method: 'POST', body: registerData })
    toast.add({
      severity: 'info',
      summary: 'Registration successful',
      detail: 'Please verify your email to activate your account.',
      life: 4000,
    })
    activeTab.value = 'login'
  } catch (err) {
    errors.value = [err?.data?.message || 'Registration failed.']
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
/* === Forten Auth Style === */
.forten-auth {
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

.forten-btn {
  background: linear-gradient(90deg, #00c6ae, #f4b000);
  border: none;
  border-radius: 50px;
  color: #0a1325;
  font-weight: 600;
  padding: 10px 0;
  transition: all 0.3s ease;
}
.forten-btn:hover {
  transform: scale(1.03);
  filter: brightness(1.1);
}

.alert {
  background: rgba(255, 0, 0, 0.1);
  border-left: 3px solid #f87171;
  padding: 10px;
  border-radius: 8px;
}

@media (max-width: 480px) {
  .glass-card {
    padding: 24px;
  }
}
</style>
