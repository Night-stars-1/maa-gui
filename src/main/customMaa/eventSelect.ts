/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 14:57:20
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 00:46:10
 */
import * as maa from '@nekosu/maa-node'
import { log } from '../utils/logger'

const DATA = {
  神秘快递: '拆开',
  科研助力: '立刻联系附近基金会的驻点询问。',
  氧气瓶: '抽！',
  画性大发: '我正好有带',
  样本搜集: '拿出采样套装进行采集',
  群山之巅: '拿出氧气瓶',
  手杖妙用: '抓起登山杖去够',
  珍贵笔记: '还好有研学笔记本',
  寒雾: '主动跟上那位器者。',
  风雪之途: '与雪景寒林图喝茶。',
  山雪之约: '前往常去的茶馆。',
  巡山雪: '到路途中去。',
  再遇寒雪: '顺势聊起山水画的事情。',
  山之形: '潮流文化集市和商场。',
  青绿争端: '安静地等待他。',
  小小风波: '去符合心境的地方',
  幻梦成景: '“非常有趣”的兴奋之情。',
  传达之声: '尽自己所能推荐。',
  神秘传闻: '寻找有人的落脚处。',
  山中之兽: '由你调查消息来源。',
  出行必备: '询问溪山行旅图的意见。',
  探索之夜: '在野外扎营。',
  山间来信: '你找错了地方？',
  浪漫收集: '去有故事的地方！',
  奇怪的画作: '找找草稿的主人吧。',
  线路规划: '请她帮忙指一个方向。',
  奇诡志异: '和他们一起聊故事。',
  游客照: '向茶叶生产画请教技巧。',
  时间与画: '关于一日山景。',
  小心脚下: '拿起来仔细观察',
  护林小屋: '询问护林员',
  杂学之用: '询问千里江山图',
  日出东山: '来到民宿的屋顶',
  解惑: '帮助回答',
  润水: '上前询问',
  游学所得: '讲旅行趣事',
  建议: '提出你的想法'
}

const eventSelect: maa.CustomRecognizer = async (ctx, _, __, image) => {
  const data = await ctx.run_recognition('OCR', image, {
    OCR: { recognition: 'OCR', expected: '', roi: [593, 113, 516, 46] }
  })
  if (!data) {
    log('未识别到内容')
    return null
  }
  const outDetail = JSON.parse(data.out_detail)
  if (outDetail.all.length < 1) {
    log('事件标题获取失败')
    return null
  }
  const textData = outDetail.all[0]
  const title = textData.text
  const score = textData.score
  const option = DATA[title]
  if (!option) {
    log('未知事件')
    return null
  }
  log(`识别到${title}, 相似度: ${Math.round(score * 100)}%, 选择: ${option}`)
  const optionData = await ctx.run_recognition('OCR', image, {
    OCR: { recognition: 'OCR', expected: option, roi: [598, 383, 478, 217] }
  })
  if (!optionData) {
    log('事件选项识别失败')
    return null
  }
  const optionBox = optionData.out_box
  log(
    `识别成功, 坐标: Rect(x=${optionBox.x}, y=${optionBox.y}, w=${optionBox.width}, h=${optionBox.height})`
  )
  await ctx.click(
    Math.round(optionBox.x + optionBox.width / 2),
    Math.round(optionBox.y + optionBox.height / 2)
  )

  return optionData
}

export default (inst: maa.Instance): maa.PipelineDecl => {
  inst.register_custom_recognizer('event_select', eventSelect)
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
      custom_recognition: 'event_select',
      custom_recognition_param: {
        my_rec_key: 'my_rec_value'
      },
      next: ['predestination', 'perfect', 'keep', 'keyword', 'upgrade_one', 'choose']
    }
  }
}
