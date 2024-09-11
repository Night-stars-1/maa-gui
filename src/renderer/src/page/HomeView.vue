<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 00:27:22
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 14:33:00
-->
<script setup lang="ts">
import { useShowImage } from '@stores/showImage'

const { showImage } = useShowImage()
</script>

<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      height="200px"
      src="https://moe.jitsu.top/img/?sort=pc"
      cover
      @click="showImage('https://moe.jitsu.top/img/?sort=pc')"
    ></v-img>

    <v-card-title>
      <router-link to="/task" style="text-decoration: none; color: black"
        >如果你不知道怎么运行,请点我</router-link
      >
    </v-card-title>
  </v-card>
</template>
