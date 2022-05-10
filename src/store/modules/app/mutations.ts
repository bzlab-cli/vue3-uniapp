/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/04/10 14:14:30
 */

import { MutationTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { AppMutationTypes } from './types'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  }
}
