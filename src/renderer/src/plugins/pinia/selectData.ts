/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 18:57:55
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 19:05:13
 */
import { defineStore } from 'pinia'

export const useSelectData = defineStore('selectData', () => {
  const selectData = ref<Task[]>([])

  return { selectData }
})
