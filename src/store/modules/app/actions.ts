/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/04/10 14:13:46
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { AppState, DeviceType } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes, AppActionTypes } from './types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface Actions {
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }: AugmentedActionContext, device: DeviceType): void
}

export const actions: ActionTree<AppState, RootState> & Actions = {
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }, device: DeviceType) {
    commit(AppMutationTypes.TOGGLE_DEVICE, device)
  }
}
