/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 20:00:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 15:33:06
 */
interface NextListStarting {
  msg: 'Task.NextList.Starting'
  detail: {
    task_id: number
    /** 当前事件名 */
    name: string
    /** 该事件的next列表 */
    list: string[]
  }
}
interface NextListSucceeded {
  msg: 'Task.NextList.Succeeded'
  detail: {
    task_id: number
    /** 当前事件名 */
    name: string
    /** 该事件的next列表 */
    list: string[]
  }
}
interface NextListFailed {
  msg: 'Task.NextList.Failed'
  detail: {
    task_id: number
    /** 当前事件名 */
    name: string
    /** 该事件的next列表 */
    list: string[]
  }
}

interface RecognitionStarting {
  msg: 'Task.Recognition.Starting'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}
interface RecognitionSucceeded {
  msg: 'Task.Recognition.Succeeded'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}
interface RecognitionFailed {
  msg: 'Task.Recognition.Failed'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}

interface ActionStarting {
  msg: 'Task.Action.Starting'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}
interface ActionSucceeded {
  msg: 'Task.Action.Succeeded'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}
interface ActionFailed {
  msg: 'Task.Action.Failed'
  detail: {
    /** 当前任务名 */
    name: string
    reco_id: number
    task_id: number
  }
}

interface OtherDebug {
  msg: `Other:${string}`
  detail: any
}

type DebugData =
  | NextListStarting
  | NextListSucceeded
  | NextListFailed
  | RecognitionStarting
  | RecognitionSucceeded
  | RecognitionFailed
  | ActionStarting
  | ActionSucceeded
  | ActionFailed
  | OtherDebug
