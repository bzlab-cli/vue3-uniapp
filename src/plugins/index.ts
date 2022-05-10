/*
 * @Author: jrucker
 * @Description: 加载插件文件
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/10 22:44:55
 */

import { createApp } from 'vue'
/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.globEager('./*.ts')
  Object.keys(files).forEach(key => {
    if (typeof files[key].default === 'function') {
      if (key !== './index.ts') files[key].default(app)
    }
  })
}
