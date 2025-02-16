import HomePage from '../views/HomePage.vue';
import AddLink from '../views/AddLink.vue';
import LoginPage from '../views/LoginPage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import GridPage  from '../views/GridPage.vue';


export const routes = [
  {
    path: '/',
    name: "MagBox | Home",
    component: GridPage
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
  },
  {
    path: '/grid',
    name: "MagBox | Grid",
    component: GridPage
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
