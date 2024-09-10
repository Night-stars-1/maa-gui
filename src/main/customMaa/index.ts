import * as maa from '@nekosu/maa-node'
import eventSelect from './eventSelect'

/**
 * 自定义的Param参数
 * 用于将任务重定向到自定义代码上
 */
const customParam = {}

function registerCustom(inst: maa.Instance) {
  Object.assign(customParam, eventSelect(inst))
}

export { registerCustom, customParam }
