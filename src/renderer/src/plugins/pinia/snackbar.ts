import { defineStore } from 'pinia'

export const useSnackbar = defineStore('snackbar', () => {
  const snackbar = ref(false)
  const snackbarMsg = ref('')

  function createToast(msg: string) {
    snackbarMsg.value = msg
    snackbar.value = true
  }
  return { snackbar, snackbarMsg, createToast }
})
