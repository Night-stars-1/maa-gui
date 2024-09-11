<script setup lang="ts">
function openExternal(url: string) {
  window.api.openExternal(url)
}
</script>

<template>
  <p
    class="hover-underline clickable"
    @click="openExternal('https://github.com/Night-stars-1/maa-gui')"
  >
    项目地址
  </p>
</template>
