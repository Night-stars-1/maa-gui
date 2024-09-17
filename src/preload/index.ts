/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 12:59:24
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-18 00:24:37
 */
import { contextBridge, ipcRenderer, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  start: (param: Task[]) => ipcRenderer.send('maa-start', param),
  stop: () => ipcRenderer.send('maa-stop'),
  getDevices: () => ipcRenderer.invoke('maa-get-devices'),
  deviceLoad: (device: AdbInfo) => ipcRenderer.invoke('maa-device-load', device),
  log: (callback: (event: Electron.IpcRendererEvent, message: string | string[]) => void) =>
    ipcRenderer.on('log-message', callback),
  update: (version: string, proxyUrl: string) => ipcRenderer.send('res-update', version, proxyUrl),
  isResUpdate: (proxyUrl: string) => ipcRenderer.invoke('res-is-update', proxyUrl),
  getInterface: () => ipcRenderer.invoke('maa-get-interface'),
  onStartRecognize: (
    callback: (event: Electron.IpcRendererEvent, name: string, next: string[]) => void
  ) => ipcRenderer.on('maa-start-recognize', callback),
  onEndRecognize: (
    callback: (event: Electron.IpcRendererEvent, id: number, name: string, status: boolean) => void
  ) => ipcRenderer.on('maa-end-recognize', callback),
  queryRecognitionDetail: (recoId: number) =>
    ipcRenderer.invoke('maa-query-recognition-detail', recoId),
  setDebug: (isDebug: boolean) => ipcRenderer.send('maa-debug', isDebug),
  openExternal: (url: string) => shell.openExternal(url),
  isGuiUpdate: (proxyUrl: string) => ipcRenderer.invoke('maa-gui-update', proxyUrl),
  guiInstall: () => ipcRenderer.send('maa-gui-install'),
  guiDownload: () => ipcRenderer.send('maa-gui-download'),
  openPath: (path: string) => shell.openPath(path),
  openResFolder: () => ipcRenderer.send('res-open-folder')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
