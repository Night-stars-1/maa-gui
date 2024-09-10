/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-10 12:31:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-10 12:31:26
 */
interface ImportMetaEnv {
  readonly VITE_MAIN_VERSION: string
  readonly VITE_MAIN_RESOURCES: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
