<template>
  <div class="settings-page max-w-5xl mx-auto space-y-10">
    <h2 class="text-2xl font-bold text-neon mb-2">Account Settings</h2>
    <p class="text-muted">Manage your profile, wallet, and security preferences.</p>

    <!-- Profile -->
    <div class="glass-card p-6 rounded-2xl">
      <h3 class="section-title">Profile Information</h3>
      <div class="divider"></div>

      <div class="flex flex-col md:flex-row items-center gap-8">
        <!-- Avatar -->
        <div class="flex flex-col items-center">
          <img
            :src="profile.avatar"
            class="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md mb-3"
            alt="Avatar"
          />
          <FileUpload
            mode="basic"
            chooseLabel="Upload Avatar"
            accept="image/*"
            customUpload
            @select="onAvatarUpload"
            class="upload-btn"
          />
        </div>

        <!-- Inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
          <div v-for="field in fields" :key="field.label">
            <label class="label">{{ field.label }}</label>
            <InputText
              v-model="profile[field.model]"
              :disabled="field.disabled"
              class="input w-full"
            />
          </div>

          <div class="md:col-span-2">
            <label class="label">Wallet Address</label>
            <InputText v-model="profile.wallet" class="input w-full" />
          </div>
        </div>
      </div>

      <div class="mt-6 text-right">
        <Button label="Save Profile" icon="mdi mdi-check" class="btn-primary" />
      </div>
    </div>

    <!-- Security -->
    <div class="glass-card p-6 rounded-2xl">
      <h3 class="section-title">Security</h3>
      <div class="divider"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="label">Current Password</label>
          <Password v-model="security.current" toggleMask class="input w-full" />
        </div>
        <div>
          <label class="label">New Password</label>
          <Password v-model="security.newPass" toggleMask class="input w-full" />
        </div>
        <div>
          <label class="label">Confirm Password</label>
          <Password v-model="security.confirm" toggleMask class="input w-full" />
        </div>
        <div class="flex items-center justify-between md:col-span-2">
          <span class="label">Enable 2FA for withdrawals</span>
          <InputSwitch v-model="security.twoFA" />
        </div>
      </div>

      <div class="mt-6 text-right">
        <Button
          label="Update Security"
          icon="mdi mdi-lock"
          class="btn-warning"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Card from "primevue/card"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from "primevue/button"
import InputSwitch from "primevue/inputswitch"
import FileUpload from "primevue/fileupload"

const profile = ref({
  avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+123456789",
  email: "john@example.com",
  vxCode: "FO-123456",
  wallet: "0x123456789abcdef123456789abcdef123456789",
})

const fields = [
  { label: "Username", model: "username" },
  { label: "First Name", model: "firstName" },
  { label: "Last Name", model: "lastName" },
  { label: "Phone", model: "phone" },
  { label: "Email", model: "email" },
  { label: "FO Code", model: "vxCode", disabled: true },
]

const security = ref({
  current: "",
  newPass: "",
  confirm: "",
  twoFA: false,
})

const onAvatarUpload = (event) => {
  const file = event.files[0]
  if (file) {
    profile.value.avatar = URL.createObjectURL(file)
  }
}
</script>

<style scoped>
/* 🌌 FORTEN UI THEME */
.settings-page {
  color: #dfffee;
  background: linear-gradient(180deg, #071218, #061414);
  padding: 2rem 1rem;
  font-family: "Inter", sans-serif;
}

.text-neon {
  color: #2ff1b4;
}
.text-muted {
  color: #8fb3a4;
}

/* glass card container */
.glass-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(16px);
  transition: all 0.25s ease;
}
.glass-card:hover {
  border-color: rgba(47, 241, 180, 0.2);
  box-shadow: 0 8px 32px rgba(47, 241, 180, 0.2);
}

/* labels and inputs */
.label {
  display: block;
  font-size: 0.85rem;
  color: #9fc9b7;
  margin-bottom: 4px;
}
.input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: #dfffee;
  transition: 0.25s ease;
}
.input:focus {
  border-color: #2ff1b4;
  box-shadow: 0 0 6px #2ff1b4aa;
}

/* buttons */
.btn-primary {
  background: linear-gradient(135deg, #2ff1b4, #06b6d4);
  border: none;
  color: #021510;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.25s ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 14px #2ff1b477;
}

.btn-warning {
  background: linear-gradient(135deg, #ffb347, #ff7730);
  border: none;
  color: #04100b;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.25s ease;
}
.btn-warning:hover {
  box-shadow: 0 0 14px #ffb34766;
}

/* section title */
.section-title {
  font-weight: 600;
  color: #2ff1b4;
  font-size: 1.2rem;
}
.divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0.5rem 0 1rem;
}

/* upload button */
.upload-btn {
  background: rgba(47, 241, 180, 0.1);
  border: 1px solid rgba(47, 241, 180, 0.25);
  color: #2ff1b4;
  border-radius: 8px;
}
.upload-btn:hover {
  background: rgba(47, 241, 180, 0.2);
}
</style>
