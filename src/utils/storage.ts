/*
 * @Author: jrucker
 * @Description: 缓存数据
 * 设置缓存 storage.set(key, value) || storage.set({name: 'xxx'})
 * 读取缓存 storage.get(key)
 * 移除缓存 storage.remove(key)
 * 清除缓存 storage.clear()
 * @Date: 2024/09/02 13:35:01
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/10 23:15:40
 */

import { isObject } from './index'

/**
 * 设置缓存
 * @param key
 * @param value
 */
function set(key, value) {
  if (isObject(key)) {
    Object.keys(key).forEach(prop => {
      let el = key[prop]
      if (!el) el = ''
      uni.setStorageSync(prop, JSON.stringify(el))
    })
  } else {
    uni.setStorageSync(key, JSON.stringify(value))
  }
}

/**
 * 获取缓存
 * @param {*} key
 * @returns
 */
function get(key) {
  const res = uni.getStorageSync(key)
  if (res) {
    return JSON.parse(res)
  } else {
    return false
  }
}

/**
 * 清除单个缓存
 * @param key
 */
function remove(key) {
  uni.removeStorageSync(key)
}

/**
 * 清除所有缓存
 */
function clear() {
  uni.clearStorageSync()
}

export default {
  set,
  get,
  remove,
  clear
}
