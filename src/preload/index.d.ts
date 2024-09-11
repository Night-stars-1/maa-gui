/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 12:59:24
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 16:58:43
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
  getDevices: () => Promise<
    ({
      name: string
    } & maa.AdbInfo)[]
  >
  deviceLoad: (device: maa.AdbInfo) => Promise<boolean>
  log: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => Electron.IpcRenderer
  upDate: (version: string, proxyUrl: string) => void
  isUpdate: (proxyUrl: string) => Promise<string | boolean>
  getInterface: () => Promise<string>
  onStartRecognize: (
    callback: (event: Electron.IpcRendererEvent, name: string, next: string[]) => void
  ) => Electron.IpcRenderer
  onEndRecognize: (
    callback: (event: Electron.IpcRendererEvent, id: number, name: string, status: boolean) => void
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
}
