/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/07 16:16:14
 */

import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './types'
import { checkImgExists } from '@/utils'
export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_NAME](state: S, name: string): void
  [UserMutationTypes.SET_AVATAR](state: S, avatar: string): void
  [UserMutationTypes.SET_USER_ID](state: S, userId: string): void
  [UserMutationTypes.LOAD_USER_INFO](state: S, payload: boolean): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
  },
  [UserMutationTypes.SET_NAME](state: UserState, name: string) {
    state.name = name
  },
  async [UserMutationTypes.SET_AVATAR](state: UserState, avatar: string) {
    const exist = await checkImgExists(avatar)
    if (exist) {
      state.avatar = avatar
    }
  },
  [UserMutationTypes.SET_USER_ID](state: UserState, userId: string) {
    state.userId = userId
  },
  [UserMutationTypes.LOAD_USER_INFO](state: UserState, payload: boolean) {
    state.loadUserInfo = payload
  }
}
