/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 14:57:20
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-09 13:54:24
 */
import * as maa from '@nekosu/maa-node'
import { log } from '../utils/logger'
import { EVENT_DATA } from '../reszip'

const eventSelect: maa.CustomRecognizerCallback = async (self) => {
  const data = await self.context.run_recognition('OCR', self.image, {
    OCR: { recognition: 'OCR', expected: '', roi: [593, 113, 516, 46] }
  })
  if (!data) {
    log('未识别到内容')
    return null
  }
  const outDetail = JSON.parse(data.detail)
  if (outDetail.all.length < 1) {
    log('事件标题获取失败')
    return null
  }
  const textData = outDetail.all[0]
  const title = textData.text
  const score = textData.score
  const option = EVENT_DATA[title]
  if (!option) {
    log('未知事件')
    return null
  }
  log(`识别到${title}, 相似度: ${Math.round(score * 100)}%, 选择: ${option}`)
  const optionData = await self.context.run_recognition('OCR', self.image, {
    OCR: { recognition: 'OCR', expected: option, roi: [598, 383, 478, 217] }
  })
  if (!optionData) {
    log('事件选项识别失败')
    return null
  }
  const optionBox = optionData.box
  log(
    `识别成功, 坐标: Rect(x=${optionBox.x}, y=${optionBox.y}, w=${optionBox.width}, h=${optionBox.height})`
  )
  await self.context.tasker
    .controller!.post_click(
      Math.round(optionBox.x + optionBox.width / 2),
      Math.round(optionBox.y + optionBox.height / 2)
    )
    .wait()

  return [optionBox, '识别成功']
}

export default (res: maa.Resource): Record<string, unknown> => {
  res.register_custom_recognizer('eventSelect', eventSelect)
  return {
    advance_two: {
      next: [
        'event_select',
        'war_one',
        'cultural_relic',
        'terminal',
        'without_one',
        'abandon_one',
        'advance_one_man',
        'advance_one_women',
        'war_five',
        'upgrade_one',
        'descending_one',
        'advance_two',
        'advance_three'
      ]
    },
    event_select: {
      recognition: 'Custom',
      post_delay: 2000,
      custom_recognition: 'eventSelect',
      custom_recognition_param: {
        my_rec_key: 'my_rec_value'
      },
      next: ['predestination', 'perfect', 'keep', 'keyword', 'upgrade_one', 'choose']
    }
  }
}
