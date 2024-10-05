import { createPinia } from 'pinia'
import { useLogMessage } from './logMessage'
import { useDebug } from './debug'
import { useActionTimeLine } from './actionTimeLine'

const pinia = createPinia()

/**
 * 初始化Pinia
 * 一些需要在渲染进程打开时就触发的逻辑写在这里
 */
function init() {
  useLogMessage() // 触发log监听，避免进入log页面才触发，导致之前的log没有被监听
  useDebug()
  useActionTimeLine()
}

export default pinia

export { init }
