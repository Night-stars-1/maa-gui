<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 17:06:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 21:14:57
-->
<script setup lang="ts">
import { init } from '@renderer/plugins/pinia'
import { useSnackbar } from '@renderer/plugins/pinia/snackbar'

init()

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
