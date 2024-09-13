<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-11 16:51:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-13 16:54:15
-->
<script setup lang="ts">
import { useDebug } from '@stores/debug'
import { useProxyList } from '@stores/proxyList'

const { proxyList } = useProxyList()
const { isDebug } = storeToRefs(useDebug())
const { proxy } = storeToRefs(useProxyList())

function openResFolder() {
  window.api.openResFolder()
}
</script>

<template>
  <div class="d-flex justify-center flex-column">
    <v-switch v-model="isDebug" label="Debug"></v-switch>
    <v-select
      v-model="proxy"
      :items="proxyList"
      item-title="name"
      item-value="url"
      label="设置代理"
    ></v-select>
    <v-btn @click="openResFolder"> 打开资源文件夹 </v-btn>
  </div>
</template>
