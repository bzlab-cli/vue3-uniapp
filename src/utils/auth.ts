/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/07 16:18:19
 */

import { keys } from '@/config/settings'
import { setStorage, getStorage, removeStorage } from '@/utils'

export const getToken = () => getStorage(keys.tokenKey)
export const setToken = (token: string) => setStorage(keys.tokenKey, token)
export const removeToken = () => removeStorage(keys.tokenKey)
