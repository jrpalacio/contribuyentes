import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import { supabase } from '@/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

/* router.beforeEach(async (to, from, next) => {
  const { data: response } = await supabase.auth.getUser()
  if (error) throw error 

const isLoggedIn = !!response.user.id
  console.log(response.user.id)
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'users' })
  } else {
    next()
  } 
  
}) */

router.beforeEach(async (to, from, next) => {
  const { data: response, error } = await supabase.auth.getUser()
  let isAuthenticated = null
  if (error) isAuthenticated = false
  else isAuthenticated = !!response.user.id

  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
