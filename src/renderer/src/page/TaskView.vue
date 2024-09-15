<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 23:41:24
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-14 21:34:31
-->
<script setup lang="ts">
import { useSelectData } from '@stores/selectData'
import { asyncComputed } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'

const router = useRouter()

const data = asyncComputed<Interface>(async () => JSON.parse(await window.api.getInterface()))

window.electron.ipcRenderer.on('maa-res-update', async () => {
  data.value = JSON.parse(await window.api.getInterface())
})

const useselectData = useSelectData()
const { selectData } = storeToRefs(useselectData)
function setSelectData(task: Task) {
  if (task.option) {
    task.optionData = task.option.map((item) => data.value.option[item].cases[0].param)
  }
  task.id = selectData.value.length + 1
  selectData.value.push(task)
}

function start() {
  window.api.start(JSON.stringify(selectData.value))
  router.push('/log')
}
function stop() {
  window.api.stop()
}
</script>

<template>
  <v-row v-if="data?.task">
    <v-col>
      <v-card>
        <v-list>
          <VueDraggable
            v-model="data.task"
            :animation="150"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :sort="false"
            class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
          >
            <v-list-item v-for="task in data.task" :key="task.name" :value="task.entry">
              <v-list-item-title class="no-select" :title="task.name">{{
                task.name
              }}</v-list-item-title>
              <template #append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-arrow-right-thick"
                  variant="text"
                  size="small"
                  @click="setSelectData(task)"
                ></v-btn>
              </template>
            </v-list-item>
          </VueDraggable>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="d-flex">
      <task-list-card v-model="selectData" :data="data" :is-save="true" />
      <v-row>
        <v-col>
          <v-btn @click="start">启动</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="stop">停止</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-alert v-else text="未找到任务索引，请检查更新" type="error"></v-alert>
</template>

<style lang="scss" scoped>
.d-flex {
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.select-card {
  width: 100%;
}
</style>
