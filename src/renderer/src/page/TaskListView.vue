<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-09 12:12:48
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-16 17:05:20
-->
<script setup lang="ts">
import { getTasks, setTask } from '@renderer/utils/taskUtils'
import { asyncComputed } from '@vueuse/core'

const router = useRouter()

const tasks = ref<{
  [key: string]: Task[]
}>({})
asyncComputed(async () => {
  tasks.value = await getTasks()
})

const data = asyncComputed<Interface>(async () => JSON.parse(await window.api.getInterface()))
async function onUpdate(name: string) {
  tasks.value = await setTask(name, tasks.value[name])
}

function start(task: Task[]) {
  window.api.start(JSON.stringify(task))
  router.push('/log')
}
</script>

<template>
  <v-expansion-panels class="ga-2 align-start">
    <v-expansion-panel v-for="(task, name) in tasks" :key="name" class="task-panel">
      <v-expansion-panel-title disable-icon-rotate>
        {{ name }}
        <template #actions="{ expanded }">
          <v-icon class="mr-2" icon="mdi-play" @click="start(task)"></v-icon>
          <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text v-if="data">
        <task-list-card
          v-model="tasks[name]"
          :data="data"
          @update="onUpdate(name.toString())"
        ></task-list-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
.task-panel {
  max-width: 260px;
  margin-top: 0px !important;
}
</style>
