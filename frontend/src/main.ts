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
import { PocketBaseService } from './service/pocketBaseService'
import { useLinkStore } from './stores/links'
import type { LinkModel } from './model/linkModel'


const app = createApp(App);

app.component('PButton', Button);
app.use(ElementPlus);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

router.beforeEach(async (to, from, next) => {
    const isUserLoggedIn = useUserStore().user.isLoggedIn;
    console.debug(isUserLoggedIn);
    if (to.path !== '/login' && !isUserLoggedIn) {
        next({ path: '/login' });
    }
    else if (to.path === '/login' && isUserLoggedIn) {
        next({ path: '/' });
    } else {
        next();
    }
})

const user = useUserStore();
const linkStore = useLinkStore();
const pb = new PocketBaseService();
user.setLoginStats(pb.IsUserLoggedIn());
if (user.user.isLoggedIn) {
    await linkStore.getLinksFromBackend();
}

app.use(router);
app.mount('#app');
