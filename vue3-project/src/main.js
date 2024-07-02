import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import store from "./store/index";
import '@/assets/css/common.css'
import '@/assets/font/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

createApp(App).use(router).use(ElementPlus).use(ElementPlusIconsVue).use(store).mount('#app')
