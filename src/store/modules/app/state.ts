/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/04/10 14:14:55
 */

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
}

export const state: AppState = {
  device: DeviceType.Desktop
}
