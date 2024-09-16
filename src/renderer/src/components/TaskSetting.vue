<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 22:46:10
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-16 16:45:28
-->
<script setup lang="ts">
const props = defineProps<{
  optionList: string[]
  optionData: Option
  modelValue?: (string | PurpleParam)[]
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: (string | PurpleParam)[]): void }>()

const selectList = computed(() =>
  props.optionList.map<PurpleParam | string>((_: string, index: number) => {
    if (props.modelValue?.[index]) {
      return props.modelValue[index]
    } else {
      return ''
    }
  })
)
</script>

<template>
  <v-card title="任务设置">
    <v-card-text>
      <v-select
        v-for="(option, index) in optionList"
        :key="option"
        v-model="selectList[index]"
        :label="option"
        :items="optionData[option].cases"
        item-title="name"
        item-value="param"
        :return-object="false"
        @update:model-value="emit('update:modelValue', selectList)"
      ></v-select>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="保存"></v-btn>
    </v-card-actions> -->
  </v-card>
  <div />
</template>
