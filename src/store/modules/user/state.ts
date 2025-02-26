/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/04/10 14:19:55
 */

import { getToken } from '@/utils/auth'

export interface UserState {
  token: string
  name: string
  avatar: string
  userId: string
  loadUserInfo: boolean
}

export const state: UserState = {
  token: getToken() || '',
  userId: '',
  name: '',
  avatar: 'https://img2.baidu.com/it/u=3924374604,1207041510&fm=26&fmt=auto',
  loadUserInfo: false // 第一次加载用户信息
}
