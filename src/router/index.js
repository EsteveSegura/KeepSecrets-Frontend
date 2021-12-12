import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Secret from '../views/Secret.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: 'KeepSecrets',},
    component: Home
  },
  {
    path: '/secret/:id/:secretKey',
    name: 'Secret',
    meta: { title: 'KeepSecrets',},
    component: Secret
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
