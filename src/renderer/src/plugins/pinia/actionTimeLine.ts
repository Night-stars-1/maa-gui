/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-10-05 16:36:04
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 16:41:14
 */
import { defineStore } from 'pinia'

export const useActionTimeLine = defineStore('actionTimeLine', () => {
  const actionTimeLine = ref<ActionTimeLineItem[]>([])

  window.api.onStartRecognize((_, name, next) => {
    const data: ActionTimeLineItem = {
      color: 'info',
      icon: 'mdi-information',
      name: name,
      next: {}
    }
    next.forEach(
      (item) =>
        (data.next[item] = {
          status: 0,
          id: 0
        })
    )
    // if (items.value.length >= 100) {
    //   items.value.shift() // 移除第一个元素
    // }
    actionTimeLine.value.push(data)
  })
  window.api.onEndRecognize((_, id, name, status) => {
    const data = actionTimeLine.value[actionTimeLine.value.length - 1].next[name]
    data.status = status ? 1 : 2
    data.id = id
    // console.log(id, name, status)
  })

  return { actionTimeLine }
})
