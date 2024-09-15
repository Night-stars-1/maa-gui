<script setup lang="ts">
const orderByList = ['Horizontal', 'Vertical', 'Score', 'Random']
</script>

<template>
  <v-text-field label="识别区域坐标"></v-text-field>
  <v-text-field label="额外再移动范围"></v-text-field>
  <v-text-field label="模板图片, 以点击查看图片显示"></v-text-field>
  <v-text-field label="模板匹配阈值"></v-text-field>
  <v-select :items="orderByList" label="结果排序方式" required></v-select>
  <v-text-field label="命中第几个结果"></v-text-field>
</template>
