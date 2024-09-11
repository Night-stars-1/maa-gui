/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-11 19:15:27
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-12 01:31:44
 */
import { getProxy, setProxy } from '@renderer/utils/proxyUtils'
import { defineStore } from 'pinia'

export const useProxyList = defineStore('proxyList', () => {
  const proxyList = [
    {
      name: 'https://ghp.ci/',
      url: 'https://ghp.ci/'
    },
    {
      name: '不代理',
      url: ''
    }
  ]
  const proxy = ref<string>('')

  watch(
    () => proxy.value,
    (value) => {
      setProxy(value)
    }
  )
  getProxy().then((item) => (proxy.value = item))
  return { proxy, proxyList }
})
