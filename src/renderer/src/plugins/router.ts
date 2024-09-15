/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 23:40:19
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-14 10:12:52
 */
import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'
import HomeView from '@renderer/page/HomeView.vue'
import TaskView from '../page/TaskView.vue'
import LogView from '@renderer/page/LogView.vue'
import DeviceView from '@renderer/page/DeviceView.vue'
import TaskListView from '@renderer/page/TaskListView.vue'
import ActionTimeLineView from '@renderer/page/ActionTimeLineView.vue'
import AboutView from '@renderer/page/AboutView.vue'
import SettingView from '@renderer/page/SettingView.vue'
import { title } from 'process'
import MakePipelineView from '@renderer/page/MakePipelineView.vue'

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
    component: ActionTimeLineView
  },
  {
    path: '/task-list',
    meta: {
      title: '任务集'
    },
    component: TaskListView
  },
  {
    path: '/about',
    meta: {
      title: '关于'
    },
    component: AboutView
  },
  {
    path: '/setting',
    meta: {
      title: '设置'
    },
    component: SettingView
  },
  {
    path: '/make-pipeline',
    meta: {
      title: '流水线编辑器'
    },
    component: MakePipelineView
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
