/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 13:14:57
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-25 12:31:25
 */
interface Interface {
  controller: Controller[]
  resource: Resource[]
  task: Task[]
  option: Option
  version: string
}

interface Controller {
  name: string
  type: string
}

interface Option {
  [key: string]: Cases
}

interface Cases {
  cases: CaseItem[]
}

interface CaseItem {
  name: string
  param?: PurpleParam
  pipeline_override: PurpleParam
}

interface PurpleParam {
  [key: string]: {
    next: string | string[]
  }
}

interface Resource {
  name: string
  path: string[]
}

interface Task {
  id: number
  name: string
  entry: string
  param?: PurpleParam
  option?: string[]
  optionData?: PurpleParam[]
}
