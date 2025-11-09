<template>
  <div class="vxplan-page">
    <!-- Header -->
    <div class="header flex items-center justify-between mb-6">
      <div>
        <h1 class="title">Team Overview</h1>
        <p class="subtitle">
          Monitor your 4-level Network and growth potential
        </p>
      </div>

      <div class="actions flex flex-col sm:flex-row items-center gap-3">
        <div class="flex-row">
          <Button
            icon="mdi mdi-magnify-minus"
            class="p-button-rounded p-button-text"
            @click="zoomOut"
          />
          <Button
            icon="mdi mdi-magnify-plus"
            class="p-button-rounded p-button-text"
            @click="zoomIn"
          />
          <Button
            icon="mdi mdi-restore"
            class="p-button-rounded p-button-text"
            @click="resetZoom"
          />
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid grid gap-4 mb-6">
      <!-- ✅ Referral Code Card -->
      <div
        class="kpi-card flex flex-col bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,190,0.05)] w-full max-w-sm"
      >
        <div class="flex items-center gap-3 mb-3">
          <i class="mdi mdi-account-key text-emerald-300 text-3xl"></i>
          <div>
            <div class="text-sm text-gray-400">Referral Code</div>
            <div class="text-lg font-semibold text-emerald-200">
              {{ vxCode || "Loading..." }}
            </div>
            <div class="text-xs text-gray-500">Your personal invite code</div>
          </div>
        </div>

        <button
          @click="copyReferral"
          class="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium px-3 py-2 rounded-lg text-sm transition active:scale-95"
        >
          <i class="mdi mdi-content-copy text-base"></i>
          Copy Referral Code
        </button>
      </div>

      <!-- ✅ Referral Link Card -->
      <div
        class="kpi-card flex flex-col bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,190,0.05)] w-full max-w-sm"
      >
        <div class="flex items-center gap-3 mb-3">
          <i class="mdi mdi-link-variant text-emerald-300 text-3xl"></i>
          <div>
            <div class="text-sm text-gray-400">Referral Link</div>
            <div class="text-xs text-emerald-200 break-all">
              https://finalxcard.com/register?ref={{ vxCode }}
            </div>
            <div class="text-xs text-gray-500 mt-1">
              Invite new users directly
            </div>
          </div>
        </div>

        <button
          @click="copyReferralLink"
          class="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium px-3 py-2 rounded-lg text-sm transition active:scale-95"
        >
          <i class="mdi mdi-link text-base"></i>
          Copy Referral Link
        </button>
      </div>

      <div class="kpi-card">
        <i class="mdi mdi-wallet-outline kpi-icon"></i>
        <div>
          <div class="kpi-title">Total Volume</div>
          <div class="kpi-value">${{ referralInvestments.level1 + referralInvestments.level2 + referralInvestments.level3 }}</div>
          <div class="kpi-sub">All team deposits</div>
        </div>
      </div>

      <div class="kpi-card">
        <i class="mdi mdi-account-group-outline kpi-icon"></i>
        <div>
          <div class="kpi-title">All Members</div>
          <div class="kpi-value">{{ referrals.level1 + referrals.level2 + referrals.level3}}</div>
          <div class="kpi-sub">Across all levels</div>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div
      ref="chartWrapper"
      class="org-wrapper"
      @wheel.prevent="handleWheel"
      @mousedown="startPan"
      @mousemove="doPan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        ref="chartContainer"
        class="org-inner"
        :style="{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
        }"
      >
        <OrganizationChart
          v-if="networkTree"
          :value="networkTree"
          collapsible
          selectionMode="single"
          :style="{ minWidth: '900px' }"
        >
          <template #person="{ node }">
            <div class="org-node" @click.stop="openNodeDetails(node)">
              <div class="node-top">
                <img :src="node.data.image" alt="avatar" class="node-avatar" />
                <div class="node-code">{{ node.data.vxCode }}</div>
              </div>
              <div class="node-name">{{ node.data.name }}</div>
              <div class="node-title">{{ node.data.email }}</div>
            </div>
          </template>
        </OrganizationChart>
      </div>
    </div>
   
   <!-- ===== Referral & Activity Section ===== -->
    <div class="grid  gap-6 mt-6">
      <div class="glass-card col-span-2">
        <h3 class="text-lg font-semibold text-gray-100 mb-3">
          Referral & Network
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level1 }}</div>
            <div class="ref-label">Direct (L1)</div>
          </div>
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level2 }}</div>
            <div class="ref-label">Level 2</div>
          </div>
          <div class="ref-stat">
            <div class="ref-num">{{ referrals.level3 }}</div>
            <div class="ref-label">Level 3</div>
          </div>
        </div>

        <div class="mb-3 text-sm text-gray-300">
          <div>Referral commissions: L1 15% / L2 10% / L3 5%</div>
        
        </div>

     

        <!-- ===== New Sub-Referrals Earnings Section ===== -->

        <div
          class="mt-6 p-4 rounded-lg bg-white/5 border border-emerald-400/20"
        >
          <h4 class="text-emerald-300 font-semibold mb-3">
            Referral Investment Summary
          </h4>
          <div class="text-sm text-gray-300 space-y-2">
            <div>
              Level 1 Total Investment:
              <span class="font-semibold text-gray-100"
                >${{ formatNumber(referralInvestments.level1) }}</span
              >
            </div>
       
            <div>
              Level 2 Total Investment:
              <span class="font-semibold text-gray-100"
                >${{ formatNumber(referralInvestments.level2) }}</span
              >
            </div>
          
            <div>
              Level 3 Total Investment:
              <span class="font-semibold text-gray-100"
                >${{ formatNumber(referralInvestments.level3) }}</span
              >
            </div>
          
          </div>
        </div>
      </div>
      </div>



   

    <!-- Node Details Dialog -->
    <Dialog
      v-model:visible="showNodeDetails"
      modal
      :header="selectedNode?.data?.name || 'Member Details'"
      :style="{ width: '95%', maxWidth: '500px' }"
      class="rounded-2xl bg-[#0a1325]/80 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_30px_rgba(0,255,190,0.2)] text-gray-200"
    >
      <div v-if="selectedNode" class="space-y-4">
        <p><strong>Email:</strong> {{ selectedNode.data.email }}</p>
        <p><strong>VX Code:</strong> {{ selectedNode.data.vxCode }}</p>
        <p>
          <strong>Main Balance:</strong> ${{ selectedNode.data.balances?.main }}
        </p>
        <p>
          <strong>Profit Balance:</strong> ${{
            selectedNode.data.balances?.profit
          }}
        </p>
      </div>
    </Dialog>

    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import OrganizationChart from "primevue/organizationchart";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useAuth } from "@/composables/useAuth";

const { authUser } = useAuth();
const toast = useToast();

const vxCode = ref("");
const totalReferrals = ref(0);
const totalInvested = ref(0);
const totalProfit = ref(0);
const networkTree = ref(null);

const zoom = ref(1);
const translate = ref({ x: 0, y: 0 });
const showNodeDetails = ref(false);
const selectedNode = ref(null);

// 📊 Load referral stats + tree from backend
onMounted(async () => {
  try {
    const userId = authUser.value?.user?.id;
    const [stats, tree] = await Promise.all([
      $fetch("/api/referrals/stats", {
        method: "POST",
        body: { userId },
      }),
      $fetch("/api/referrals/node", {
        method: "POST",
        body: { userId },
      }),
    ]);
    totalReferrals.value = stats.totalReferrals;
    totalInvested.value = stats.totalInvested;
    totalProfit.value = stats.totalProfit;

    networkTree.value = {
      key: authUser.value.user.id,
      type: "person",
      data: {
        name: `${authUser.value.user.firstName} ${authUser.value.user.lastName}`,
        vxCode: authUser.value.user.vxCode,
        email: authUser.value.user.email,
        image: "https://i.pravatar.cc/100?img=12",
      },
      children: tree.map((r) => ({
        key: r.id,
        type: "person",
        data: {
          name: r.name,
          email: r.email,
          vxCode: r.vxCode,
          image: "https://i.pravatar.cc/100?img=15",
          balances: r.balances,
        },
      })),
    };

    vxCode.value = authUser.value.user.vxCode;
  } catch (err) {
    console.error("Referral fetch error:", err);
    toast.add({
      severity: "error",
      summary: "Failed to load network",
      detail: err?.data?.message || "Something went wrong.",
      life: 4000,
    });
  }
});

function copyReferralLink() {
  const link = `https://finalxcard.com/auth?ref=${vxCode.value}`;
  navigator.clipboard.writeText(link);
  toast.add({
    severity: "success",
    summary: "Copied!",
    detail: `Referral link copied:\n${link}`,
    life: 4000,
  });
}

// 📎 Helpers
function formatNumber(v) {
  const english = Number(v)
    .toLocaleString("en-US", { maximumFractionDigits: 2 })
    .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728));
  return english;
}


function copyReferral() {
  navigator.clipboard.writeText(vxCode.value);
  toast.add({
    severity: "success",
    summary: "Copied!",
    detail: `Referral code ${vxCode.value} copied.`,
    life: 3000,
  });
}

function openNodeDetails(node) {
  selectedNode.value = node;
  showNodeDetails.value = true;
}

// 🖱 zoom/pan
const zoomIn = () => (zoom.value = Math.min(zoom.value + 0.1, 3));
const zoomOut = () => (zoom.value = Math.max(zoom.value - 0.1, 0.5));
const resetZoom = () => {
  zoom.value = 1;
  translate.value = { x: 0, y: 0 };
};

const isPanning = ref(false);
const panStart = ref({ x: 0, y: 0 });

function startPan(e) {
  isPanning.value = true;
  panStart.value = {
    x: e.clientX - translate.value.x,
    y: e.clientY - translate.value.y,
  };
}
function doPan(e) {
  if (!isPanning.value) return;
  translate.value = {
    x: e.clientX - panStart.value.x,
    y: e.clientY - panStart.value.y,
  };
}
function endPan() {
  isPanning.value = false;
}
function handleWheel(e) {
  zoom.value += e.deltaY * -0.001;
  zoom.value = Math.min(Math.max(zoom.value, 0.5), 3);
}

// 📱 Touch zoom/pan
let touchDistance = null;
function handleTouchStart(e) {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    touchDistance = Math.sqrt(dx * dx + dy * dy);
  } else if (e.touches.length === 1) {
    panStart.value = {
      x: e.touches[0].clientX - translate.value.x,
      y: e.touches[0].clientY - translate.value.y,
    };
    isPanning.value = true;
  }
}
function handleTouchMove(e) {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const newDist = Math.sqrt(dx * dx + dy * dy);
    if (touchDistance) {
      const scaleChange = newDist / touchDistance;
      zoom.value = Math.min(Math.max(zoom.value * scaleChange, 0.5), 3);
    }
    touchDistance = newDist;
  } else if (e.touches.length === 1 && isPanning.value) {
    translate.value = {
      x: e.touches[0].clientX - panStart.value.x,
      y: e.touches[0].clientY - panStart.value.y,
    };
  }
}
function handleTouchEnd() {
  touchDistance = null;
  isPanning.value = false;
}

// ==== Referral Stats & Earnings ====
const referrals = ref({
  level1: 0,
  level2: 0,
  level3: 0,
});

const referralEarnings = ref({
  level1: 0,
  level2: 0,
  level3: 0,
});

const referralInvestments = ref({
  level1: 0,
  level2: 0,
  level3: 0,
});

const referralProgress = ref(0);
const referralLink = ref("");

// 🧠 Load referral data from backend
async function loadReferralData() {
  try {
    const userId = authUser.value?.user?.id;
    if (!userId) return;

    // آمار شبکه (تعداد اعضا)
    const stats = await $fetch("/api/referrals/statscount", {
      method: "POST",
      body: { userId },
    });

    referrals.value = {
      level1: stats.level1Count || 0,
      level2: stats.level2Count || 0,
      level3: stats.level3Count || 0,
    };
    referralProgress.value = stats.progress || 0;
  

    // پاداش‌ها و سرمایه‌گذاری‌های لِول‌ها
    const earnings = await $fetch("/api/referrals/earnings", {
      method: "POST",
      body: { userId },
    });

    referralInvestments.value = {
      level1: earnings.level1Investment || 0,
      level2: earnings.level2Investment || 0,
      level3: earnings.level3Investment || 0,
    };


  } catch (err) {
    console.error("Referral load error:", err);
    toast.add({
      severity: "error",
      summary: "Referral data failed",
      detail: err?.data?.message || "Could not load referral stats.",
      life: 4000,
    });
  }
}

onMounted(() => {
  loadReferralData();
});

</script>
<style scoped>
/* finalxcard dark / neon theme */
.ref-stat {
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
.ref-num {
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
}
.ref-label {
  font-size: 12px;
  color: #9ca3af;
}

.vxplan-page {
  padding: 18px;
  background: linear-gradient(180deg, #071218 0%, #071a1a 100%);
  color: #dbeee6;
  min-height: 80vh;
}

/* header */
.header .title {
  font-size: 20px;
  color: #2ff1b4; /* neon green */
  font-weight: 700;
}
.header .subtitle {
  color: #98bfb4;
  margin-top: 4px;
  font-size: 13px;
}

/* kpi grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 900px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}

.glass-card {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

.kpi-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.01)
  );
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 6px 18px rgba(2, 8, 14, 0.45);
}
.kpi-icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #002;
  background: linear-gradient(135deg, #10b981, #06b6d4);
}
.kpi-title {
  font-size: 12px;
  color: #9fbdb2;
}
.kpi-value {
  font-size: 18px;
  font-weight: 700;
  color: #e6fff2;
}
.kpi-sub {
  font-size: 12px;
  color: #8ea79a;
  margin-top: 2px;
}

/* org wrapper */
.org-wrapper {
  height: 64vh;
  background: linear-gradient(
    180deg,
    rgba(7, 18, 22, 0.9),
    rgba(9, 22, 24, 0.95)
  );
  border-radius: 12px;
  padding: 18px;
  overflow: auto;
  border: 1px solid rgba(16, 185, 129, 0.06);
  position: relative;
}

/* inner transform container */
.org-inner {
  transition: transform 0.08s linear;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  min-width: 100%;
}

/* Organization node — glass style (override primevue default whites) */
.org-node {
  width: 150px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.01)
  );
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 10px 30px rgba(1, 6, 8, 0.6);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  color: #bfeee0;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.org-node:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(2, 8, 14, 0.7);
}

.node-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.node-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(16, 185, 129, 0.12);
  box-shadow: 0 4px 12px rgba(2, 8, 14, 0.5);
  background: linear-gradient(135deg, #0b6d20, #06b6d4);
}
.node-code {
  font-size: 11px;
  color: #a8cfc1;
}
.node-name {
  color: #2ff1b4;
  font-weight: 700;
  margin-top: 4px;
}
.node-title {
  font-size: 12px;
  color: #9fbdb2;
  margin-bottom: 8px;
}

/* actions inside node */
.node-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.icon-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  color: #bfeee0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  background: rgba(16, 185, 129, 0.08);
  color: #08f7a2;
}

/* dialog node details */
.node-dialog .p-dialog-content {
  background: linear-gradient(180deg, #0b1414, #061012);
  color: #dfeee6;
}
.node-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: start;
}
.node-details-grid .left {
  display: flex;
  gap: 12px;
  align-items: center;
}
.detail-avatar {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.03);
}
.detail-main .name {
  font-weight: 700;
  font-size: 18px;
  color: #dfffe9;
}
.detail-main .sub {
  color: #9fbdb2;
  margin-top: 4px;
}
.vxcode .code {
  color: #10b981;
  font-weight: 600;
}

/* stats boxes */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.stat {
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
.stat-title {
  font-size: 11px;
  color: #90b9ac;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.stat-value {
  font-weight: 700;
  color: #dfffe9;
  font-size: 16px;
  margin-bottom: 4px;
}
.stat-sub {
  font-size: 12px;
  color: #9fbdb2;
}

/* dialog actions */
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}

/* small screens */
@media (max-width: 900px) {
  .org-inner {
    padding: 20px 0;
  }
  .org-node {
    width: 130px;
    padding: 10px;
  }
  .node-dialog .p-dialog-content {
    padding: 14px;
  }
  .node-details-grid {
    grid-template-columns: 1fr;
  }
  .stats {
    grid-template-columns: 1fr;
  }
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
