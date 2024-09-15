/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 20:00:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-15 16:27:02
 */
interface DetailListToRecognize {
  msg: 'Task.Debug.ListToRecognize'
  detail: {
    task_id: number
    /** 事件名 */
    entry: string
    uuid: string
    hash: string
    current: string
    /** 该事件的next列表 */
    list: string[]
  }
}

interface DetailMissAll {
  msg: 'Task.Debug.MissAll'
  detail: {
    pre_hit_task: string
    list: string[]
  }
}

type test = {
  msg: 'Task.Debug.MissAll'
}

interface DetailRecognitionResult {
  msg: 'Task.Debug.RecognitionResult'
  detail: {
    task_id: number
    /** 事件名 */
    entry: string
    uuid: string
    hash: string
    current: string
    recognition: {
      reco_id: number
      /** next里的任务名称 */
      name: string
      /** 识别的矩阵坐标, 识别失败的时为 null? */
      box: [number, number, number, number] | null
      detail: {
        all: any[]
        /** 识别失败的时为 null */
        best: any[] | null
        filtered: any[]
      } | null
    }
  }
}

interface OtherDebug {
  msg: `Other:${string}`
  detail: any
}

type DebugData = DetailListToRecognize | DetailMissAll | DetailRecognitionResult | OtherDebug
