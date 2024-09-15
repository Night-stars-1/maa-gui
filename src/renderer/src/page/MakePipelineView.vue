<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-14 10:09:16
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-14 10:33:36
-->
<script setup lang="ts">
const recognitionList = [
  'DirectHit',
  'TemplateMatch',
  'FeatureMatch',
  'ColorMatch',
  'OCR',
  'NeuralNetworkClassify',
  'NeuralNetworkDetect',
  'Custom'
]
const actionList = [
  'DoNothing',
  'Click',
  'Swipe',
  'Key',
  'Text',
  'StartApp',
  'StopApp',
  'StopTask',
  'Custom'
]
const config = ref({
  recognition: ''
})
const editing = ref(false)
</script>

<template>
  <v-dialog v-model="editing" max-width="400" persistent>
    <v-card prepend-icon="mdi-map-marker" title="Name">
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="config.recognition"
            :items="recognitionList"
            label="识别算法类型"
            required
          ></v-select>
          <TemplateMatch v-if="config.recognition == 'TemplateMatch'"></TemplateMatch>
          <v-select :items="actionList" label="执行的动作" required></v-select>
          <v-select :items="[]" label="接下来要执行的任务列表" required></v-select>
          <v-select :items="[]" label="候补任务列表" required></v-select>
          <v-text-field label="识别速率限制"></v-text-field>
          <v-text-field label="识别超时时间"></v-text-field>
          <v-select :items="[]" label="失败后执行列表" required></v-select>
          <v-text-field label="识别到 到 执行动作前 的延迟"></v-text-field>
          <v-text-field label="执行动作后 到 识别 next 的延迟"></v-text-field>
          <v-text-field label="识别到 到 执行动作前，等待画面不动了的时间"></v-text-field>
          <v-text-field label="行动动作后 到 识别 next，等待画面不动了的时间"></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
