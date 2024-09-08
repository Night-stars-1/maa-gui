<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 17:06:25
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-07 19:16:26
-->
<script setup lang="ts">
import { useLogMessage } from '@stores/logMessage'

const { messageList } = useLogMessage()
</script>
<template>
  <v-list :lines="false" density="compact" nav>
    <v-list-item
      v-for="message in messageList"
      :key="message"
      :title="message"
      class="log-msg"
    ></v-list-item>
  </v-list>
</template>

<style lang="scss" scoped>
.log-msg {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
