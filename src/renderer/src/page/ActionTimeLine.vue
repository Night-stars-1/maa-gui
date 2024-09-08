<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-08 20:09:36
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-09 00:06:13
-->
<script setup lang="ts">
interface Item {
  color: string
  icon: string
  name: string
  next: {
    /**
     * 0-未返回结果
     * 1-成功
     * 2-失败
     */
    [key: string]: {
      status: number
      id: number
    }
  }
}
const items = ref<Item[]>([])
const scrollContainer = ref<ComponentPublicInstance | null>(null) // 滚动容器的引用
const isAtBottom = ref(true) // 标记是否在底部

const image = ref('')
const isOpenImage = ref(false)

window.api.onStartRecognize((_, name, next) => {
  const data: Item = {
    color: 'info',
    icon: 'mdi-information',
    name: name,
    next: {}
  }
  next.forEach(
    (item) =>
      (data.next[item] = {
        status: 0,
        id: 0
      })
  )
  if (items.value.length >= 100) {
    items.value.shift() // 移除第一个元素
  }
  items.value.push(data)
  nextTick(() => {
    if (isAtBottom.value) {
      scrollToBottom()
    }
  })
})
window.api.onEndRecognize((_, id, name, status) => {
  const data = items.value[items.value.length - 1].next[name]
  data.status = status ? 1 : 2
  data.id = id
  // console.log(id, message, status)
})

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

async function showImage(recoId: number) {
  const result = await window.api.queryRecognitionDetail(recoId)
  isOpenImage.value = true

  // 将 ArrayBuffer 转换为 Base64 字符串
  const base64String = btoa(
    new Uint8Array(result.image).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  // 创建 data URL
  const url = `data:image/png;base64,${base64String}`
  image.value = url
}
</script>

<template>
  <v-timeline
    ref="scrollContainer"
    class="scroll-container justify-start"
    side="end"
    @scroll="onScroll"
  >
    <v-timeline-item
      v-for="(item, index) in items"
      :key="index"
      :dot-color="item.color"
      size="small"
    >
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
            @dblclick="showImage(data.id)"
          >
            {{ name }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
  <v-dialog v-model="isOpenImage">
    <v-img class="bg-white" :src="image" cover></v-img>
  </v-dialog>
</template>

<style scoped>
.scroll-container {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
