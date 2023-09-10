import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import App from './App.vue'
import AddLink from './views/AddLink.vue'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import Button from "primevue/button"
import { useUserStore } from './stores/user'

const app = createApp(App)

app.component('PButton', Button);
app.use(ElementPlus)
app.use(createPinia())
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
    routes
})

router.beforeEach(async (to, from, next) => {
    const isUserLoggedIn = useUserStore().user.isLoggedIn;
    console.log(isUserLoggedIn);
    if (to.path === from.path) {
        console.log("Skippedy skoo");
    }
    else if (to.path !== '/login' && !isUserLoggedIn) {
        console.log("Redirect to login")
        next({ path: '/login' });
    }
    else if (to.path === '/login' && isUserLoggedIn) {
        console.log("User is logged in go to home")
        next({ path: '/' });
    } else {
        console.log("Go to:");
        console.log(to);
        next();
    }
    next();
})

app.use(router)
app.mount('#app')
