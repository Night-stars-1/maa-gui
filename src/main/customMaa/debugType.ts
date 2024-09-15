/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 19:52:43
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-15 16:30:31
 */
import { log, sendEndRecognize, sendStartRecognize } from '../utils/logger'

function handleDebug(data: DebugData) {
  const type = data.msg
  switch (type) {
    case 'Task.Debug.ListToRecognize':
      sendStartRecognize(data.detail.entry, data.detail.list)
      break
    case 'Task.Debug.MissAll':
      // console.log('------------------------------')
      // console.log('MissAll', detail.pre_hit_task, detail.list)
      break
    case 'Task.Debug.RecognitionResult':
      sendEndRecognize(
        data.detail.recognition.reco_id,
        data.detail.recognition.name,
        data.detail.recognition.box ? true : false
      )
      break
    default:
      if (type.startsWith('Task.Debug')) return
      log(`${type} ${JSON.stringify(data.detail)}`)
      console.log(`${type} ${JSON.stringify(data.detail)}`)
  }
}

export { handleDebug }
