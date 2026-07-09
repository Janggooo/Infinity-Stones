<template>
  <div class="register-page">
    <Header :userInitials="initials" @avatar-click="handleAvatarClick" />

    <!-- Page header -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h2>Event Registration</h2>
    </div>

    <div class="register-body">
      <!-- Personal Information -->
      <div class="form-card">
        <h4>Personal Information</h4>
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model.trim="form.fname" placeholder="Juan" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model.trim="form.lname" placeholder="dela Cruz" />
          </div>
        </div>
        <div class="form-group">
          <label>Student ID</label>
          <input type="text" v-model.trim="form.sid" placeholder="2026-00000" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model.trim="form.email" placeholder="juan@student.adnu.edu.ph" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Department</label>
            <select v-model="form.dept">
              <option value="">Select Department</option>
              <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Year Level</label>
            <select v-model="form.year">
              <option value="">Select Year Level</option>
              <option v-for="y in yearLevels" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Choose Events -->
      <div class="form-card">
        <h4>Choose Events</h4>
        <p class="hint">
          Select all events you wish to join. Maximum of {{ maxEvents }} events per student.
        </p>
        <div class="checkbox-grid">
          <label v-for="ev in allEvents" :key="ev" class="checkbox-item"
            :class="{ checked: form.events.includes(ev), disabled: isDisabled(ev) }">
            <input type="checkbox" :value="ev" :checked="form.events.includes(ev)" :disabled="isDisabled(ev)"
              @change="toggleEvent(ev)" />
            <span>{{ ev }}</span>
          </label>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="form-card">
        <h4>Additional Information</h4>
        <div class="form-group">
          <label>Emergency Contact Name</label>
          <input type="text" v-model.trim="form.ecName" placeholder="Parent / Guardian name" />
        </div>
        <div class="form-group">
          <label>Emergency Contact Number</label>
          <input type="text" v-model.trim="form.ecNumber" placeholder="09XX XXX XXXX" />
        </div>
      </div>

      <button class="btn-primary submit-btn" @click="handleSubmit">Submit Registration</button>
    </div>

    <!-- Toast -->
    <transition name="toast-fade">
      <div class="toast" v-if="toast.show">
        <span class="toast-icon">●</span>
        <span>{{ toast.msg }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../../../components/header.vue'

const props = defineProps({
  maxEvents: { type: Number, default: 3 },
  currentUser: {
    type: Object,
    default: () => ({ fname: 'Juan', lname: 'dela Cruz' }),
  },
})

const emit = defineEmits(['navigate', 'submitted'])
const route = useRoute()
const router = useRouter()

const departments = ['IT', 'CS', 'IS', 'DIA']
const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year']

// Flat list of all events across categories, in the same order as the reference design
const allEvents = [
  "Basketball (Men's)", "Basketball (Women's)", "Volleyball (Men's)",
  "Volleyball (Women's)", "Badminton (Men's)", "Badminton (Women's)",
  "Football (Men's)", "Football (Women's)",
  'Valorant (5v5)', 'Mobile Legends: Bang Bang', 'League of Legends (5v5)',
  'Call of Duty Mobile', 'Tekken 8 (1v1)',
  'Chess', 'Checkers', 'Scrabble', 'Game of the Generals', 'Sungka',
  'Battle of the Bands', 'Solo Singing', 'Duo Singing',
  'Dance Competition', 'Cheerdance', 'Gimmick Parade',
]

const form = reactive({
  fname: '',
  lname: '',
  sid: '',
  email: '',
  dept: '',
  year: '',
  events: [],
  ecName: '',
  ecNumber: '',
})

const toast = reactive({ show: false, msg: '' })
let toastTimer = null

onMounted(() => {
  const eventName = route.query.event
  if (typeof eventName === 'string' && allEvents.includes(eventName)) {
    form.events = [eventName]
  }
})

const initials = computed(() => {
  const f = props.currentUser.fname?.charAt(0) || ''
  const l = props.currentUser.lname?.charAt(0) || ''
  return (f + l).toUpperCase()
})

function isDisabled(ev) {
  return !form.events.includes(ev) && form.events.length >= props.maxEvents
}

function toggleEvent(ev) {
  const idx = form.events.indexOf(ev)
  if (idx > -1) {
    form.events.splice(idx, 1)
  } else if (form.events.length < props.maxEvents) {
    form.events.push(ev)
  }
}

function showToast(msg) {
  toast.msg = msg
  toast.show = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.show = false), 3000)
}

function resetForm() {
  form.fname = ''
  form.lname = ''
  form.sid = ''
  form.email = ''
  form.dept = ''
  form.year = ''
  form.events = []
  form.ecName = ''
  form.ecNumber = ''
}

function handleSubmit() {
  if (!form.fname || !form.lname || !form.sid || !form.email || !form.dept || !form.year) {
    showToast('Please fill in all required fields.')
    return
  }
  if (!form.events.length) {
    showToast('Please select at least one event.')
    return
  }

  const application = {
    fname: form.fname,
    lname: form.lname,
    sid: form.sid,
    email: form.email,
    dept: form.dept,
    year: form.year,
    events: [...form.events],
    ecName: form.ecName,
    ecNumber: form.ecNumber,
    status: 'pending',
    submitted: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }

  showToast('Registration submitted!')
  emit('submitted', application)
  resetForm()
}

function goBack() {
  router.push({ name: 'events' })
}

function handleAvatarClick() {
  // TODO: open drawer once Drawer.vue is built
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

.register-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(160deg, #0D0F2B 0%, #0e1035 100%);
  color: #FFFFFF;
  min-height: 100vh;
}

/* Page header */
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
  color: #FFFFFF;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all .2s;
}

.back-btn:hover {
  background: #2D2FA8;
  border-color: #2D2FA8;
}

.page-header h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
}

/* Body */
.register-body {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.form-card {
  background: #1A1F5E;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 16px;
}

.form-card h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #5B8CFF;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-card h4::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.hint {
  font-size: 12px;
  color: #9EA3C8;
  margin-bottom: 14px;
  margin-top: -8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #9EA3C8;
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 14px;
  font-family: inherit;
  transition: border-color .2s;
  outline: none;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4B4FD9;
}

.form-group select option {
  background: #1A1F5E;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* Event checkboxes */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all .2s;
}

.checkbox-item:hover:not(.disabled),
.checkbox-item.checked {
  border-color: #4B4FD9;
  background: rgba(75, 79, 217, 0.1);
}

.checkbox-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.checkbox-item input {
  accent-color: #4B4FD9;
  cursor: pointer;
}

.checkbox-item span {
  font-size: 13px;
  cursor: pointer;
}

/* Submit */
.btn-primary {
  background: linear-gradient(135deg, #2D2FA8, #4B4FD9);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 13px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 4px 20px rgba(75, 79, 217, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(75, 79, 217, 0.55);
}

.submit-btn {
  margin-bottom: 32px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1A1F5E;
  border: 1px solid #00C9B1;
  color: #FFFFFF;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.toast-icon {
  color: #00C9B1;
  font-size: 10px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all .35s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  transform: translateY(80px);
  opacity: 0;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>