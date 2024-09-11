<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 17:06:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 14:30:25
-->
<script setup lang="ts">
import { init } from '@renderer/plugins/pinia'
import { useShowImage } from '@stores/showImage'
import { useSnackbar } from '@stores/snackbar'

init()

const { snackbar, snackbarMsg } = storeToRefs(useSnackbar())
const { isOpenImage, src } = storeToRefs(useShowImage())
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
  <v-dialog v-model="isOpenImage">
    <v-img class="bg-white" :src="src" cover></v-img>
  </v-dialog>
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
