import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

import router from './router'
import Button from "primevue/button"
const app = createApp(App)

app.component('PButton', Button);
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
