<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 17:06:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 21:14:57
-->
<script setup lang="ts">
import { useLogMessage } from '@stores/logMessage'
import { useSnackbar } from './plugins/pinia/snackbar'

useLogMessage() // 触发log监听，避免进入log页面才触发，导致之前的log没有被监听

const { snackbar, snackbarMsg } = storeToRefs(useSnackbar())
</script>

<template>
  <v-layout class="rounded rounded-md">
    <Navigation />
    <v-main>
      <div class="main">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
  <v-snackbar v-model="snackbar" :timeout="2000" color="deep-purple-accent-4" elevation="24">
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<style lang="scss" scoped>
.rounded {
  .v-main {
    .main {
      margin: 10px;
    }
  }
}
</style>
