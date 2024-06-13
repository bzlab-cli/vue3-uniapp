/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/06/13 15:49:29
 */

export class keys {
  static tokenKey = 'token'
}

export enum settings {
  title = 'demo',
  logo = '/assets/images/home/logo.png'
}

export function getEnv(val: string) {
  const obj = {
    development: 'mock-dev',
    deployment: 'mock-dev',
    production: 'mock-prod'
  } as any
  return obj[val]
}
