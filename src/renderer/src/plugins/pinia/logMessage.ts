/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 19:06:43
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-08 14:31:27
 */
import { defineStore } from 'pinia'

export const useLogMessage = defineStore('logMessage', () => {
  const messageList = ref<string[]>([])
  console.log(1)
  window.api.log((_, message) => {
    messageList.value.push(message)
  })
  return { messageList }
})
