import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/main.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup.vue'),
    },
    {
      path: '/mod-login',
      name: 'mod-login',
      component: () => import('../views/ModeLogin.vue'),
    },
    {
      path: '/moderator',
      name: 'moderator',
      component: () => import('../views/moderator/pending.vue'),
    },
    {
      path: '/moderator/pending',
      name: 'moderator-pending',
      component: () => import('../views/moderator/pending.vue'),
    },
    {
      path: '/moderator/accepted',
      name: 'moderator-accepted',
      component: () => import('../views/moderator/accepted.vue'),
    },
    {
      path: '/moderator/rejected',
      name: 'moderator-rejected',
      component: () => import('../views/moderator/rejected.vue'),
    },
    {
      path: '/moderator/all',
      name: 'moderator-all',
      component: () => import('../views/moderator/all.vue'),
    },
    {
      path: '/main',
      name: 'menu',
      component: () => import('../views/student/menu.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('../views/student/inbox.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/student/events.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/student/register.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Wait for Firebase to report the current auth state once, then let
// every route change afterward check it synchronously against `auth.currentUser`.
let authReadyPromise = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    resolve(user)
  })
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  await authReadyPromise
  if (!auth.currentUser) {
    return { name: 'login' }
  }
  return true
})

export default router
