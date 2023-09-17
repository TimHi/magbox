import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'

import Button from "primevue/button"
import { useUserStore } from './stores/user'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.component('PButton', Button);
app.use(ElementPlus)
app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

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
