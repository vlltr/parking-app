import { createRouter, createWebHistory } from 'vue-router'
import { guest, auth } from '../middleware'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: import('../views/Auth/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: import('../views/Auth/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile.edit',
      beforeEnter: auth,
      component: import('../views/Profile/EditView.vue')
    },
    {
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: import('../views/Vehicles/IndexView.vue')
    }
  ]
})

export default router
