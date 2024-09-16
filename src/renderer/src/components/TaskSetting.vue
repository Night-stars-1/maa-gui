<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 22:46:10
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-16 17:06:49
-->
<script setup lang="ts">
defineProps<{
  optionList: string[]
  optionData: Option
}>()

const model = defineModel<PurpleParam[]>({ default: [] })

defineEmits<{
  update: [value: PurpleParam[]]
}>()
</script>

<template>
  <v-card title="任务设置">
    <v-card-text>
      <v-select
        v-for="(option, index) in optionList"
        :key="option"
        v-model="model[index]"
        :label="option"
        :items="optionData[option]?.cases"
        item-title="name"
        item-value="param"
        :return-object="false"
        @update:model-value="$emit('update', model)"
      ></v-select>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="保存"></v-btn>
    </v-card-actions> -->
  </v-card>
</template>
