import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
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

    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('supabase.auth.token')
  console.log(to.matched)
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'users' })
  } else {
    next()
  }
})

export default router
