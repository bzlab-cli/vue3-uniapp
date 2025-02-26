/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 16:16:39
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/07 16:19:15
 */

export enum UserActionTypes {
  ACTION_LOGIN = 'ACTION_LOGIN',
  ACTION_RESET_TOKEN = 'ACTION_RESET_TOKEN',
  ACTION_GET_USER_INFO = 'ACTION_GET_USER_INFO'
}

export enum UserMutationTypes {
  SET_TOKEN = 'SET_TOKEN',
  SET_NAME = 'SET_NAME',
  SET_AVATAR = 'SET_AVATAR',
  SET_USER_ID = 'SET_USER_ID',
  LOAD_USER_INFO = 'LOAD_USER_INFO'
}
