/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 23:40:19
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-09 11:34:45
 */
import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'
import TaskView from '../page/TaskView.vue'
import HomeView from '@renderer/page/HomeView.vue'
import LogView from '@renderer/page/LogView.vue'
import DeviceView from '@renderer/page/DeviceView.vue'
import ActionTimeLine from '@renderer/page/ActionTimeLine.vue'

const defaultTitle = document.title

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    component: HomeView
  },
  {
    path: '/task',
    meta: {
      title: '任务'
    },
    component: TaskView
  },
  {
    path: '/log',
    meta: {
      title: '日志'
    },
    component: LogView
  },
  {
    path: '/devices',
    meta: {
      title: '设备'
    },
    component: DeviceView
  },
  {
    path: '/timeline',
    meta: {
      title: '流水线'
    },
    component: ActionTimeLine
  },
  {
    path: '/task-list',
    meta: {
      title: '任务集'
    },
    component: ActionTimeLine
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.afterEach((to) => {
  const newTitle = (to.meta.title || '默认标题') as string
  document.title = `${defaultTitle} - ${newTitle}`
})

export default router
