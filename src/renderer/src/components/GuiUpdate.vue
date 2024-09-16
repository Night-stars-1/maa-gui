<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-13 11:13:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-16 17:40:51
-->
<script setup lang="ts">
import { useProxyList } from '@stores/proxyList'
import { debounce } from 'lodash'

const { proxy } = storeToRefs(useProxyList())

const isUpdate = ref(false)
const updateProgress = ref(0)
const updateTitle = ref('下载中...')
const updating = computed(() => updateProgress.value > 0)

const confirming = ref(false)
const confirmTitle = ref('确认')
const confirmText = ref('')
/**
 * 0 -> 确认信息
 * 1 -> 确认下载
 * 2 -> 确认安装
 */
const confirmType = ref(0)

window.electron.ipcRenderer.on('maa-gui-update', (_, upInfo: string) => {
  // confirming.value = true
  confirmTitle.value = '更新确认'
  confirmText.value = upInfo.replaceAll('\n', '<br />')
  confirmType.value = 1
})

window.electron.ipcRenderer.on('maa-gui-downloading', (_, progress: number) => {
  updateProgress.value = progress
  if (progress >= 100) {
    updateProgress.value = 0
  }
})

window.electron.ipcRenderer.on('maa-gui-downloaded', () => {
  confirming.value = true
  confirmTitle.value = '下载确认'
  confirmText.value = '更新包下载完成,是否立即更新?'
  confirmType.value = 2
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function update(event: any) {
  event.target?.closest('.v-list-item')?.classList?.remove('v-list-item--active')
  updateProgress.value = 0
  const isUpdate = await window.api.isGuiUpdate(proxy.value)
  confirming.value = isUpdate
}
const debouncedUpdate = debounce(update, 200)

function confirm() {
  switch (confirmType.value) {
    case 1:
      window.api.guiDownload()
      break
    case 2:
      setTimeout(window.api.guiInstall, 500)
      break
  }
  confirmType.value = 0
  confirming.value = false
}

onBeforeMount(async () => {
  isUpdate.value = await window.api.isGuiUpdate(proxy.value)
})
</script>

<template>
  <v-badge v-model="isUpdate" color="error" dot>
    <v-list-item
      prepend-icon="mdi-update"
      title="检查更新"
      value="检查更新"
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
  <v-dialog v-model="confirming" width="auto" persistent>
    <v-card class="d-flex px-4 mx-auto" width="400" :title="confirmTitle">
      <v-card-text v-html="confirmText"> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="medium-emphasis" size="small" @click="confirming = false"> 取消 </v-btn>
        <v-btn color="medium-emphasis" size="small" @click="confirm"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
