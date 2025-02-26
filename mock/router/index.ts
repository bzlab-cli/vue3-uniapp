/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/05 11:42:04
 */

import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { ROUTER_MAP, BASE_PATH_MAP } from '../constant'
import { RouteMeta, PathMeta } from '../types'
import Router from 'koa-router'

const addRouter = (router: Router) => {
  const ctrPath = path.join(__dirname, '../controller')
  const modules: ObjectConstructor[] = []
  fs.readdirSync(ctrPath).forEach(name => {
    if (/^[^.]+\.(t|j)s$/.test(name)) {
      modules.push(require(path.join(ctrPath, name)).default)
    }
  })

  modules.forEach(m => {
    const routerMap: RouteMeta[] = Reflect.getMetadata(ROUTER_MAP, m, 'method') || []
    const basePathMap: PathMeta[] = Reflect.getMetadata(BASE_PATH_MAP, m) || []
    const basePath: PathMeta = basePathMap.pop()
    if (routerMap.length) {
      const ctr = new m()
      routerMap.forEach(route => {
        const { name, method, path } = route
        const newPath: String = basePath ? basePath.path + path : path
        router[method](newPath, ctr[name])
      })
    }
  })
}

export default addRouter
