/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-11 14:30:45
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 14:33:35
 */
import { defineStore } from 'pinia'

export const useShowImage = defineStore('showImage', () => {
  const isOpenImage = ref(false)
  const src = ref('')

  function showImage(url: string) {
    isOpenImage.value = true
    src.value = url
  }
  return { src, isOpenImage, showImage }
})
