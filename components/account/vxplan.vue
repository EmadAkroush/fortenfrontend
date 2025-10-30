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
      <div
        class="kpi-card flex flex-col bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,190,0.05)] w-full max-w-sm"
      >
        <!-- آیکن و اطلاعات -->
        <div class="flex items-center gap-3 mb-3">
          <i class="mdi mdi-chart-box text-emerald-300 text-3xl"></i>
          <div>
            <div class="text-sm text-gray-400">Account</div>
            <div class="text-lg font-semibold text-emerald-200">
              FO5029 (Referral)
            </div>
            <div class="text-xs text-gray-500">Network Account</div>
          </div>
        </div>

        <!-- دکمه کپی زیر -->
        <button
          @click="copyReferral"
          class="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium px-3 py-2 rounded-lg text-sm transition active:scale-95"
        >
          <i class="mdi mdi-content-copy text-base"></i>
          Copy Referral Code
        </button>
      </div>

      <div class="kpi-card">
        <i class="mdi mdi-wallet-outline kpi-icon"></i>
        <div>
          <div class="kpi-title">Total Volume</div>
          <div class="kpi-value">${{ totalTeamVolume.toLocaleString() }}</div>
          <div class="kpi-sub">All team deposits</div>
        </div>
      </div>

      <div class="kpi-card">
        <i class="mdi mdi-account-group-outline kpi-icon"></i>
        <div>
          <div class="kpi-title">Active Members</div>
          <div class="kpi-value">{{ totalTeamCount }}</div>
          <div class="kpi-sub">Across 4 levels</div>
        </div>
      </div>

    </div>

    <!-- Chart / Org container -->
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
          :value="data"
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
              <div class="node-title">{{ node.data.title }}</div>

              <div class="node-actions">
                <button
                  class="icon-btn"
                  @click.stop="copyCode(node.data.vxCode)"
                  title="Copy VX Code"
                >
                  <i class="mdi mdi-content-copy"></i>
                </button>
                <button
                  class="icon-btn"
                  @click.stop="openNodeDetails(node)"
                  title="Details"
                >
                  <i class="mdi mdi-information-outline"></i>
                </button>
              </div>
            </div>
          </template>

          <template #default="{ node }">
            <div class="org-label">{{ node.label }}</div>
          </template>
        </OrganizationChart>
      </div>
    </div>

    <!-- ===== Referral & Activity Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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

        <ProgressBar :value="referralProgress" />
        <div class="text-xs text-gray-400 mt-2">
          Progress toward next VIP level: {{ referralProgress }}%
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
              Level 1 Bonus Received:
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(referralEarnings.level1) }}</span
              >
            </div>
            <div>
              Level 2 Total Investment:
              <span class="font-semibold text-gray-100"
                >${{ formatNumber(referralInvestments.level2) }}</span
              >
            </div>
            <div>
              Level 2 Bonus Received:
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(referralEarnings.level2) }}</span
              >
            </div>
            <div>
              Level 3 Total Investment:
              <span class="font-semibold text-gray-100"
                >${{ formatNumber(referralInvestments.level3) }}</span
              >
            </div>
            <div>
              Level 3 Bonus Received:
              <span class="font-semibold text-emerald-300"
                >${{ formatNumber(referralEarnings.level3) }}</span
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
      :closable="true"
      :style="{ width: '95%', maxWidth: '500px' }"
      class="rounded-2xl bg-[#0a1325]/80 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_30px_rgba(0,255,190,0.2)] text-gray-200"
    >
      <div v-if="selectedNode" class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col items-center text-center">
          <img
            :src="selectedNode.data.image"
            class="w-20 h-20 rounded-xl border border-emerald-400/40 shadow-[0_0_15px_rgba(0,255,190,0.2)] mb-3"
          />
          <h2 class="text-xl font-semibold text-emerald-300">
            {{ selectedNode.data.name }}
          </h2>
          <p class="text-sm text-gray-400">{{ selectedNode.data.title }}</p>
          <p class="text-xs mt-1 text-gray-500">
            CO Code:
            <span class="text-emerald-400 font-semibold">{{
              selectedNode.data.vxCode
            }}</span>
          </p>
        </div>

        <!-- Stats Section -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md"
        >
          <div class="flex flex-col items-center">
            <span class="text-xs text-gray-400">Total Members</span>
            <span class="text-lg font-semibold text-emerald-300">
              {{ selectedNode.totalMembers || 0 }}
            </span>
          </div>

          <div class="flex flex-col items-center">
            <span class="text-xs text-gray-400">Total Investment</span>
            <span class="text-lg font-semibold text-cyan-300">
              ${{ (selectedNode.totalInvestment || 0).toLocaleString() }}
            </span>
          </div>

          <div class="flex flex-col items-center">
            <span class="text-xs text-gray-400">Total Profit</span>
            <span class="text-lg font-semibold text-amber-300">
              ${{ (selectedNode.totalProfit || 0).toLocaleString() }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-3">
          <Button
            label="Copy FO Code"
            icon="mdi mdi-content-copy"
            class="p-button-outlined w-full sm:w-auto border-emerald-400 text-emerald-300 hover:bg-emerald-400/10"
            @click="copyCode(selectedNode.data.vxCode)"
          />
    
          <Button
            label="Close"
            icon="mdi mdi-close"
            class="p-button-secondary w-full sm:w-auto"
            @click="showNodeDetails = false"
          />
        </div>
      </div>
    </Dialog>


    <Toast />
  </div>
</template>

<script setup>
/* VxPlan.vue (Forten-style) 
   - Requires PrimeVue components registered globally:
     OrganizationChart, Dialog, Button, InputNumber, Toast
   - MDI icons loaded in project.
*/
import { ref, computed, onMounted } from "vue";
import OrganizationChart from "primevue/organizationchart";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Toast from "primevue/toast";

const copyCode = (code) => {
  navigator.clipboard.writeText(code);
  alert(`✅ FO Code "${code}" copied!`);
};

/* ----------- Referral & Earnings Data ----------- */
const referrals = ref({ level1: 8, level2: 21, level3: 47 });
const referralProgress = computed(() =>
  Math.min(100, Math.round((referrals.value.level1 / 15) * 100))
);
const referralLink = "https://forten.example.com/register?ref=alexjohn";

const referralInvestments = ref({
  level1: 1800,
  level2: 2500,
  level3: 4000,
});

const referralEarnings = ref({
  level1: 270,
  level2: 250,
  level3: 200,
});

const activities = ref([
  {
    icon: "mdi mdi-cash-plus",
    title: "Deposit received",
    desc: "$250 via USDT",
    time: "3h ago",
  },
  {
    icon: "mdi mdi-wallet-outline",
    title: "Auto-compound applied",
    desc: "Profit added to principal",
    time: "1d ago",
  },
  {
    icon: "mdi mdi-account-plus",
    title: "Referral joined",
    desc: "1 new Level 1 user",
    time: "2d ago",
  },
]);

function copyReferral() {
  const code = "FO5029";
  navigator.clipboard.writeText(code);
  alert(`✅ Referral code "${code}" copied!`);
}

function formatNumber(v) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

/* ---------- demo data: 4 levels ---------- */

const makeNode = (code, name, title, image) => ({
  key: code,
  type: "person",
  data: { vxCode: code, name, title, image, baseInvestment: 100 },
  children: [],
});

// build 4-level binary (1 + 2 + 4 + 8 = 15 nodes)
const root = makeNode(
  "FO5029",
  "You",
  "Your FO Account",
  "https://i.pravatar.cc/100?img=12"
);
const L1 = makeNode(
  "FO5020",
  "Leader A",
  "level 1",
  "https://i.pravatar.cc/100?img=3"
);
const R1 = makeNode(
  "FO5919",
  "Leader B",
  "level 1",
  "https://i.pravatar.cc/100?img=5"
);

// level 2 (each leader has 2)
const LA1 = makeNode(
  "FO3001",
  "User A1",
  "A1",
  "https://i.pravatar.cc/100?img=8"
);
const LA2 = makeNode(
  "FO3002",
  "User A2",
  "A2",
  "https://i.pravatar.cc/100?img=9"
);
const RB1 = makeNode(
  "FO4001",
  "User B1",
  "B1",
  "https://i.pravatar.cc/100?img=11"
);
const RB2 = makeNode(
  "FO4002",
  "User B2",
  "B2",
  "https://i.pravatar.cc/100?img=10"
);

// level 3 (each of those 4 has two children -> total 8)
const nodesLevel3 = [];
for (let i = 0; i < 8; i++) {
  nodesLevel3.push(
    makeNode(
      `VX5${100 + i}`,
      `U${i + 1}`,
      `L3`,
      `https://i.pravatar.cc/100?img=${20 + i}`
    )
  );
}

// stitch tree
LA1.children = [nodesLevel3[0], nodesLevel3[1]];
LA2.children = [nodesLevel3[2], nodesLevel3[3]];
RB1.children = [nodesLevel3[4], nodesLevel3[5]];
RB2.children = [nodesLevel3[6], nodesLevel3[7]];

L1.children = [LA1, LA2];
R1.children = [RB1, RB2];

root.children = [L1, R1];

const data = ref(root);

/* ---------- KPI / demo numeric values ---------- */
const totalTeamVolume = ref(12450);
const totalTeamCount = ref(78);
const accountBalance = ref(500);
const accountCapacity = computed(() => accountBalance.value * 10);
const usedCapacity = ref(1200);
const flushOut = ref(250);

/* ---------- zoom & pan ---------- */
const zoom = ref(1);
const translate = ref({ x: 0, y: 0 });
const isPanning = ref(false);
const panStart = ref({ x: 0, y: 0 });
const chartWrapper = ref(null);
const chartContainer = ref(null);

const zoomIn = () => (zoom.value = Math.min(zoom.value + 0.1, 3));
const zoomOut = () => (zoom.value = Math.max(zoom.value - 0.1, 0.5));
const resetZoom = () => {
  zoom.value = 1;
  translate.value = { x: 0, y: 0 };
};

const startPan = (e) => {
  isPanning.value = true;
  panStart.value = {
    x: e.clientX - translate.value.x,
    y: e.clientY - translate.value.y,
  };
};
const doPan = (e) => {
  if (!isPanning.value) return;
  translate.value = {
    x: e.clientX - panStart.value.x,
    y: e.clientY - panStart.value.y,
  };
};
const endPan = () => (isPanning.value = false);
const handleWheel = (e) => {
  zoom.value += e.deltaY * -0.001;
  zoom.value = Math.min(Math.max(zoom.value, 0.5), 3);
};

/* touch */
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
function handleTouchEnd(e) {
  if (e.touches.length < 2) touchDistance = null;
  if (e.touches.length === 0) isPanning.value = false;
}

/* ---------- Node details dialog ---------- */
const showNodeDetails = ref(false);
const selectedNode = ref(null);

function openNodeDetails(node) {
  // build realistic demo stats
  selectedNode.value = {
    ...node,
    left: Math.floor(Math.random() * 6000),
    right: Math.floor(Math.random() * 6000),
    leftCount: Math.floor(Math.random() * 30),
    rightCount: Math.floor(Math.random() * 30),
    vxc: Math.floor(Math.random() * 10),
    used: Math.floor(Math.random() * 800),
  };
  showNodeDetails.value = true;
}






/* ---------- helper ---------- */
function getNodeCapacity(node) {
  const base = node?.data?.baseInvestment || 100;
  return base * 10;
}

onMounted(() => {
  // center initial translate for better view (tweak as needed)
  translate.value = { x: 0, y: 40 };
});
</script>

<style scoped>
/* Forten dark / neon theme */
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
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", Arial;
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
