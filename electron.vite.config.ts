/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 17:06:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-13 17:55:41
 */
import path, { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

function setVersion() {
  const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
  const appVersion = packageJson.version

  const envPath = resolve(__dirname, '.env')
  let envContent = readFileSync(envPath, 'utf-8')

  const versionLine = `VITE_VERSION=${appVersion}\n`
  envContent = envContent.replace(/VITE_VERSION=.*/g, versionLine.trim())

  writeFileSync(envPath, envContent, 'utf-8')
}

function configureOcrModel() {
  const ocrAssetsDir = path.join('resources', 'MaaCommonAssets', 'OCR')

  // 如果没有找到 MaaCommonAssets/OCR 目录
  if (!existsSync(ocrAssetsDir)) {
    console.log('请完整克隆本仓库，不要漏掉 "--recursive"，也不要下载 zip 包！')
    process.exit(1) // 退出程序
  }

  const ocrDir = path.join(__dirname, 'resources', 'model', 'ocr')

  // 仅当 OCR 目录不存在时，复制默认的 OCR 模型
  if (!existsSync(ocrDir)) {
    mkdirSync(ocrDir, { recursive: true })
    cpSync(
      path.join(ocrAssetsDir, 'ppocr_v4', 'zh_cn'),
      ocrDir,
      { recursive: true, force: true } // recursive 确保递归复制，force 覆盖现有文件
    )
  } else {
    console.log('找到现有OCR目录，跳过默认OCR模型导入')
  }
}

setVersion()
configureOcrModel()

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
