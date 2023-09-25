import { createRouter, createWebHashHistory } from 'vue-router'
import AddLink from '../views/AddLink.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'

export const routes = [
  {
    path: '/',
    name: "MagBox | Home",
    component: HomePage
  },
  {
    path: '/add',
    name: "MagBox | Add Link",
    component: AddLink
  },
  {
    path: '/login',
    name: "MagBox | Login",
    component: LoginPage
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
