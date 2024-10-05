/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 15:10:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 16:39:48
 */
import { BrowserWindow } from 'electron'
import path from 'path'
import { createLogger, format, transports } from 'winston'
import { BASE_RES_PATH } from '.'

let win: BrowserWindow

// 创建 logger 实例
const logger = createLogger({
  level: 'info', // 日志级别
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(BASE_RES_PATH, 'logs', 'maa-gui.log') })
  ]
})

function log(message: string | string[]) {
  win.webContents.send('log-message', message)
}

function sendStartRecognize(name: string, next: string[]) {
  win.webContents.send('maa-start-recognize', name, next)
}

function sendEndRecognize(id: number, name: string, status: boolean) {
  win.webContents.send('maa-end-recognize', id, name, status)
}

export { log, sendStartRecognize, sendEndRecognize }

export default (_win: BrowserWindow) => {
  win = _win
}

export { logger }
