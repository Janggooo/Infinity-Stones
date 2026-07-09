<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const router = useRouter();

const loginId = ref('');
const loginPw = ref('');
const errorMsg = ref('');
const loading = ref(false);

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatAuthError(err) {
  switch (err?.code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    default:
      return err?.message || 'Sign-in failed.';
  }
}

async function handleLogin() {
  if (!loginId.value.trim() || !loginPw.value.trim()) {
    errorMsg.value = 'Please enter your credentials.';
    return;
  }

  if (!isValidEmail(loginId.value.trim())) {
    errorMsg.value = 'Use the email address you registered with.';
    return;
  }

  errorMsg.value = '';
  loading.value = true;

  try {
    await signInWithEmailAndPassword(auth, loginId.value.trim(), loginPw.value);
    router.push('/main');
  } catch (err) {
    errorMsg.value = formatAuthError(err);
  } finally {
    loading.value = false;
  }
}

function goToSignup() {
  router.push('/signup');
}

function goToLanding() {
  router.push('/');
}
</script>

<template>
  <div id="page-login" class="page">
    <div class="auth-page">
      <div class="auth-card">
        <div class="logo-row">
          <div class="topbar-logo">ADNU</div>
          <div class="topbar-title">
            ATENEO DE NAGA UNIVERSITY<span>Intramurals 2026</span>
          </div>
        </div>
        <h2>Welcome Back</h2>
        <p class="sub">Sign in to access your intramurals dashboard.</p>

        <div class="form-group">
          <label>Email Address</label>
          <input type="email" v-model="loginId" placeholder="juan@student.adnu.edu.ph" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="loginPw" placeholder="••••••••" />
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <button class="btn-primary full-width mt-12" :disabled="loading" @click="handleLogin">
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>

        <div class="auth-link mt-12">
          Don't have an account? <a @click="goToSignup">Register here</a>
        </div>
        <div class="auth-link mt-12">
          <a @click="goToLanding">← Back to home</a>
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

.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #0d0f2b 0%, #131640 100%);
  padding: 24px;
  width: 100%;
}

.auth-card {
  background: #1a1f5e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.auth-card .logo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.topbar-logo {
  width: 42px;
  height: 36px;
  border-radius: 8px;
  background: #2d2fa8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
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
  color: #9ea3c8;
  font-size: 10px;
  font-weight: 500;
}

.auth-card h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.auth-card p.sub {
  color: #9ea3c8;
  font-size: 13px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #9ea3c8;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: border-color 0.2s;
  outline: none;
}

.form-group input:focus {
  border-color: #4b4fd9;
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

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-text {
  color: #ff6b6b;
  font-size: 12px;
  margin-bottom: 12px;
}

.full-width {
  width: 100%;
}

.mt-12 {
  margin-top: 12px;
}

.auth-link {
  font-size: 13px;
  color: #9ea3c8;
  text-align: center;
  margin-top: 16px;
}

.auth-link a {
  color: #5b8cff;
  cursor: pointer;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>

