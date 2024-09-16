<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-07 19:50:07
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-08 22:57:10
-->

<script setup lang="ts">
import { useSnackbar } from '@renderer/plugins/pinia/snackbar'
import { asyncComputed } from '@vueuse/core'

const { createToast } = useSnackbar()

const router = useRouter()

const loading = ref(true)
const deviceLoading = ref(false)

const devices = asyncComputed(async () => getDevices())

async function getDevices() {
  loading.value = true
  const _devices = await window.api.getDevices()
  loading.value = false
  devices.value = _devices
  return _devices
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadDevice(device: any) {
  if (deviceLoading.value) return
  deviceLoading.value = true
  const result = await window.api.deviceLoad(device)
  deviceLoading.value = false
  if (result) {
    createToast('连接成功')
    router.push('/task')
  } else {
    createToast('连接失败')
  }
}
</script>

<template>
  <v-container
    class="d-flex flex-wrap ga-3"
    :class="{
      'align-content-start': devices?.length !== 0,
      'align-content-center': devices?.length === 0,
      'justify-center': devices?.length === 0,
      error: devices?.length === 0
    }"
  >
    <div v-if="loading" class="d-flex align-content-start flex-wrap ga-3">
      <v-skeleton-loader
        v-for="i in 6"
        :key="i"
        :loading="loading"
        width="150px"
        height="150px"
        type="card"
      ></v-skeleton-loader>
    </div>

    <v-card
      v-for="device in devices"
      :key="device.name"
      :loading="deviceLoading"
      class="text-card d-flex align-center"
      @click="loadDevice(device)"
    >
      <v-card-text class="no-select text-card-content">
        {{ device.name }}
        <br />
        <br />
        {{ device.address }}
      </v-card-text>
    </v-card>
    <v-btn v-if="!loading && devices?.length === 0" @click="getDevices">刷新</v-btn>
  </v-container>
</template>

<style lang="scss" scoped>
.error {
  min-height: calc(100vh - 20px);
}

.text-card {
  .text-card-content {
    width: 150px;
  }

  & {
    width: 150px;
    height: 150px;
    text-align: center;
  }
}
</style>
