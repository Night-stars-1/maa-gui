<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 22:46:10
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-03 22:00:12
-->
<script setup lang="ts">
const props = defineProps<{
  optionList: string[]
  optionData: Option
}>()

const model = defineModel<PurpleParam[]>({ default: [] })

defineEmits<{
  update: [value: PurpleParam[]]
}>()

onMounted(
  () =>
    (model.value = props.optionList.map<PurpleParam>((option, index) => {
      if (model.value[index]) {
        return model.value[index]
      } else {
        return props.optionData[option].cases[0].pipeline_override
      }
    }))
)
</script>

<template>
  <v-card title="任务设置">
    <v-card-text>
      <v-select
        v-for="(option, index) in optionList"
        :key="index"
        v-model="model[index]"
        :label="option"
        :items="optionData[option]?.cases"
        item-title="name"
        item-value="pipeline_override"
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
