<template>
  <div class=" space-y-6  mx-auto">
    <h2 class="text-xl font-bold mb-6">Account Settings</h2>

    <!-- Profile & Avatar -->
    <Card class="shadow-md">
      <template #title>Profile Information</template>
      <template #content>
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center">
            <img
              :src="profile.avatar"
              class="w-24 h-24 rounded-full object-cover border mb-2"
              alt="Avatar"
            />
            <FileUpload
              mode="basic"
              chooseLabel="Upload Avatar"
              accept="image/*"
              customUpload
              @select="onAvatarUpload"
              class="p-button-sm"
            />
          </div>

          <!-- User Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div>
              <label class="text-sm font-medium text-gray-600">Username</label>
              <InputText v-model="profile.username" class="w-full mt-1" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">First Name</label>
              <InputText v-model="profile.firstName" class="w-full mt-1" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Last Name</label>
              <InputText v-model="profile.lastName" class="w-full mt-1" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Phone</label>
              <InputText v-model="profile.phone" class="w-full mt-1" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Email</label>
              <InputText v-model="profile.email" class="w-full mt-1" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">VX Code</label>
              <InputText v-model="profile.vxCode" class="w-full mt-1" disabled />
            </div>
            <div class="md:col-span-2">
              <label class="text-sm font-medium text-gray-600">Wallet Address</label>
              <InputText v-model="profile.wallet" class="w-full mt-1" />
            </div>
          </div>
        </div>
        <div class="mt-4 text-right">
          <Button label="Save Profile" icon="pi pi-check" class="p-button-sm" />
        </div>
      </template>
    </Card>

    <!-- Security -->
    <Card class="shadow-md">
      <template #title>Security</template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Current Password</label>
            <Password v-model="security.current" toggleMask class="w-full mt-1" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">New Password</label>
            <Password v-model="security.newPass" toggleMask class="w-full mt-1" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Confirm Password</label>
            <Password v-model="security.confirm" toggleMask class="w-full mt-1" />
          </div>
          <div class="flex items-center justify-between md:col-span-2">
            <span class="text-sm font-medium text-gray-600">Enable 2FA for withdrawals</span>
            <InputSwitch v-model="security.twoFA" />
          </div>
        </div>
        <div class="mt-4 text-right">
          <Button label="Update Security" icon="pi pi-lock" severity="warning" class="p-button-sm" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from "primevue/button"
import InputSwitch from "primevue/inputswitch"
import FileUpload from "primevue/fileupload"
import { ref } from "vue"

const profile = ref({
  avatar: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+123456789",
  email: "john@example.com",
  vxCode: "VX-123456",
  wallet: "0x123456789abcdef123456789abcdef123456789",
})

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
