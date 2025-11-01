<template>
  <div
    class="finalxcard-forgot min-h-screen bg-[#0a1325] flex flex-col items-center justify-center relative overflow-hidden px-6"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1325] via-[#0f2040] to-[#0a1325] opacity-95"></div>

    <div
      class="relative z-10 glass-card p-10 rounded-2xl w-full max-w-md shadow-[0_0_30px_rgba(0,0,0,0.5)] text-center"
    >
      <h1 class="text-3xl font-bold text-white mb-6">
        <span class="text-[#00c6ae]">Reset</span> Password
      </h1>

      <!-- Error Alert -->
      <div v-if="errors.length" class="alert mb-4 text-left">
        <ul>
          <li v-for="(e, i) in errors" :key="i">• {{ e }}</li>
        </ul>
      </div>

      <!-- Step 1 — Request Reset -->
      <div v-if="step === 1" class="space-y-4">
        <InputText
          v-model="email"
          placeholder="Enter your registered email"
          class="auth-input"
        />
        <Button
          label="Send Reset Link"
          icon="pi pi-envelope"
          class="finalxcard-btn w-full mt-4"
          :loading="loading"
          @click="requestReset"
        />
      </div>

      <!-- Step 2 — Verify Token -->
      <div v-if="step === 2" class="space-y-4">
        <InputText
          v-model="token"
          placeholder="Enter verification token"
          class="auth-input"
        />
        <Button
          label="Verify Token"
          icon="pi pi-check"
          class="finalxcard-btn w-full mt-4"
          :loading="loading"
          @click="verifyTokenHandler"
        />
        <p class="text-gray-400 text-xs mt-3">
          Didn’t receive it?
          <a href="#" class="text-[#00c6ae]" @click.prevent="resendResetLink">
            Resend Email
          </a>
        </p>
      </div>

      <!-- Step 3 — Reset Password -->
      <div v-if="step === 3" class="space-y-4">
        <InputText
          v-model="password"
          type="password"
          placeholder="New password"
          class="auth-input"
        />
        <InputText
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          class="auth-input"
        />
        <Button
          label="Reset Password"
          icon="pi pi-refresh"
          class="finalxcard-btn w-full mt-4"
          :loading="loading"
          @click="resetPassword"
        />
      </div>

      <!-- Back to login -->
      <nuxt-link
        to="/auth"
        class="block text-sm mt-6 text-[#00c6ae] hover:underline"
      >
        ← Back to login
      </nuxt-link>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

definePageMeta({ middleware: 'guest' })

const step = ref(1)
const email = ref('')
const token = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errors = ref([])
const toast = useToast()

// === Request password reset ===
async function requestReset() {
  errors.value = []
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.push('Enter a valid email address.')
    return
  }
  try {
    loading.value = true
    await $fetch('/api/auth/forgotpassword', { method: 'POST', body: { email: email.value } })
    toast.add({
      severity: 'info',
      summary: 'Email Sent',
      detail: 'We’ve sent a verification link to your email.',
      life: 4000,
    })
    step.value = 2
  } catch (err) {
    errors.value = [err?.data?.message || 'Email not found.']
  } finally {
    loading.value = false
  }
}

// === Verify token ===
async function verifyTokenHandler() {
  errors.value = []
  if (!token.value) {
    errors.value.push('Verification token is required.')
    return
  }
  try {
    loading.value = true
    await $fetch('/api/auth/verify-reset', { method: 'POST', body: { token: token.value } })
    toast.add({
      severity: 'success',
      summary: 'Token Verified',
      detail: 'Now you can set a new password.',
      life: 4000,
    })
    step.value = 3
  } catch (err) {
    errors.value = [err?.data?.message || 'Invalid or expired token.']
  } finally {
    loading.value = false
  }
}

// === Reset password ===
async function resetPassword() {
  errors.value = []
  if (password.value.length < 6)
    errors.value.push('Password must be at least 6 characters.')
  if (password.value !== confirmPassword.value)
    errors.value.push('Passwords do not match.')
  if (errors.value.length) return

  try {
    loading.value = true
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: password.value },
    })
    toast.add({
      severity: 'success',
      summary: 'Password Changed',
      detail: 'Your password has been reset successfully.',
      life: 4000,
    })
    return navigateTo('/auth')
  } catch (err) {
    errors.value = [err?.data?.message || 'Failed to reset password.']
  } finally {
    loading.value = false
  }
}

// === Resend reset link ===
async function resendResetLink() {
  try {
    await $fetch('/api/auth/resend-reset', { method: 'POST', body: { email: email.value } })
    toast.add({
      severity: 'info',
      summary: 'Resent',
      detail: 'A new reset email has been sent.',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not resend reset email.',
      life: 3000,
    })
  }
}
</script>

<style scoped lang="scss">
.finalxcard-forgot {
  color: #fff;
}

.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
}

.auth-input {
  width: 100%;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 10px 16px;
  outline: none;
  transition: 0.3s;
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
  padding: 10px;
  transition: all 0.3s;
}
.finalxcard-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.alert {
  background: rgba(255, 0, 0, 0.1);
  border-left: 3px solid #f87171;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

@media (max-width: 480px) {
  .glass-card {
    padding: 24px;
  }
}
</style>
