/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 22:51:22
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-09 13:52:12
 */
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import unzipper from 'unzipper'
import { ipcMain, IpcMainEvent, shell } from 'electron'
import { upResources } from './maa'
import { createToast } from './utils/toast'
import { BASE_RES_PATH } from './utils'
import { logger } from './utils/logger'

const VERSION_PATH = path.join(BASE_RES_PATH, 'version.txt')
const INTERFACE_PATH = path.join(BASE_RES_PATH, 'interface.json')
const EVENT_PATH = path.join(BASE_RES_PATH, 'event.json')

async function isUpdate(proxyUrl: string) {
  let version = '0'
  try {
    if (!import.meta.env.VITE_MAIN_VERSION) return version
    const response = await axios.get<number>(proxyUrl + import.meta.env.VITE_MAIN_VERSION)
    version = response.data.toString()
    const localVersion = fs.readFileSync(VERSION_PATH, 'utf-8').trim()
    return version !== localVersion ? version : false
  } catch (error: any) {
    logger.error(error)
    return version
  }
}

async function update(version: string, proxyUrl: string, event: IpcMainEvent) {
  try {
    createToast('准备下载资源包')
    // 发出 GET 请求，响应类型设置为 arraybuffer 以处理二进制文件
    const response = await axios.get(proxyUrl + import.meta.env.VITE_MAIN_RESOURCES, {
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        const totalLength = progressEvent.total || 1 // 防止 total 为 0
        const progress = (progressEvent.loaded / totalLength) * 100
        event.sender.send('extract-progress', progress.toFixed(2))
      }
    })
    // 将文件写入指定路径
    fs.writeFileSync(path.join(BASE_RES_PATH, 'res.zip'), response.data)
    logger.info('资源包下载成功')
    event.sender.send('res-download', `资源包下载完成`)
    extractZip(
      path.join(BASE_RES_PATH, 'res.zip'),
      import.meta.env.VITE_MAIN_UNRES_TARGET_DIR,
      version,
      event
    )
    EVENT_DATA = getEvent()
  } catch (error: any) {
    logger.info(error.code)
    logger.error('下载资源包时发生错误:', error.message)
    switch (error.code) {
      case 'ENOTFOUND':
        createToast(`网络异常，请设置代理`)
        break
      default:
        createToast(`下载资源包时发生错误`)
        break
    }
  }
}

function extractZip(zipPath: string, targetDir: string, version: string, event: IpcMainEvent) {
  let totalFiles = 0
  let extractedFiles = 0

  fs.mkdirSync(BASE_RES_PATH, { recursive: true })
  try {
    fs.rmSync(path.join(BASE_RES_PATH, 'image'), { recursive: true, force: true })
    logger.info(`文件夹 ${path.join(BASE_RES_PATH, 'image')} 删除成功`)
  } catch (err) {
    logger.error(`删除文件夹时出错: ${err}`)
  }
  try {
    fs.rmSync(path.join(BASE_RES_PATH, 'pipeline'), { recursive: true, force: true })
    logger.info(`文件夹 ${path.join(BASE_RES_PATH, 'pipeline')} 删除成功`)
  } catch (err) {
    logger.error(`删除文件夹时出错: ${err}`)
  }

  // 统计 zip 文件中的总文件数
  fs.createReadStream(zipPath)
    .pipe(unzipper.Parse())
    .on('entry', (entry) => {
      if (entry.path.startsWith(targetDir) || entry.path.includes('interface.json')) {
        totalFiles++
      }
      entry.autodrain() // 只是统计，不实际处理条目
    })
    .on('close', () => {
      // 开始正式解压
      fs.createReadStream(zipPath)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          // 只处理位于目标文件夹的文件
          if (entry.path === import.meta.env.VITE_MAIN_UNRES_INTERFACE) {
            entry.pipe(fs.createWriteStream(INTERFACE_PATH)).on('finish', () => {
              extractedFiles++
              const progress = (extractedFiles / totalFiles) * 100
              event.sender.send('extract-progress', progress.toFixed(2))
            })
          } else if (entry.path.startsWith(targetDir)) {
            const relativePath = entry.path.replace(targetDir, '') // 去除目标文件夹前缀，使其解压到outputDir的根目录
            const filePath = path.join(BASE_RES_PATH, relativePath)

            // 目录时自动创建目录
            if (entry.type === 'Directory') {
              fs.mkdirSync(filePath, { recursive: true })
              extractedFiles++
              const progress = (extractedFiles / totalFiles) * 100
              event.sender.send('extract-progress', progress.toFixed(2))
              entry.autodrain() // 跳过处理目录流
            } else {
              fs.mkdirSync(path.dirname(filePath), { recursive: true })
              // 文件时，将其解压到指定目录
              entry.pipe(fs.createWriteStream(filePath)).on('finish', () => {
                extractedFiles++
                const progress = (extractedFiles / totalFiles) * 100
                event.sender.send('extract-progress', progress.toFixed(2))
              })
            }
          } else {
            entry.autodrain()
          }
        })
        .on('close', () => {
          if (extractedFiles) {
            fs.writeFileSync(VERSION_PATH, version)
            upResources()
          }
          event.sender.send('extract-complete', `解压完成，共解压 ${extractedFiles} 个文件`)
        })
        .on('error', (err: any) => {
          event.sender.send('extract-error', `解压失败: ${err.message}`)
        })
    })
    .on('error', (err: any) => {
      event.sender.send('extract-error', `读取 ZIP 文件失败: ${err.message}`)
    })
}

function copyOcrModel() {
  fs.cp(
    path.join('resources', 'model'),
    path.join(BASE_RES_PATH, 'model'),
    { recursive: true },
    (err) => {
      if (err) {
        logger.error('复制文件夹时出错:', err)
      }
    }
  )
}
copyOcrModel()

let EVENT_DATA: { [key: string]: string } = getEvent()
function getEvent() {
  let data: { [key: string]: string } = {}
  if (fs.existsSync(EVENT_PATH)) {
    data = JSON.parse(
      fs.readFileSync(EVENT_PATH, {
        encoding: 'utf-8'
      })
    )
  }
  return data
}
// 监听渲染进程的请求，执行解压任务
ipcMain.on('res-update', (event, version, proxyUrl) => {
  update(version, proxyUrl, event)
})

ipcMain.handle('res-is-update', (_, proxyUrl: string) => {
  return isUpdate(proxyUrl)
})

ipcMain.on('res-open-folder', () => {
  shell.openPath(BASE_RES_PATH)
})

export { BASE_RES_PATH, INTERFACE_PATH, EVENT_DATA }
