/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/10 23:44:09
 */

import axios from '@/utils/axios'

export const login = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    url: '/user/login',
    method: 'post',
    data
  })
}

export const userInfo = () => {
  return axios.request<IResponseModel<any>>({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    url: '/user/getUserByToken',
    method: 'get'
  })
}
