/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 17:06:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 18:40:56
 */
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@stores': resolve('src/renderer/src/plugins/pinia')
      }
    },
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: resolve('src/renderer/src/types/auto-imports.d.ts')
      }),
      Components({
        dirs: [resolve('src/renderer/src/components')],
        dts: resolve('src/renderer/src/types/components.d.ts')
      })
    ]
  }
})
