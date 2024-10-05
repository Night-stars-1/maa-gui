/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 19:52:43
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 16:11:40
 */
import { log, logger, sendEndRecognize, sendStartRecognize } from '../utils/logger'

function handleDebug(data: DebugData) {
  const type = data.msg
  switch (type) {
    case 'Task.NextList.Starting':
      sendStartRecognize(data.detail.name, data.detail.list)
      break
    case 'Task.NextList.Failed':
      break
    case 'Task.NextList.Succeeded':
      break
    case 'Task.Recognition.Starting':
      break
    case 'Task.Recognition.Succeeded':
      sendEndRecognize(data.detail.reco_id, data.detail.name, true)
      break
    case 'Task.Recognition.Failed':
      sendEndRecognize(data.detail.reco_id, data.detail.name, false)
      break
    default:
      if (type.startsWith('Task.Debug')) return
      log(`${type} ${JSON.stringify(data.detail)}`)
      // logger.debug(`${type} ${JSON.stringify(data.detail)}`)
      break
  }
}

export { handleDebug }
