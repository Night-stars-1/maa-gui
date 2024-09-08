/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 12:54:01
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 18:55:00
 */
/*
 *Author: Night-stars-1 nujj1042633805@gmail.com
 *Date: 2024-09-06 17:06:15
 *LastEditors: Night-stars-1 nujj1042633805@gmail.com
 *LastEditTime: 2024-09-06 21:41:55
 */
import '@renderer/assets/main.css'

import { createApp } from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from '@renderer/App.vue'
import vuetify from '@renderer/plugins/vuetify'
import router from '@renderer/plugins/router'
import pinia from '@renderer/plugins/pinia'

const app = createApp(App)
app.use(AsyncComputed)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
