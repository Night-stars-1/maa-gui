/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-12 00:11:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-13 13:03:47
 */
import { autoUpdater } from 'electron-updater'
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

function checkUpdate(proxyUrl: string) {
  autoUpdater.requestHeaders = {
    proxyUrl
  }
  autoUpdater.checkForUpdates()
}

export default (window: BrowserWindow) => {
  if (import.meta.env.DEV) {
    Object.defineProperty(app, 'isPackaged', {
      get() {
        return true
      }
    })
    autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
    autoUpdater.checkForUpdates()
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.on('checking-for-update', () => {
    console.log('检查更新中...')
  })

  autoUpdater.on('update-available', (info) => {
    // 当有新版本可用时，弹窗提示用户
    window.webContents.send('maa-gui-update', info['body'])
  })

  ipcMain.on('maa-gui-download', () => {
    autoUpdater.downloadUpdate()
  })

  autoUpdater.on('update-not-available', (info) => {
    // 更新不可用
    console.log('更新不可用', info)
  })

  autoUpdater.on('error', (err) => {
    console.log(err)
  })

  autoUpdater.on('update-downloaded', () => {
    // 处理下载完成的情况
    window.webContents.send('maa-gui-downloaded')
  })

  ipcMain.on('maa-gui-install', () => {
    autoUpdater.quitAndInstall()
  })

  autoUpdater.on('download-progress', (progressObj) => {
    window.webContents.send('maa-gui-downloading', progressObj.percent)
  })
}

export { checkUpdate }
