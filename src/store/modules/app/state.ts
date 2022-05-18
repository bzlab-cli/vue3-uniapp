/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/18 23:23:40
 */

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
  statusBarHeight: number
}

export const state: AppState = {
  device: DeviceType.Desktop,
  statusBarHeight: 0
}
