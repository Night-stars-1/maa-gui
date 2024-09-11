import { getProxy, setProxy } from '@renderer/utils/proxyUtils'
import { defineStore } from 'pinia'

export const useProxyList = defineStore('proxyList', () => {
  const proxyList = [
    {
      name: 'https://ghp.ci',
      url: 'https://ghp.ci'
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
