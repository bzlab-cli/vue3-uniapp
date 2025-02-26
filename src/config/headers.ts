/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/11/01 15:16:13
 */

// 请求头
export enum ContentType {
  FORM = 'application/x-www-form-urlencoded;charset=utf-8',
  JSON = 'application/json;charset=utf-8'
}

// 请求方法
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
