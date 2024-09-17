/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 12:59:24
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-15 16:14:38
 */
import type { ElectronAPI } from '@electron-toolkit/preload'
import type * as maa from '@nekosu/maa-node'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}

interface API {
  version: () => string
  start: (task: string) => void
  stop: () => void
  getDevices: () => Promise<AdbInfo[]>
  deviceLoad: (device: AdbInfo) => Promise<boolean>
  log: (
    callback: (event: Electron.IpcRendererEvent, message: string | string[]) => void
  ) => Electron.IpcRenderer
  update: (version: string, proxyUrl: string) => void
  isResUpdate: (proxyUrl: string) => Promise<string | boolean>
  getInterface: () => Promise<string>
  onStartRecognize: (
    callback: (
      event: Electron.IpcRendererEvent,
      name: DetailListToRecognize['detail']['current'],
      next: DetailListToRecognize['detail']['list']
    ) => void
  ) => Electron.IpcRenderer
  onEndRecognize: (
    callback: (
      event: Electron.IpcRendererEvent,
      id: DetailRecognitionResult['detail']['task_id'],
      /** next里的任务名称 */
      name: DetailRecognitionResult['detail']['recognition']['name'],
      status: boolean
    ) => void
  ) => Electron.IpcRenderer
  queryRecognitionDetail: (recoId: number) => Promise<{
    info: {
      name: string
      hit: boolean
      hit_box: maa.Rect
      detail_json: string
    }
    image: ArrayBuffer
  }>
  setDebug: (isDebug: boolean) => void
  openExternal: (url: string) => Promise<void>
  isGuiUpdate: (proxyUrl: string) => Promise<boolean>
  guiInstall: () => void
  guiDownload: () => void
  openPath: (path: string) => Promise<string>
  openResFolder: () => void
}
