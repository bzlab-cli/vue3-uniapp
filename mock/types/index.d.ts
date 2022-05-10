/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/02 15:00:35
 */

import { Context, Next } from "koa"

type PlainObject = Record<string, any>;
type ParamObject = Record<string, any>;
type MysqlResult = {
  affectedRows?: number;
  insertId?: string;
}

type PathMeta = {
  name: string;
  path: string;
}

type RouteMeta = {
  name: string;
  method: string;
  path: string;
  isVerify: boolean;
}

type MiddleWare = (...arg: any[]) => (ctx: Context, next?: Next) => Promise<void>;

export {
  MysqlResult,
  PlainObject,
  RouteMeta,
  MiddleWare,
  PathMeta,
  ParamObject
}