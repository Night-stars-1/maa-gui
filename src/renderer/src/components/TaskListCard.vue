<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-09 11:58:58
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-16 17:20:30
-->
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { addTask } from '@renderer/utils/taskUtils'

const name = ref('')

const model = defineModel<Task[]>({ required: true, default: [] })
defineProps<{ data: Interface; isSave?: boolean }>()

defineEmits<{
  update: [value: Task[]]
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onAdd(event: any) {
  event.clonedData.id = model.value.length + 1
}
</script>

<template>
  <v-card class="select-card">
    <v-card-title v-if="isSave" class="d-flex align-center justify-space-between">
      任务列表
      <v-dialog max-width="500">
        <template #activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="surface-variant" text="保存" variant="flat"></v-btn>
        </template>

        <template #default="{ isActive }">
          <v-card title="任务集">
            <v-card-text>
              <v-text-field v-model="name" label="任务集名称"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isSave"
                variant="tonal"
                size="small"
                @click="
                  () => {
                    addTask(name, model)
                    isActive.value = false
                  }
                "
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-title>
    <v-list class="task-list">
      <VueDraggable
        v-model="model"
        :animation="150"
        group="people"
        class="task-list"
        @add="onAdd"
        @update="$emit('update', model)"
      >
        <v-list-item v-for="(task, index) in model" :key="task.id" :value="task?.entry">
          <v-list-item-title class="no-select">{{ task.name }}</v-list-item-title>
          <template #prepend>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-close"
              variant="text"
              size="small"
              @click="
                () => {
                  model.splice(index, 1)
                  $emit('update', model)
                }
              "
            ></v-btn>
          </template>
          <template #append>
            <v-dialog max-width="500">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-if="task.option"
                  v-bind="activatorProps"
                  color="grey-lighten-1"
                  icon="mdi-cog-outline"
                  variant="text"
                  size="small"
                ></v-btn>
              </template>

              <TaskSetting
                v-if="task.option"
                v-model="model[index].optionData"
                :option-list="task.option"
                :option-data="data.option"
                @update="$emit('update', model)"
              />
            </v-dialog>
          </template>
        </v-list-item>
      </VueDraggable>
    </v-list>
  </v-card>
</template>

<style>
.task-list {
  height: 100%;
}
</style>
