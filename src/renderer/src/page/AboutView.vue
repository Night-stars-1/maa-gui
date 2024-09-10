<script setup lang="ts">
import { useDebug } from '@stores/debug'

const { isDebug } = storeToRefs(useDebug())
</script>

<template>
  <div class="d-flex justify-center">
    <v-switch v-model="isDebug" label="Debug"></v-switch>
  </div>
</template>
