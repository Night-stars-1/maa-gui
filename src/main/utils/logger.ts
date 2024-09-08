/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 15:10:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-08 20:58:01
 */
import { BrowserWindow } from 'electron'

let win: BrowserWindow

function log(message: string) {
  win.webContents.send('log-message', message)
}

function sendStartRecognize(name: string, next: string[]) {
  win.webContents.send('maa-start-recognize', name, next)
}

function sendEndRecognize(name: string, status: boolean) {
  win.webContents.send('maa-end-recognize', name, status)
}

export { log, sendStartRecognize, sendEndRecognize }

export default (_win: BrowserWindow) => {
  win = _win
}
