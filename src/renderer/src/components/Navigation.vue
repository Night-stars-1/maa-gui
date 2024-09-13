<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-06 23:35:44
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-13 11:31:36
-->
<script setup lang="ts">
import { useDebug } from '@stores/debug'

const { isDebug } = storeToRefs(useDebug())
</script>

<template>
  <v-navigation-drawer
    class="navigation"
    :mobile="false"
    expand-on-hover
    rail
    expand-on-hover-width="10px"
  >
    <v-list class="navigation-list" density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="首页" value="首页" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-tablet" title="设备" value="设备" to="/devices"></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar-check"
        title="任务"
        value="任务"
        to="/task"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-list-box"
        title="任务集"
        value="任务集"
        to="/task-list"
      ></v-list-item>
      <v-list-item
        v-if="isDebug"
        prepend-icon="mdi-timeline-clock-outline"
        title="流水线"
        value="流水线"
        to="/timeline"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-math-log" title="日志" value="日志" to="/log"></v-list-item>
      <v-spacer />
      <ResUpdate />
      <GuiUpdate />
      <v-list-item prepend-icon="mdi-cog" title="设置" value="设置" to="/setting"></v-list-item>
      <v-list-item
        prepend-icon="mdi-information-outline"
        title="关于"
        value="关于"
        to="/about"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.navigation {
  max-width: 150px;
}

.navigation-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
