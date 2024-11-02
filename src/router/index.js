import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import UserCreateView from '@/views/UserCreateView.vue'
import { supabase } from '@/supabase'

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: UserDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/create-user',
    name: 'create-user',
    component: UserCreateView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

async function isAuthenticated() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) return false
    return !!data.user.id
  } catch (error) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  const userAuthenticated = await isAuthenticated()

  if (to.matched.some((record) => record.meta.requiresAuth) && !userAuthenticated)
    next({ name: 'login' })
  else next()
})

export default router
