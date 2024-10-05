<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 17:06:25
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 16:49:46
-->
<script setup lang="ts">
import { useLogMessage } from '@stores/logMessage'
import { VVirtualScroll } from 'vuetify/lib/components/index.mjs'

const { messageList } = storeToRefs(useLogMessage())
const scrollContainer = ref<VVirtualScroll | null>(null) // 滚动容器的引用
const isAtBottom = ref(false)

watch(
  () => messageList.value,
  () => {
    nextTick(() => {
      if (isAtBottom.value) scrollToBottom()
    })
  },
  {
    deep: true
  }
)

function onScroll() {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value.$el
    isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 10 // 判断是否接近底部，给10px余量
  }
}
function scrollToBottom() {
  if (scrollContainer.value) {
    setTimeout(() => {
      // scrollContainer.value.$el.scrollTop = scrollContainer.value.$el.scrollHeight
      scrollContainer.value?.scrollToIndex(messageList.value.length - 1)
    }, 100)
  }
}
onMounted(() => {
  scrollToBottom()
})
</script>
<template>
  <!-- <v-list
    ref="scrollContainer"
    class="scroll-container"
    :lines="false"
    density="compact"
    nav
    @scroll="onScroll"
  >
    <v-list-item
      v-for="message in messageList"
      :key="message"
      :title="message"
      class="log-msg"
    ></v-list-item>
  </v-list> -->
  <v-virtual-scroll
    ref="scrollContainer"
    class="log scroll-container"
    :items="messageList"
    @scroll="onScroll"
  >
    <template #default="{ item }"> {{ item }}</template>
  </v-virtual-scroll>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: calc(100vh - 20px);
}
.log-msg {
  div {
    font-size: 13.5px;
    white-space: pre-wrap;
    font-family: monospace;
  }
  & {
    margin: 0px !important;
    padding: 0px !important;
  }
}
</style>

<style lang="scss">
.log.scroll-container .v-virtual-scroll__item {
  font-size: 13.5px;
  white-space: pre-wrap;
  font-family: monospace;
}
</style>
