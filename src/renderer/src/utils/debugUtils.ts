import localforage from 'localforage'

async function getDebug() {
  return (await localforage.getItem<boolean>('debug')) ?? true
}

async function setDebug(isDebug: boolean) {
  return await localforage.setItem<boolean>('debug', isDebug)
}

export { getDebug, setDebug }
