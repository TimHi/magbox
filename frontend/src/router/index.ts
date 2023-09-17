import { createRouter, createWebHashHistory } from 'vue-router'
import AddLink from '../views/AddLink.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/add',
    component: AddLink
  },
  {
    path: '/login',
    component: LoginPage
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
