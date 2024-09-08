/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 19:52:43
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-08 21:35:39
 */
import { log, sendEndRecognize, sendStartRecognize } from '../utils/logger'

function handleDebug(data: DebugData) {
  const type = data.msg
  switch (type) {
    case 'Task.Debug.ListToRecognize':
      sendStartRecognize(data.detail.pre_hit_task, data.detail.list)
      break
    case 'Task.Debug.MissAll':
      // console.log('------------------------------')
      // console.log('MissAll', detail.pre_hit_task, detail.list)
      break
    case 'Task.Debug.RecognitionResult':
      sendEndRecognize(data.detail.recognition.id, data.detail.name, data.detail.recognition.hit)
      break
    default:
      if (type.startsWith('Task.Debug')) return
      log(`${type} ${JSON.stringify(data.detail)}`)
      console.log(`${type} ${JSON.stringify(data.detail)}`)
  }
}

export { handleDebug }
