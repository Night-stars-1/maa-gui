/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 15:07:30
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-14 22:35:12
 */
import * as maa from '@nekosu/maa-node'
import eventSelect from './eventSelect'

/**
 * 自定义的Param参数
 * 用于将任务重定向到自定义代码上
 */
const customParam = {}

function registerCustom(res: maa.Resource) {
  Object.assign(customParam, eventSelect(res))
}

export { registerCustom, customParam }
