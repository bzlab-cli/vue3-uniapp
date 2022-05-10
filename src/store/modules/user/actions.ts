/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/07 16:19:23
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes, UserActionTypes } from './types'
import { login, userInfo } from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'
import { showToast } from '@/utils'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>
export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { account: string; password: string }
  ): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<any>
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { account: string; password: string }
  ) {
    let { account } = userInfo
    const { password } = userInfo
    account = account.trim()
    const { retCode, data, retMsg } = await login({ account, password })
    if (retCode !== 200) return showToast(retMsg)
    console.log('ACTION_LOGIN', data)
    if (data.token) {
      setToken(data.token)
      commit(UserMutationTypes.SET_TOKEN, data.token)
    }
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<any> {
    return new Promise(resolve => {
      removeToken()
      commit(UserMutationTypes.SET_TOKEN, '')
      commit(UserMutationTypes.SET_USER_ID, '')
      commit(UserMutationTypes.LOAD_USER_INFO, false)
      resolve('done')
    })
  },
  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    const { retCode, data, retMsg } = await userInfo()
    if (retCode !== 200) return showToast(retMsg)
    commit(UserMutationTypes.SET_NAME, data.userName || '')
    commit(UserMutationTypes.SET_AVATAR, data.headUrl || '')
    commit(UserMutationTypes.SET_USER_ID, data.userId || '')
    commit(UserMutationTypes.LOAD_USER_INFO, true)
  }
}
