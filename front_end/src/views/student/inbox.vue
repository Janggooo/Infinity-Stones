#This is the Inbox page

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../../components/header.vue';

const router = useRouter();

const notifications = [
  {
    title: 'Registration is Now Open!',
    body: 'Intramurals 2026 student registration is officially open. Head to the Events tab to browse categories and sign up for your chosen sports and activities. Slots are limited — register early to secure your spot!',
    time: 'Today, 8:00 AM',
    from: 'Intramurals Committee',
    sub: 'Intramurals 2026 signups are now live',
  },
];

const activeIndex = ref(0);

const activeNotif = computed(() => notifications[activeIndex.value]);

function selectNotif(idx) {
  activeIndex.value = idx;
}

function goBack() {
  router.push({ name: 'menu' });
}

function goToRegister() {
  router.push({ name: 'register' });
}

function handleAvatarClick() {
  // TODO: open drawer once Drawer.vue is built
}
</script>

<template>
  <div id="page-inbox" class="page">
    <Header @avatar-click="handleAvatarClick" />

    <div class="page-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h2>Inbox</h2>
    </div>

    <div class="inbox-layout">
      <div class="inbox-sidebar">
        <h3>Notifications</h3>
        <div v-for="(n, idx) in notifications" :key="idx" class="notif-item" :class="{ active: idx === activeIndex }"
          @click="selectNotif(idx)">
          <div class="notif-title">
            <span class="notif-dot"></span>{{ n.title }}
          </div>
          <div class="notif-sub">{{ n.sub }}</div>
          <div class="notif-time">{{ n.time }}</div>
        </div>
      </div>

      <div class="inbox-main">
        <div class="msg-card">
          <h4>{{ activeNotif.title }}</h4>
          <p>{{ activeNotif.body }}</p>
          <div class="msg-meta">
            From: <strong>{{ activeNotif.from }}</strong> &nbsp;·&nbsp;
            {{ activeNotif.time }}
          </div>
        </div>
        <div class="mt-16">
          <button class="btn-sm" @click="goToRegister">Register Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
}

#page-inbox {
  background: linear-gradient(160deg, #0d0f2b 0%, #0e1035 100%);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.back-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.back-btn:hover {
  background: #2d2fa8;
  border-color: #2d2fa8;
}

.page-header h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
}

.inbox-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.inbox-sidebar {
  width: 280px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  padding: 16px 0;
  flex-shrink: 0;
}

.inbox-sidebar h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0 16px 12px;
  margin-bottom: 4px;
}

.notif-item {
  padding: 12px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.notif-item:hover,
.notif-item.active {
  background: rgba(255, 255, 255, 0.06);
  border-left-color: #5b8cff;
}

.notif-item .notif-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 3px;
}

.notif-item .notif-sub {
  font-size: 11px;
  color: #9ea3c8;
}

.notif-item .notif-time {
  font-size: 10px;
  color: #9ea3c8;
  margin-top: 4px;
}

.notif-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00c9b1;
  display: inline-block;
  margin-right: 6px;
}

.inbox-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.inbox-main .msg-card {
  background: #1a1f5e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
}

.inbox-main .msg-card h4 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.inbox-main .msg-card p {
  font-size: 13px;
  color: #9ea3c8;
  line-height: 1.6;
}

.inbox-main .msg-meta {
  font-size: 11px;
  color: #9ea3c8;
  margin-top: 10px;
}

.btn-sm {
  background: #2d2fa8;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sm:hover {
  background: #4b4fd9;
}

.mt-16 {
  margin-top: 16px;
}

@media (max-width: 640px) {
  .inbox-layout {
    flex-direction: column;
  }

  .inbox-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>