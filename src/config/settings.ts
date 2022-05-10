/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/06 17:06:46
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
    development: 'nzf-dev',
    deployment: 'nzf-dev',
    production: 'nzf-prod'
  } as any
  return obj[val]
}
