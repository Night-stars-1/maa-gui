/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 15:14:53
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-10 12:57:11
 */
import fs from 'fs'
import maa from '@nekosu/maa-node'
import { BrowserWindow, ipcMain } from 'electron'
import { registerCustom, customParam } from './customMaa'
import logger, { log } from './utils/logger'
import { handleDebug } from './customMaa/debugType'

maa.set_global_option('DebugMessage', true)
maa.set_global_option('LogDir', './logs')

let inst: maa.Instance
let win: BrowserWindow
let res: maa.Resource

async function getDevices() {
  // 查询所有Adb设备
  try {
    const devices = await maa.AdbController.find()
    if (!devices) {
      log('未找到设备')
      return []
    }
    return devices
  } catch {
    return []
  }
}

async function init(device: maa.AdbInfo) {
  // 创建控制器
  const ctrl = new maa.AdbController(device)
  ctrl.notify = (msg, detail) => {
    log(`${msg} ${detail}`)
    console.log(msg, detail)
  }
  // 连接设备
  await ctrl.post_connection()

  // 创建资源
  res = new maa.Resource()
  res.notify = (msg, detail) => {
    log(`${msg} ${detail}`)
    console.log(msg, detail)
  }
  // 加载资源
  await res.post_path('./resources/resource_picli/base')

  // 创建实例
  inst = new maa.Instance()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inst.notify = (msg: any, detail) => {
    // log(`${msg} ${detail}`)
    handleDebug({ msg, detail: JSON.parse(detail) })
    // console.log(msg, detail)
  }

  // 绑定控制器和资源
  inst.bind(ctrl)
  inst.bind(res)

  registerCustom(inst)
  return inst.inited
}

async function upRes() {
  res && (await res.post_path('./resources/resource_picli/base'))
}

async function start(task: Task[]) {
  // 检查是否正确创建
  log(`开始执行 ${inst.inited}`)

  // 执行任务
  for (const t of task) {
    const param = {}
    t.optionData?.forEach((item) => Object.assign(param, item))
    t.param && Object.assign(param, t.param)
    Object.assign(customParam, t.param)
    await inst.post_task(t.entry, param).wait()
  }
  log(`执行完毕`)
}

async function stop() {
  inst.post_stop()
}

function getInterface() {
  const data = fs.readFileSync('./resources/resource_picli/base/interface.json', {
    encoding: 'utf-8'
  })
  return data
}

function queryRecognitionDetail(recoId: maa.RecoId) {
  // const imageHandle = maa.create_image_buffer()
  // const result = maa.query_recognition_detail(recoId, imageHandle, null)
  // let image: ArrayBuffer | null = null
  // if (imageHandle) {
  //   image = maa.get_image_encoded(imageHandle)
  // }
  // const imageHandle = maa.create_image_buffer()
  const imageListHandle = maa.create_image_list_buffer()
  const result = maa.query_recognition_detail(recoId, null, imageListHandle)
  let image: ArrayBuffer | null = null
  if (imageListHandle && maa.get_image_list_size(imageListHandle) > 0) {
    image = maa.get_image_encoded(maa.get_image_list_at(imageListHandle, 0))
  }
  return { info: result, image }
}

ipcMain.on('maa-start', async (_, arg: string) => {
  if (!inst) {
    log('未初始化, 连接默认设备')
    const devices = await getDevices()
    if (devices.length === 0) {
      return
    }
    await init(devices[0])
  }
  const task: Task[] = JSON.parse(arg)
  start(task)
})

ipcMain.on('maa-stop', () => stop())

ipcMain.handle('maa-get-devices', () => getDevices())

ipcMain.handle('maa-device-load', (_, device) => init(device))

ipcMain.handle('maa-get-interface', () => getInterface())

ipcMain.handle('maa-query-recognition-detail', (_, recoId) => queryRecognitionDetail(recoId))

export default (_win: BrowserWindow) => {
  win = _win
  logger(win)
}

export { upRes }
