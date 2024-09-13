<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-13 11:13:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-13 18:47:28
-->
<script setup lang="ts">
import { useProxyList } from '@stores/proxyList'
import { useSnackbar } from '@stores/snackbar'
import { debounce } from 'lodash'

const { proxy } = storeToRefs(useProxyList())
const { createToast } = useSnackbar()

const isUpdate = ref(false)
const updateProgress = ref('0')
const updateTitle = ref('检测更新中...')

const updating = computed(() => updateProgress.value > '0')

window.electron.ipcRenderer.on('extract-progress', (_, progress) => {
  updateProgress.value = progress
})

window.electron.ipcRenderer.on('extract-complete', (_, message) => {
  createToast(message)
  setTimeout(() => {
    updateProgress.value = '0'
    isUpdate.value = false
  }, 100)
})

window.electron.ipcRenderer.on('extract-error', (_, errorMessage) => {
  createToast(errorMessage)
  setTimeout(() => (updateProgress.value = '0'), 100)
})

window.electron.ipcRenderer.on('res-download', (_, message) => {
  createToast(message)
  updateTitle.value = '更新中...'
  updateProgress.value = '0'
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function update(event: any) {
  event.target?.closest('.v-list-item')?.classList?.remove('v-list-item--active')
  updateProgress.value = '0'
  updateTitle.value = '检测更新中...'
  const version = await window.api.isResUpdate(proxy.value)
  if (typeof version === 'string') {
    updateTitle.value = '下载资源包中...'
    window.api.update(version, proxy.value)
  } else {
    createToast('已是最新版本')
    isUpdate.value = false
  }
}
const debouncedUpdate = debounce(update, 200)

onBeforeMount(async () => {
  const version = await window.api.isResUpdate(proxy.value)
  if (typeof version === 'string') {
    isUpdate.value = true
  }
})
</script>

<template>
  <v-badge v-model="isUpdate" color="error" dot>
    <v-list-item
      prepend-icon="mdi-update"
      title="检查资源包"
      value="检查资源包"
      @click="debouncedUpdate"
    >
    </v-list-item>
  </v-badge>
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
