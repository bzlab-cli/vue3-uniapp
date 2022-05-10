/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/04/12 22:21:15
 */

import axios from '@/utils/axios'

export const login = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    url: 'thirdUser/loginIn',
    method: 'post',
    data
  })
}

export const userInfo = () => {
  return axios.request<IResponseModel<any>>({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    url: 'thirdUser/getUserByToken',
    method: 'get'
  })
}
