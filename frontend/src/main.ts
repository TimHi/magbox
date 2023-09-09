import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import AddLink from './views/AddLink.vue'
import HomePage from './views/HomePage.vue'
import router from './router'
import Button from "primevue/button"

const app = createApp(App)

app.component('PButton', Button);
app.use(ElementPlus)
app.use(createPinia())
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/add',
        name: 'Add',
        component: AddLink
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
app.use(router)

app.mount('#app')
