/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/12 14:43:09
 */

import customNav from '@/components/custom-nav'

export default function loadComponent(app: any) {
  app.component('CustomNav', customNav)
}
