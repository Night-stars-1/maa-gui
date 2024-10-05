<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 20:09:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-10-05 17:14:48
-->
<script setup lang="ts">
import { useShowImage } from '@stores/showImage'
import { useActionTimeLine } from '@stores/actionTimeLine'

const { actionTimeLine } = storeToRefs(useActionTimeLine())
const { showImage } = useShowImage()
const scrollContainer = ref<ComponentPublicInstance | null>(null) // 滚动容器的引用
const isAtBottom = ref(true) // 标记是否在底部

watch(
  () => actionTimeLine.value,
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
    scrollContainer.value.$el.scrollTop = scrollContainer.value.$el.scrollHeight
  }
}

async function getImage(recoId: number) {
  const result = await window.api.queryRecognitionDetail(recoId)

  // 将 ArrayBuffer 转换为 Base64 字符串
  const base64String = btoa(
    new Uint8Array(result.image).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  // 创建 data URL
  const url = `data:image/png;base64,${base64String}`
  showImage(url)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <!-- <v-alert text="只有该页面只会显示正在运行中的流水线" type="warning" variant="tonal"></v-alert> -->
  <v-timeline class="justify-start" side="end">
    <v-virtual-scroll
      ref="scrollContainer"
      class="scroll-container"
      :items="actionTimeLine"
      @scroll="onScroll"
    >
      <template #default="{ item }">
        <v-timeline-item :dot-color="item.color" size="small">
          <v-card>
            <v-card-title class="text-h6">
              <v-icon :color="item.color" class="mr-2" size="large">{{ item.icon }}</v-icon>
              <span>{{ item.name }}</span>
            </v-card-title>
            <v-card-text>
              <v-chip
                v-for="(data, name, nIndex) in item.next"
                :key="nIndex"
                class="ma-2"
                :color="`${data.status == 1 ? 'success' : data.status == 0 ? 'info' : 'error'}`"
                aria-label=""
                @click="() => {}"
                @dblclick="getImage(data.id)"
              >
                {{ name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </template>
    </v-virtual-scroll>
  </v-timeline>
</template>

<style lang="scss" scoped>
.scroll-container {
  width: calc(100vw - 70px);
  max-height: calc(100vh - 20px);
  overflow-y: auto;
}
</style>
