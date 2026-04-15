import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/category/:role', name: 'Category', component: () => import('../views/CategoryView.vue') },
  { path: '/project/:id', name: 'ProjectDetails', component: () => import('../views/ProjectDetails.vue') },
  { path: '/tag/:id', name: 'TagDetails', component: () => import('../views/TagView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
