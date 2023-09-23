import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import Button from 'primevue/button';
import { useUserStore } from './stores/user';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { PocketBaseService } from './service/pocketBaseService';
import { useLinkStore } from './stores/links';

const app = createApp(App);

app.component('PButton', Button);
app.use(ElementPlus);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.beforeEach(async (to, _, next) => {
  const isUserLoggedIn = useUserStore().user.isLoggedIn;
  if (to.path !== '/login' && !isUserLoggedIn) {
    next({ path: '/login' });
  } else if (to.path === '/login' && isUserLoggedIn) {
    next({ path: '/' });
  } else {
    next();
  }
});

const userStore = useUserStore();
const linkStore = useLinkStore();
userStore.$subscribe((_, state) => {
  if (!state.user.isLoggedIn) {
    router.push('/login');
  } else {
    linkStore.getLinksFromBackend();
    router.push('/');
  }
});

const pb = new PocketBaseService();
userStore.setLoginStats(pb.IsUserLoggedIn());

app.use(router);
app.mount('#app');
