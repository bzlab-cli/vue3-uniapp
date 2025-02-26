/*
 * @Author: jrucker
 * @Description: 数据
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/05 11:41:49
 */

interface UserBean {
  id: number
  account: string
  password: string
  name: string
  avatar: string
}

const user: UserBean = {
  id: 0,
  account: '19957751736',
  password: '1qaz2wsx',
  name: '19957751736',
  avatar: 'https://v3.vuejs.org/logo.png'
}

export default user
