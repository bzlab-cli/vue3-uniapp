/*
 * @Author: jrucker
 * @Description: 工具类
 * @Date: 2024/09/02 16:08:22
 * @LastEditors: jrucker
 * @LastEditTime: 2024/01/03 15:29:51
 */

export function isH5() {
  let flag = false
  // #ifdef H5
  flag = true
  // #endif
  return flag
}

/**
 * 获取设备类型（默认h5）
 * @returns
 */
export function getDeviceType() {
  let device = 'h5'
  // #ifdef H5
  device = 'h5'
  // #endif
  // #ifdef APP-PLUS
  device = 'app'
  // #endif
  // #ifdef MP-WEIXIN
  device = 'wx'
  // #endif
  return device
}
/**
 * 随机字符串
 * @param o
 * @returns
 */
export function guid(format = 'xxxxxxxxxxxx') {
  let d = new Date().getTime()
  return format.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
}

/**
 * 是否数组
 * @param o
 * @returns
 */
export const isArray = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Array]'
}

/**
 * 是否布尔
 * @param o
 * @returns
 */
export const isBoolean = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Boolean]'
}

/**
 * 是否对象
 * @param o
 * @returns
 */
export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * 是否字符串
 * @param o
 * @returns
 */
export const isString = (o: any) => {
  return Object.prototype.toString.call(o) === '[object String]'
}

/**
 * 是否空值
 * @param o
 * @returns
 */
export const isBlank = (varValue: any) => {
  if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
    return false
  }
  return true
}

/**
 * 微信自带的附件预览
 * @param url
 * @param suffix
 */
export const getDwgUrl = (id: any) => {
  return `${process.env.VUE_APP_DWG_URL}/#/dwg/show/${id}`
}

export const filePreview = (attr: any) => {
  const url = attr.url
  // 判断文件类型
  if (url && typeof url === 'string') {
    const index = url.lastIndexOf('.')
    let suffix = url.substring(index + 1)
    if (suffix) {
      suffix = suffix.toLowerCase()
      switch (suffix) {
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'ppt':
        case 'pptx':
          uni.downloadFile({
            url: url,
            success(res: any) {
              const filePath = res.tempFilePath
              uni.openDocument({
                filePath: filePath,
                fileType: suffix,
                success() {
                  console.log('打开文档成功')
                },
                fail(e: any) {
                  uni.showToast({
                    title: e.errMsg,
                    icon: 'none'
                  })
                }
              })
            }
          })
          break
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
        case 'gif':
          // 预览图片
          uni.previewImage({
            urls: [url],
            longPressActions: {
              itemList: ['发送给朋友', '保存图片'],
              success() {},
              fail(err: any) {
                console.log(err.errMsg)
              }
            }
          })
          break
        default:
          uni.showToast({
            title: '文件不可预览',
            icon: 'none'
          })
          break
      }
    }
  }
}

export const preview = (url: string, suffix: string) => {
  const suffix1: any = suffix.toLowerCase()
  const fileTypeList = ['doc', 'xls', 'pdf', 'xlsx', 'docx', 'jpg', 'png']
  const fileTypeImg = ['jpg', 'png']
  if (fileTypeImg.some(e => e === suffix1)) {
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
  if (fileTypeList.every(e => e !== suffix1)) {
    uni.showToast({
      title: '文件不支持预览',
      image: '../../static/alert.png',
      mask: true,
      duration: 1500
    })
  }
  wx.downloadFile({
    url: url,
    success(res: any) {
      const filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        fileType: suffix1,
        success() {},
        fail(res: any) {
          console.log(res)
        }
      })
    },
    fail(res: any) {
      console.log(res)
    }
  })
}

/**
 * 获取文件名称
 * @param name - 文件名称
 * @returns
 */
export function getFileName(name: string) {
  const pattern: any = /\.{1}[a-z]{1,}$/
  if (pattern.exec(name) !== null) {
    return name.slice(0, pattern.exec(name).index)
  } else {
    return name
  }
}

/**
 * 获取文件类型
 * @param name - 文件名称
 * @returns
 */
export function getFileType(name: string) {
  if (!name || typeof name !== 'string') {
    return ''
  }
  const a = name.split('').reverse().join('')
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('')
  return b
}

/**
 * 拷贝对象
 * @param source
 * @returns
 */
export function cloneObj(source: any) {
  if (!source || typeof source !== 'object') {
    return source
  }
  let current: any
  const target = source.constructor === Array ? [] : {}
  // 用数组作为容器
  // 记录被拷贝的原对象和目标
  const cloneQueue = [
    {
      source,
      target
    }
  ]
  // 先进先出，更接近于递归
  while ((current = cloneQueue.shift())) {
    for (const key in current.source) {
      if (Object.prototype.hasOwnProperty.call(current.source, key)) {
        if (current.source[key] && typeof current.source[key] === 'object') {
          current.target[key] = current.source[key].constructor === Array ? [] : {}
          cloneQueue.push({
            source: current.source[key],
            target: current.target[key]
          })
        } else {
          current.target[key] = current.source[key]
        }
      }
    }
  }
  return target
}

/**
 * 检测参数过滤空值
 * @param params
 * @returns
 */
export function checkParams(params: any) {
  if (typeof params !== 'object') return params
  for (const key in params) {
    const value = params[key]
    if (value === null || value === undefined || value === '') {
      delete params[key]
    }
  }
  return params
}

/**
 * 当前页面
 * @returns
 */
export function currentPage() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage || {}
}

/**
 * 检测图片是否失效
 * @param url
 * @returns
 */
export function checkImgExists(url: string) {
  return new Promise(function (resolve) {
    const imgObj = new Image()
    imgObj.src = url
    imgObj.onload = function () {
      if (imgObj.width > 0 && imgObj.height > 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    }
    imgObj.onerror = function () {
      resolve(false)
    }
  })
}

/**
 * 对象参数转拼接字符
 * @param params
 * @returns
 */
export function paramsToStr(params: any) {
  let p = ''
  if (typeof params === 'object') {
    p = '?'
    for (const props in params) {
      p += `${props}=${params[props]}&`
    }
    p = p.slice(0, -1)
  }
  return p
}

/**
 * 缓存数据
 * @param key
 * @param value
 */
export function setStorage(key: string, value: any) {
  uni.setStorageSync(key, JSON.stringify(value))
}

/**
 * 读取缓存
 * @param key
 * @returns
 */
export function getStorage(key: string) {
  const res = uni.getStorageSync(key)
  if (res) {
    return JSON.parse(res)
  } else {
    return false
  }
}

/**
 * 删除缓存
 * @param key
 */
export function removeStorage(key: string) {
  uni.removeStorageSync(key)
}

/**
 * 清除缓存
 */
export function clearStorage() {
  uni.clearStorageSync()
}

/**
 * 提示
 * @param msg
 * @param type
 */
export function showToast(msg: any, type = 'fail') {
  const options = typeof msg === 'object' ? msg : { title: msg, duration: 3000 }
  if (type === 'fail') options['icon'] = 'none'
  uni.showToast(options)
}

/**
 * 显示加载
 * @param msg
 */
export function showLoading(msg: any) {
  const options = typeof msg === 'object' ? msg : { title: msg }
  uni.showLoading(options)
}

/**
 * 隐藏加载
 */
export function hideLoading() {
  uni.hideLoading()
}
