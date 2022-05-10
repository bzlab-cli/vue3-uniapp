/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/05 11:42:00
 */

import log from '../utils/logger'
import { MiddleWare } from '../types'

export type ResultInfo = {
  retCode: number
  retMsg?: string
  data?: any
  err?: any
}

export const ResponseHandler: MiddleWare = () => async (ctx, next) => {
  const res: ResultInfo = { retCode: 200 }
  try {
    const data: any = await next()
    res.retCode = 200
    res.retMsg = '成功'
    res.data = data
  } catch (err) {
    log.error(err)
    log.error('xxx' + err.statusCode)
    res.retCode = err.statusCode
    switch (err.statusCode) {
      case 401:
        res.retMsg = '登录失效'
        break
      default:
        break
    }
  }
  ctx.body = res
}
