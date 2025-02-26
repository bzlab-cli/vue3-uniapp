/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/05 11:41:38
 */

import { post, prefix, get } from '../decorator/request'
import user from '../data/user'

@prefix('/business-web')
export default class User {
  @post('/user/login')
  async login(ctx: any) {
    return {
      userId: '96f3eddc-4396-11ec-87ee-0242ac110002',
      userName: '参数',
      token: 'b7c80629-3306-45c9-a7b9-ff2685c4b5d8',
      roleId: '9701a69b-2f31-44c5-bb4f-5caed8b03e90',
      orgId: 0,
      headUrl: '',
      competenceList: []
    }

    return ctx.throw(401)
  }

  @get('/user/getUserByToken')
  async getUserInfo() {
    return user
  }
}
