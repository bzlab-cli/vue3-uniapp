/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/05/05 11:42:12
 */

const { Random } = require('mockjs')

/**
 * 随机生成图片
 * @param width
 * @param height
 * @returns {string}
 */
export function randomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}
