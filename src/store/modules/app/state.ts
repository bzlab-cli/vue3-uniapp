/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/06/07 16:34:58
 */

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
  statusBarHeight: number
  headerHeight: number
}

export const state: AppState = {
  device: DeviceType.Desktop,
  statusBarHeight: 0,
  headerHeight: 80
}
