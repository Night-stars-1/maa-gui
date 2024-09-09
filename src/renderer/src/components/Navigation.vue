<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 23:35:44
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-09 12:12:40
-->
<script setup lang="ts">
import { debounce } from 'lodash'
import { useSnackbar } from '@stores/snackbar'

const updating = ref(false)
const updateProgress = ref('0')
const updateTitle = ref('检测更新中...')

const { createToast } = useSnackbar()

window.electron.ipcRenderer.on('extract-progress', (_, progress) => {
  updateProgress.value = progress
})

window.electron.ipcRenderer.on('extract-complete', (_, message) => {
  createToast(message)
  setTimeout(() => (updating.value = false), 100)
})

window.electron.ipcRenderer.on('extract-error', (_, errorMessage) => {
  createToast(errorMessage)
  setTimeout(() => (updating.value = false), 100)
})

window.electron.ipcRenderer.on('res-download', (_, message) => {
  createToast(message)
  updateTitle.value = '更新中...'
  updateProgress.value = '0'
})

async function update() {
  updateTitle.value = '检测更新中...'
  const version = await window.api.isUpdate()
  if (typeof version === 'string') {
    updateTitle.value = '下载资源包中...'
    updateProgress.value = '0'
    updating.value = true
    window.api.upDate(version)
  } else {
    createToast('已是最新版本')
  }
}
const debouncedUpdate = debounce(update, 200)
</script>

<template>
  <v-navigation-drawer
    class="navigation"
    :mobile="false"
    expand-on-hover
    rail
    expand-on-hover-width="10px"
  >
    <v-list class="navigation-list" density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="首页" value="首页" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-tablet" title="设备" value="设备" to="/devices"></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar-check"
        title="任务"
        value="任务"
        to="/task"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-list-box"
        title="任务集"
        value="任务集"
        to="/task-list"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-timeline-clock-outline"
        title="流水线"
        value="流水线"
        to="/timeline"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-math-log" title="日志" value="日志" to="/log"></v-list-item>
      <v-spacer />
      <v-list-item
        prepend-icon="mdi-update"
        title="检查更新"
        value="检查更新"
        @click="debouncedUpdate"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-dialog v-model="updating" width="auto" persistent>
    <v-card class="d-flex px-4 pb-8 mx-auto" width="400">
      <v-card-item class="px-0" prepend-icon="mdi-update" :title="updateTitle"> </v-card-item>
      <v-progress-linear
        bg-color="#92aed9"
        color="#12512a"
        height="12"
        :model-value="updateProgress"
        rounded
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.navigation {
  max-width: 150px;
}

.navigation-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
