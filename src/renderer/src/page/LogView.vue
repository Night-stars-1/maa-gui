<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 17:06:25
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 14:26:55
-->
<script setup lang="ts">
import { useLogMessage } from '@stores/logMessage'

const { messageList } = useLogMessage()
const scrollContainer = ref<ComponentPublicInstance | null>(null) // 滚动容器的引用
const isAtBottom = ref(false)

watch(
  () => messageList,
  () => {
    console.log(isAtBottom.value)
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
    scrollContainer.value.$el.scrollTop = scrollContainer.value.$el.scrollHeight
  }
}
onMounted(() => {
  scrollToBottom()
})
</script>
<template>
  <v-list
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
  </v-list>
</template>

<style lang="scss" scoped>
.scroll-container {
  max-height: 100vh;
}
.log-msg {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
