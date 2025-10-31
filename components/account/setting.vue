<template>
  <div class="settings-page max-w-5xl mx-auto space-y-10">
    <h2 class="text-2xl font-bold text-neon mb-2">Account Settings</h2>
    <p class="text-muted">Manage your profile, wallet, and security preferences.</p>

    <!-- Profile -->
    <div class="glass-card p-6 rounded-2xl">
      <h3 class="section-title">Profile Information</h3>
      <div class="divider"></div>

      <div class="flex flex-col md:flex-row items-center gap-8">
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

          <!-- 🟢 Leader Code (Referral Section) -->
          <div class="md:col-span-2">
            <label class="label">Leader Code</label>
            <div class="flex gap-3 items-center">
              <InputText
                v-model="profile.leaderCode"
                placeholder="Enter Leader Code (e.g. VX12345)"
                class="input flex-1"
              />
              <Button
                label="Connect"
                icon="mdi mdi-account-check"
                class="btn-primary"
                :loading="loadingLeader"
                @click="connectLeader"
              />
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="label">Wallet Address</label>
            <InputText v-model="profile.wallet" class="input w-full" />
          </div>
        </div>
      </div>

      <div class="mt-6 text-right">
        <Button
          label="Save Profile"
          icon="mdi mdi-check"
          class="btn-primary"
          :loading="loadingSave"
          @click="saveProfile"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useAuth } from "@/composables/useAuth";

const toast = useToast();
const { authUser } = useAuth();

const loadingLeader = ref(false);
const loadingSave = ref(false);

const profile = ref({
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+123456789",
  email: "john@example.com",
  leaderCode: "",
  wallet: "0x123456789abcdef123456789abcdef123456789",
});

const fields = [
  { label: "Username", model: "username" },
  { label: "First Name", model: "firstName" },
  { label: "Last Name", model: "lastName" },
  { label: "Phone", model: "phone" },
  { label: "Email", model: "email" },
];

// 🟢 اتصال کاربر به لیدر از طریق API
const connectLeader = async () => {
  if (!profile.value.leaderCode) {
    toast.add({
      severity: "warn",
      summary: "Missing Code",
      detail: "Please enter your leader code.",
      life: 3000,
    });
    return;
  }

  try {
    loadingLeader.value = true;

    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to continue.",
        life: 3000,
      });
      return;
    }

    const res = await $fetch("/api/referrals/register", {
      method: "POST",
      body: {
        referrerCode: profile.value.leaderCode,
        newUserId: userId,
      },
    });

    toast.add({
      severity: res.success ? "success" : "warn",
      summary: res.success ? "Connected" : "Notice",
      detail: res.message || "Request processed successfully.",
      life: 4000,
    });
  } catch (err) {
    console.error("Referral error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: err?.data?.message || "Failed to connect with leader.",
      life: 4000,
    });
  } finally {
    loadingLeader.value = false;
  }
};

// 🟢 ذخیره پروفایل (API: /api/users/update)
const saveProfile = async () => {
  try {
    loadingSave.value = true;

    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to continue.",
        life: 3000,
      });
      return;
    }

    const res = await $fetch("/api/users/update", {
      method: "POST",
      body: {
        userId,
        firstName: profile.value.firstName,
        lastName: profile.value.lastName,
        phone: profile.value.phone,
        email: profile.value.email,
        wallet: profile.value.wallet,
      },
    });

    toast.add({
      severity: res.success ? "success" : "info",
      summary: "Profile Updated",
      detail: res.message || "Your profile has been saved successfully.",
      life: 4000,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: err?.data?.message || "Failed to save your profile.",
      life: 4000,
    });
  } finally {
    loadingSave.value = false;
  }
};
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
</style>
