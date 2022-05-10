/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/10 23:45:16
 */

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/types'
import { showToast } from '@/utils'
import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'

declare module 'axios' {
  export interface AxiosRequestConfig {
    token?: boolean
  }
}

axios.defaults.adapter = function (config: any) {
  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response: any) {
        console.log('执行完成：', response)
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        }

        settle(resolve, reject, response)
      }
    })
  })
}

export class Request {
  private axiosInstance: AxiosInstance
  private options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig) {
    this.options = options
    // 创建axios实例
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  // 设置header
  setHeader(headers: any): void {
    if (!this.axiosInstance) return
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  // 拦截器配置
  private setupInterceptors() {
    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        const store = useStore()
        const token = store.state.user.token
        const hasToken = typeof request.token !== 'undefined'
        if (!hasToken) {
          if (token) request.headers['token'] = token
        } else {
          if (request.token) request.headers['token'] = token
        }

        return request
      },
      (e: AxiosError) => {
        Promise.reject(e)
      }
    )

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const { retCode, retMsg } = response.data
        if (retCode === 200) {
          return response
        } else {
          showToast(retMsg || '服务器响应失败，请重试')
          return Promise.reject(response)
        }
      },
      (e: AxiosError) => {
        const { response } = e
        const { status } = response as AxiosResponse
        const store = useStore()
        if (status === 500) {
          showToast('登录已失效，请重新登录')
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined).then(() => {
            uni.navigateTo({
              url: '/pages/login/login'
            })
          })
        }
        if (status === 502) {
          showToast('服务器响应失败，请重试')
        }
        return Promise.reject(e)
      }
    )
  }

  // 发送请求
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res: AxiosResponse<IResponseModel<any>>) => {
          resolve(res.data as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}
