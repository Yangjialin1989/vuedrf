import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import App from './App.vue'
import router from './router'




const app = createApp(App)
app.use(ElementPlus)
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app.use(router)
app.mount('#app')
