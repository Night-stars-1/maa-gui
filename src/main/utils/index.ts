import { BrowserWindow } from 'electron'
import toast from './toast'
import logger from './logger'

function registerUtils(win: BrowserWindow) {
  toast(win)
  logger(win)
}

export default (win: BrowserWindow) => {
  registerUtils(win)
}
