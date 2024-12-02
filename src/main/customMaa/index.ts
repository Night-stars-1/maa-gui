/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 15:07:30
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-02 15:37:33
 */
import * as maa from '@nekosu/maa-node'

/**
 * 自定义的Param参数
 * 用于将任务重定向到自定义代码上
 * 一般情况下不建议这么做，除非你不想同时更改流水线文件
 */
const customParam = {}

function registerCustom(res: maa.Resource) {
  // Object.assign(customParam, (res) => {
  //   return {
  //     识别并点击确认图标: {
  //       next: ['我的自定义任务']
  //     }
  //   }
  // })
  console.log('注册自定义行为')
  // res.register_custom_recognizer('MyReco', MyReco)
}

export { registerCustom, customParam }
