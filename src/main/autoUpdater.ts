/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-12 00:11:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-12 21:40:53
 */
import { autoUpdater } from 'electron-updater'
import { app, dialog } from 'electron'
import path from 'path'

function checkUpdate(proxyUrl: string) {
  autoUpdater.requestHeaders = {
    proxyUrl
  }
  autoUpdater.checkForUpdates()
}

export default () => {
  if (import.meta.env.DEV) {
    Object.defineProperty(app, 'isPackaged', {
      get() {
        return true
      }
    })
    autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
    // autoUpdater.checkForUpdatesAndNotify()
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.on('checking-for-update', () => {
    console.log('检查更新中...')
  })

  autoUpdater.on('update-available', (info) => {
    // 当有新版本可用时，弹窗提示用户
    dialog
      .showMessageBox({
        type: 'info',
        title: '新版本可用',
        message: '有一个可用的新版本，要更新吗',
        buttons: ['是', '否']
      })
      .then((result) => {
        if (result.response === 0) {
          // 用户选择更新，触发下载和安装
          autoUpdater.downloadUpdate()
        }
      })
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
    dialog
      .showMessageBox({
        type: 'info',
        title: '更新下载完成',
        message: '点击确定重启获取最新内容',
        buttons: ['确定']
      })
      .then(() => {
        // 调用 quitAndInstall 来安装更新
        autoUpdater.quitAndInstall()
      })
  })
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(JSON.stringify(progressObj))
  })
}

export { checkUpdate }
