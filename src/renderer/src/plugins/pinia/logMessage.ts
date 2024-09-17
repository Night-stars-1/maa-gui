/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 19:06:43
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 14:36:48
 */
import { defineStore } from 'pinia'

export const useLogMessage = defineStore('logMessage', () => {
  const messageList = ref<string[]>([])

  window.api.log((_, message) => {
    if (typeof message === 'string') {
      messageList.value.push(message)
    } else {
      messageList.value = messageList.value.concat(message)
    }
  })
  return { messageList }
})
