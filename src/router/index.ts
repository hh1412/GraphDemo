import { createRouter, createWebHistory } from 'vue-router'
import GraphDemo from '../views/GraphDemo/index.vue'

const routes = [
  { path: '/', name: 'GraphDemo', component: GraphDemo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
