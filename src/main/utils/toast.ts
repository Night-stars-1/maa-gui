/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-15 16:46:08
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-15 16:46:17
 */
import { BrowserWindow } from 'electron'

let win: BrowserWindow

function createToast(message: string) {
  win.webContents.send('main-create-toast', message)
}

export { createToast }

export default (_win: BrowserWindow) => {
  win = _win
}
