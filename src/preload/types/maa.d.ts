/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-14 22:23:35
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-15 16:11:20
 */

interface AdbInfo {
  name: string
  adb_path: string
  address: string
  screencap_methods: import('@nekosu/maa-node').api.Uint64
  input_methods: import('@nekosu/maa-node').api.Uint64
  config: string
}
