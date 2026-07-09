<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
  pending: { type: Number, default: 0 },
  accepted: { type: Number, default: 0 },
  rejected: { type: Number, default: 0 },
})

const route = useRoute()

const total = () => props.pending + props.accepted + props.rejected

const tabs = [
  { label: 'Pending', to: '/moderator/pending' },
  { label: 'Accepted', to: '/moderator/accepted' },
  { label: 'Rejected', to: '/moderator/rejected' },
  { label: 'All', to: '/moderator/all' },
]
</script>

<template>
  <div class="page-header">
    <h2>Student Applications</h2>
    <span class="mod-badge">Moderator View</span>
  </div>

  <div class="mod-stats">
    <div class="mod-stat-card pending">
      <div class="num">{{ pending }}</div>
      <div class="label">Pending</div>
    </div>
    <div class="mod-stat-card accepted">
      <div class="num">{{ accepted }}</div>
      <div class="label">Accepted</div>
    </div>
    <div class="mod-stat-card rejected">
      <div class="num">{{ rejected }}</div>
      <div class="label">Rejected</div>
    </div>
    <div class="mod-stat-card">
      <div class="num">{{ total() }}</div>
      <div class="label">Total</div>
    </div>
  </div>

  <div class="sport-tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      custom
      v-slot="{ navigate, isActive }"
    >
      <button :class="{ active: isActive || route.path === tab.to }" @click="navigate">
        {{ tab.label }}
      </button>
    </router-link>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  font-family: 'Inter', sans-serif;
  color: #FFFFFF;
}

.page-header h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
}

.mod-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,201,177,0.12);
  border: 1px solid rgba(0,201,177,0.3);
  color: #00C9B1;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.mod-stats {
  display: flex;
  gap: 12px;
  padding: 20px 20px 4px;
  flex-wrap: wrap;
}

.mod-stat-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 16px 20px;
  flex: 1;
  min-width: 130px;
}

.mod-stat-card .num {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFFFFF;
}

.mod-stat-card .label {
  font-size: 11px;
  color: #9EA3C8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

.mod-stat-card.pending .num { color: #FFC107; }
.mod-stat-card.accepted .num { color: #00C9B1; }
.mod-stat-card.rejected .num { color: #FF6B6B; }

.sport-tabs {
  display: flex;
  gap: 0;
  padding: 16px 20px;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

.sport-tabs button {
  background: none;
  border: 1px solid rgba(255,255,255,0.12);
  color: #9EA3C8;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
  white-space: nowrap;
}

.sport-tabs button:first-child { border-radius: 8px 0 0 8px; }
.sport-tabs button:last-child { border-radius: 0 8px 8px 0; }
.sport-tabs button:not(:first-child) { border-left: none; }

.sport-tabs button.active {
  background: #2D2FA8;
  border-color: #2D2FA8;
  color: #FFFFFF;
}

.sport-tabs button:hover:not(.active) {
  background: rgba(255,255,255,0.06);
  color: #FFFFFF;
}
</style>