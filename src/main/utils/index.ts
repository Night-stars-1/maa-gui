import { app, BrowserWindow } from 'electron'
import toast from './toast'
import logger from './logger'
import path from 'path'

const BASE_RES_PATH = path.join(app.getPath('userData'), import.meta.env.VITE_MAIN_UNRES_OUT_DIR)

function registerUtils(win: BrowserWindow) {
  toast(win)
  logger(win)
}

export default (win: BrowserWindow) => {
  registerUtils(win)
}

export { BASE_RES_PATH }
