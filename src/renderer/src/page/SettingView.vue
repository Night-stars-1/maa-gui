<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-11 16:51:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 19:19:40
-->
<script setup lang="ts">
import { useDebug } from '@stores/debug'
import { useProxyList } from '@stores/proxyList'

const { proxyList } = useProxyList()
const { isDebug } = storeToRefs(useDebug())
const { proxy } = storeToRefs(useProxyList())
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
  </div>
</template>
