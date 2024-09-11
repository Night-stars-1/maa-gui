/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-11 19:17:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-11 19:17:49
 */
import localforage from 'localforage'

async function getProxy() {
  return (await localforage.getItem<string>('proxy')) ?? ''
}

async function setProxy(url: string) {
  return await localforage.setItem<string>('proxy', url)
}

export { getProxy, setProxy }
