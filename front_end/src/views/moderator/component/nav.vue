<script setup>
defineEmits(['sign-out'])
</script>

<template>
  <div class="topbar">
    <div class="topbar-brand">
      <div class="topbar-logo">ADNU</div>
      <div class="topbar-title">
        ATENEO DE NAGA UNIVERSITY
        <span>Intramurals 2026</span>
      </div>
    </div>

    <div class="topbar-nav">
      <a class="active">Applications</a>
    </div>

    <div class="topbar-actions">
      <button class="btn-secondary" @click="$emit('sign-out')">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  background: #1A1F5E;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar-logo {
  width: 42px;
  height: 36px;
  border-radius: 8px;
  background: #2D2FA8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #FFFFFF;
  flex-shrink: 0;
}

.topbar-title {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.topbar-title span {
  display: block;
  color: #9EA3C8;
  font-size: 10px;
  font-weight: 500;
}

.topbar-nav {
  display: flex;
  gap: 4px;
}

.topbar-nav a {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #9EA3C8;
  text-decoration: none;
  cursor: pointer;
  transition: all .2s;
}

.topbar-nav a:hover,
.topbar-nav a.active {
  background: #2D2FA8;
  color: #FFFFFF;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.06);
}

@media (max-width: 640px) {
  .topbar-nav {
    display: none;
  }
}
</style>