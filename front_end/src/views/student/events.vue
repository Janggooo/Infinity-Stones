#This is the Eventspage

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../../../components/header.vue';

const route = useRoute();
const router = useRouter();

const sportsData = {
  outdoor: {
    title: 'Outdoor Sports',
    heroGradient: 'linear-gradient(135deg,#1A3A6B,#1e4080)',
    events: [
      { name: "Basketball (Men's)", venue: 'Gym A', slots: 20, total: 20, desc: 'Full-court 5-on-5 basketball tournament for male CCS students. Double elimination format.' },
      { name: "Basketball (Women's)", venue: 'Gym A', slots: 20, total: 20, desc: 'Full-court 5-on-5 basketball tournament for female CCS students. Double elimination format.' },
      { name: "Volleyball (Men's)", venue: 'Gym B', slots: 18, total: 18, desc: 'Indoor volleyball tournament for male CCS students. Single round-robin pool play followed by playoffs.' },
      { name: "Volleyball (Women's)", venue: 'Gym B', slots: 18, total: 18, desc: 'Indoor volleyball tournament for female CCS students. Single round-robin pool play followed by playoffs.' },
      { name: "Badminton (Men's)", venue: 'Multi-Purpose Hall', slots: 12, total: 12, desc: 'Badminton tournament for male CCS students. Single elimination format.' },
      { name: "Badminton (Women's)", venue: 'Multi-Purpose Hall', slots: 12, total: 12, desc: 'Badminton tournament for female CCS students. Single elimination format.' },
      { name: "Football (Men's)", venue: 'Football Field', slots: 22, total: 22, desc: '11-a-side football tournament for male CCS students. Group stage followed by knockout rounds.' },
      { name: "Football (Women's)", venue: 'Football Field', slots: 22, total: 22, desc: '11-a-side football tournament for female CCS students. Group stage followed by knockout rounds.' },
    ],
  },
  esports: {
    title: 'Esports',
    heroGradient: 'linear-gradient(135deg,#0f0a2e,#3a1a8a)',
    events: [
      { name: 'Valorant (5v5)', venue: 'Computer Lab A', slots: 15, total: 15, desc: 'Team-based tactical FPS. 5 players per team, best-of-3 format. Spike Rush rules apply for group stage.' },
      { name: 'Mobile Legends: Bang Bang', venue: 'Computer Lab A', slots: 30, total: 30, desc: "5v5 MOBA tournament on mobile. Draft pick format for playoffs. Bring your own device." },
      { name: 'League of Legends (5v5)', venue: 'Computer Lab B', slots: 15, total: 15, desc: "Classic 5v5 Summoner's Rift. Draft mode enabled. PC provided by the venue." },
      { name: 'Call of Duty Mobile', venue: 'Computer Lab B', slots: 30, total: 30, desc: 'Squad vs squad battle royale and multiplayer modes. Bring your own device and headset.' },
      { name: 'Tekken 8 (1v1)', venue: 'AVR Room 3', slots: 15, total: 15, desc: 'Solo fighting game tournament. Double elimination bracket. Controllers and arcade sticks allowed.' },
    ],
  },
  boardgames: {
    title: 'Board Games',
    heroGradient: 'linear-gradient(135deg,#1A4A3A,#1e8060)',
    events: [
      { name: 'Chess', venue: 'AVR Room 1', slots: 16, total: 16, desc: 'Chess tournament for CCS students. Swiss system format.' },
      { name: 'Checkers', venue: 'AVR Room 1', slots: 16, total: 16, desc: 'Standard checkers tournament in single-elimination format.' },
      { name: 'Scrabble', venue: 'AVR Room 2', slots: 16, total: 16, desc: 'English Scrabble tournament. Official OSPD dictionary used.' },
      { name: 'Game of the Generals', venue: 'AVR Room 2', slots: 16, total: 16, desc: 'Filipino strategy board game tournament in single-elimination format.' },
      { name: 'Sungka', venue: 'AVR Room 2', slots: 16, total: 16, desc: 'Traditional Filipino mancala game tournament.' },
    ],
  },
  musical: {
    title: 'Musical & Performing Arts',
    heroGradient: 'linear-gradient(135deg,#4A1A1A,#8B2020)',
    events: [
      { name: 'Battle of the Bands', venue: 'Auditorium', slots: 12, total: 12, desc: 'Bands perform original songs. Judged on musicality, stage presence, and originality.' },
      { name: 'Solo Singing', venue: 'Auditorium', slots: 10, total: 10, desc: 'Individual singing competition open to all CCS students.' },
      { name: 'Duo Singing', venue: 'Auditorium', slots: 12, total: 12, desc: 'Pair singing competition. Register with your partner.' },
      { name: 'Dance Competition', venue: 'Auditorium', slots: 25, total: 25, desc: 'Group dance showdown open to all CCS students. 5-minute performance per group.' },
      { name: 'Cheerdance', venue: 'Auditorium', slots: 50, total: 50, desc: 'Cheerdance competition open to all CCS students. Judged on choreography, stunts, and energy.' },
      { name: 'Gimmick Parade', venue: 'Campus Grounds', slots: 50, total: 50, desc: 'Parade and gimmick showcase for all CCS students. Creativity and teamwork are key.' },
    ],
  },
};

const categoryOrder = ['outdoor', 'esports', 'boardgames', 'musical'];
const categoryLabels = {
  outdoor: 'Outdoor Sports',
  esports: 'Esports',
  boardgames: 'Board Games',
  musical: 'Musical & Performing Arts',
};

function validCategory(key) {
  return categoryOrder.includes(key) ? key : 'outdoor';
}

const activeCategory = ref(validCategory(route.query.category));
const activeEventIndex = ref(0);

watch(
  () => route.query.category,
  (newVal) => {
    activeCategory.value = validCategory(newVal);
    activeEventIndex.value = 0;
  }
);

const currentCategory = computed(() => sportsData[activeCategory.value]);
const currentEvent = computed(
  () => currentCategory.value.events[activeEventIndex.value]
);

function switchCategory(key) {
  activeCategory.value = key;
  activeEventIndex.value = 0;
  router.replace({ name: 'events', query: { category: key } });
}

function selectEvent(idx) {
  activeEventIndex.value = idx;
}

function slotsFilledPct(ev) {
  return Math.round(((ev.total - ev.slots) / ev.total) * 100);
}

function goBack() {
  router.push({ name: 'menu' });
}

function goToRegister(eventName) {
  router.push({ name: 'register', query: { event: eventName } });
}

function handleAvatarClick() {
  // TODO: open drawer once Drawer.vue is built
}
</script>

<template>
  <div id="page-sports" class="page">
    <Header @avatar-click="handleAvatarClick" />

    <div class="page-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h2>{{ currentCategory.title }}</h2>
    </div>

    <div class="sport-tabs">
      <button v-for="key in categoryOrder" :key="key" :class="{ active: key === activeCategory }"
        @click="switchCategory(key)">
        {{ categoryLabels[key] }}
      </button>
    </div>

    <div class="sports-content">
      <div class="sport-hero">
        <div class="sport-hero-img" :style="{ background: currentCategory.heroGradient }"></div>
        <div class="sport-hero-body">
          <h3>{{ currentEvent.name }}</h3>
          <div class="meta-chips">
            <span class="chip">TBA</span>
            <span class="chip">{{ currentEvent.venue }}</span>
            <span class="chip teal">{{ currentEvent.slots }} slots left</span>
          </div>
          <p>{{ currentEvent.desc }}</p>
          <button class="btn-primary" @click="goToRegister(currentEvent.name)">
            Register for this Event →
          </button>
        </div>
      </div>

      <div class="section-title">All Events</div>
      <div class="events-grid">
        <div v-for="(ev, idx) in currentCategory.events" :key="ev.name" class="event-card"
          :class="{ selected: idx === activeEventIndex }" @click="selectEvent(idx)">
          <div class="event-cat">{{ activeCategory.toUpperCase() }}</div>
          <h4>{{ ev.name }}</h4>
          <p>{{ ev.desc }}</p>
          <div class="slots-row">
            <span>Slots filled</span>
            <span>{{ ev.total - ev.slots }}/{{ ev.total }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: slotsFilledPct(ev) + '%' }"></div>
          </div>
          <div class="event-footer">
            <div class="slots">
              TBA · {{ ev.venue }} · <strong>{{ ev.slots }} left</strong>
            </div>
            <button class="btn-sm" @click.stop="goToRegister(ev.name)">
              Sign Up
            </button>
          </div>
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

#page-sports {
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

.sport-tabs {
  display: flex;
  gap: 0;
  padding: 16px 20px;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.sport-tabs button {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #9ea3c8;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.sport-tabs button:first-child {
  border-radius: 8px 0 0 8px;
}

.sport-tabs button:last-child {
  border-radius: 0 8px 8px 0;
}

.sport-tabs button:not(:first-child) {
  border-left: none;
}

.sport-tabs button.active {
  background: #2d2fa8;
  border-color: #2d2fa8;
  color: #ffffff;
}

.sport-tabs button:hover:not(.active) {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.sports-content {
  padding: 20px;
  flex: 1;
}

.sport-hero {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
}

.sport-hero-img {
  width: 280px;
  min-height: 160px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

.sport-hero-body {
  padding: 24px;
}

.sport-hero-body h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.sport-hero-body p {
  color: #9ea3c8;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.meta-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.chip {
  background: rgba(91, 140, 255, 0.12);
  border: 1px solid rgba(91, 140, 255, 0.25);
  color: #5b8cff;
  border-radius: 20px;
  font-size: 11px;
  padding: 4px 12px;
}

.chip.teal {
  background: rgba(0, 201, 177, 0.12);
  border-color: rgba(0, 201, 177, 0.25);
  color: #00c9b1;
}

.btn-primary {
  background: linear-gradient(135deg, #2d2fa8, #4b4fd9);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 13px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(75, 79, 217, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(75, 79, 217, 0.55);
}

.section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 14px;
  color: #e8eaf6;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.event-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.event-card:hover,
.event-card.selected {
  border-color: #4b4fd9;
  background: rgba(75, 79, 217, 0.08);
}

.event-card:hover {
  transform: translateY(-2px);
}

.event-card .event-cat {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #00c9b1;
  font-weight: 600;
  margin-bottom: 8px;
}

.event-card h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.event-card p {
  font-size: 12px;
  color: #9ea3c8;
  line-height: 1.5;
}

.slots-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #9ea3c8;
  margin-top: 10px;
  margin-bottom: 4px;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #00c9b1;
  border-radius: 2px;
}

.event-card .event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.event-card .slots {
  font-size: 11px;
  color: #9ea3c8;
}

.event-card .slots strong {
  color: #00c9b1;
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

@media (max-width: 640px) {
  .sport-hero {
    flex-direction: column;
  }

  .sport-hero-img {
    width: 100%;
    height: 180px;
  }
}
</style>