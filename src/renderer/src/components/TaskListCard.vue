<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
const model = defineModel<Task[]>({ required: true })
defineProps<{ data: Interface }>()
</script>

<template>
  <v-card class="select-card">
    <v-list>
      <VueDraggable
        v-model="model"
        :animation="150"
        group="people"
        class="flex flex-col gap-2 p-4 w-300px m-auto bg-gray-500/5 rounded overflow-auto"
      >
        <v-list-item v-for="(task, index) in model" :key="index" :value="task?.entry">
          <v-list-item-title class="no-select">{{ task.name }}</v-list-item-title>
          <template #prepend>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-close"
              variant="text"
              size="small"
              @click="model.splice(index, 1)"
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

              <template #default="{ isActive }">
                <TaskSetting
                  v-if="task.option"
                  v-model="model[index].optionData"
                  :option-list="task.option"
                  :option-data="data.option"
                  @click="isActive.value = true"
                />
              </template>
            </v-dialog>
          </template>
        </v-list-item>
      </VueDraggable>
    </v-list>
  </v-card>
</template>
