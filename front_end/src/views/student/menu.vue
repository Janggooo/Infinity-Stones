#This is the Menu page
<script setup>
import { useRouter } from 'vue-router';
import Header from '../../../components/header.vue';


const router = useRouter();

const categories = [
  {
    key: 'outdoor',
    title: 'Outdoor Sports',
    desc: 'Basketball, volleyball, badminton and more outdoor competitions open to all CCS students.',
    tag: '8 Events',
    thumbClass: 'thumb-outdoor',
  },
  {
    key: 'esports',
    title: 'Esports',
    desc: 'Compete in Valorant, Mobile Legends, League of Legends, COD Mobile & Tekken 8.',
    tag: '5 Events',
    thumbClass: 'thumb-esports',
  },
  {
    key: 'boardgames',
    title: 'Board Games',
    desc: 'Chess, scrabble, dama and other strategic board competitions for CCS students.',
    tag: '4 Events',
    thumbClass: 'thumb-boardgames',
  },
  {
    key: 'musical',
    title: 'Musical / Performing Arts',
    desc: 'Battle of the bands, choral singing, dance competitions open to CCS students.',
    tag: '3 Events',
    thumbClass: 'thumb-musical',
  },
];

function goToJoin() {
  router.push({ name: 'register' });
}

function showSports(categoryKey) {
  router.push({ name: 'events', query: { category: categoryKey } });
}

function handleAvatarClick() {
  // TODO: open drawer once Drawer.vue is built
}
</script>

<template>
  <div id="page-main" class="page">
    <Header @avatar-click="handleAvatarClick" />

    <div class="hero-banner">
      <div>
        <h2>Join the Intramurals!</h2>
        <p>
          Sign up for the CCS team. Compete, connect, and champion the College
          of Computer Studies!
        </p>
        <button class="btn-primary" @click="goToJoin">Join Here →</button>
      </div>
    </div>

    <div class="section-title">Event Categories</div>
    <div class="categories-grid">
      <div v-for="cat in categories" :key="cat.key" class="category-card" @click="showSports(cat.key)">
        <div class="thumb" :class="cat.thumbClass">
          <div class="thumb-overlay"></div>
        </div>
        <div class="cat-body">
          <h3>{{ cat.title }}</h3>
          <p>{{ cat.desc }}</p>
          <span class="cat-tag">{{ cat.tag }}</span>
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

#page-main {
  background: linear-gradient(160deg, #0d0f2b 0%, #0e1035 100%);
}

.hero-banner {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1f5e, #2d2fa8);
  padding: 36px 28px;
  margin: 20px;
  border-radius: 16px;
}

.hero-banner::after {
  content: '';
  position: absolute;
  right: -40px;
  top: -40px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
}

.hero-banner h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-banner p {
  color: #e8eaf6;
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.85;
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
  padding: 0 24px;
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 0 20px 20px;
}

.category-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: #4b4fd9;
  box-shadow: 0 12px 32px rgba(75, 79, 217, 0.25);
}

.category-card .thumb {
  height: 120px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.category-card .thumb-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 15, 43, 0.85), transparent);
}

.category-card .cat-body {
  padding: 14px;
}

.category-card h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.category-card p {
  font-size: 12px;
  color: #9ea3c8;
  line-height: 1.4;
}

.category-card .cat-tag {
  display: inline-block;
  margin-top: 10px;
  background: rgba(91, 140, 255, 0.15);
  color: #5b8cff;
  border: 1px solid rgba(91, 140, 255, 0.3);
  border-radius: 20px;
  font-size: 11px;
  padding: 3px 10px;
}

.thumb-outdoor {
  background: linear-gradient(135deg, #1a3a6b, #1e4080),
    url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400') center/cover;
}

.thumb-esports {
  background: linear-gradient(135deg, #0f0a2e, #3a1a8a);
}

.thumb-boardgames {
  background: linear-gradient(135deg, #1a4a3a, #1e8060),
    url('https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=400') center/cover;
}

.thumb-musical {
  background: linear-gradient(135deg, #4a1a1a, #8b2020),
    url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400') center/cover;
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>