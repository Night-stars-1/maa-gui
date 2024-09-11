import { getDebug, setDebug } from '@renderer/utils/DebugUtils'
import { defineStore } from 'pinia'

export const useDebug = defineStore('debug', () => {
  const isDebug = ref<boolean>(true)

  getDebug().then((value) => (isDebug.value = value))
  window.api.setDebug(isDebug.value)

  watch(
    () => isDebug.value,
    (isDebug) => {
      window.api.setDebug(isDebug)
      setDebug(isDebug)
    }
  )
  return { isDebug }
})
