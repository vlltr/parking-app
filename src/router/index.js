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
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: import('../views/Vehicles/IndexView.vue')
    }
  ]
})

export default router
