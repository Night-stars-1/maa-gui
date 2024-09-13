/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-10 12:31:15
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-10 12:43:43
 */
interface ImportMetaEnv {
  readonly VITE_VERSION: string
  readonly VITE_MAIN_VERSION: string
  readonly VITE_MAIN_RESOURCES: string
  readonly VITE_MAIN_UNRES_TARGET_DIR: string
  readonly VITE_MAIN_UNRES_OUT_DIR: string
  readonly VITE_MAIN_UNRES_INTERFACE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
