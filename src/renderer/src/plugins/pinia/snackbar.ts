import { defineStore } from 'pinia'

export const useSnackbar = defineStore('snackbar', () => {
  const snackbar = ref(false)
  const snackbarMsg = ref('')

  function createToast(msg: string) {
    snackbarMsg.value = msg
    snackbar.value = true
  }

  window.electron.ipcRenderer.on('main-create-toast', (_, msg: string) => createToast(msg))

  return { snackbar, snackbarMsg, createToast }
})
