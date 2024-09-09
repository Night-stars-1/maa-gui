/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 12:54:01
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-09 21:39:58
 */
import '@renderer/assets/main.scss'

import { createApp } from 'vue'
import App from '@renderer/App.vue'
import vuetify from '@renderer/plugins/vuetify'
import router from '@renderer/plugins/router'
import pinia from '@renderer/plugins/pinia'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
