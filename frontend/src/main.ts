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
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { DialogService } from 'primevue';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    },
  },
});

app.component('PButton', Button);
app.use(ElementPlus);
app.use(DialogService);
app.use(createPinia());
app.use(mdiVue, {
  icons: mdijs
});
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

router.afterEach((to) => {
  document.title = to.name?.toString() ?? "MagBox";
});

const userStore = useUserStore();

userStore.$subscribe((_, state) => {
  if (!state.user.isLoggedIn) {
    router.push('/login');
  } else {
    router.push('/');
  }
});

const pb = new PocketBaseService();
userStore.setLoginStats(pb.IsUserLoggedIn());

app.use(router);
app.mount('#app');
