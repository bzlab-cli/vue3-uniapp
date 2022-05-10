/*
 * 小程序上传文件
 * 1、基础使用
 * let result = await new Upload().uploadImage(); 上传图片
 * let result = await new Upload().uploadFile(); 上传文件
 * @Author: jrucker
 * @Description:
 * @Date: 2022/03/11 16:50:49
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/10 23:21:58
 */

import { getFileType } from '@/utils'
import { getToken } from '@/utils/auth'
import FormData from './form-data'

export function getEnv(val) {
  const obj = {
    development: 'nzf-dev',
    deployment: 'nzf-dev',
    production: 'nzf-prod'
  }
  return obj[val]
}

type FileInfo = {
  name: string
  type: string
  size: number
  md5: string
}

export default class Upload {
  object: any
  obj: {
    ftp: boolean
    url: string
    header: { 'Content-Type': string }
    formData: {}
    count: number
    type: 'all' | 'video' | 'image' | 'file'
    sizeType: string[] // 可以指定是原图还是压缩图，默认二者都有
    sourceType: string[] // 可以指定来源是相册还是相机，默认二者都有
  }
  fileInfo: FileInfo
  constructor(object) {
    this.object = object || {}
    this.obj = {
      ftp: true,
      url: '',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {},
      count: 1,
      type: 'all',
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'] // 可以指定来源是相册还是相机，默认二者都有
    }
    this.fileInfo = {} as FileInfo
    if (Object.prototype.toString.call(this.object) === '[object Object]') {
      Object.assign(this.obj, this.object)
    } else {
      uni.showToast({
        title: '参数必须为对象',
        icon: 'none',
        duration: 2000
      })
    }

    return this
  }

  async uploadImage() {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const chooseImageResult = (await this.chooseImage()) as any
    const imgArr = await chooseImageResult.tempFilePaths.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      const uploadFileResult = (await this.handleUploadFile(item)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item.url
          return item
        })
        resolve(result)
      })
    })
  }

  async uploadFile() {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const chooseMessageResult = (await this.chooseMessageFile()) as any
    const imgArr = await chooseMessageResult.tempFiles.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      this.fileInfo.name = item.name
      this.fileInfo.type = getFileType(item.name) as any
      this.fileInfo.size = item.size
      const uploadFileResult = (await this.handleUploadFile(item.path)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item.url
          return item
        })
        resolve(result)
      })
    })
  }
  async uploadVideo() {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const chooseVideo = (await this.chooseVideo()) as any
    const imgArr = await chooseVideo.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      this.fileInfo.size = item.size
      const uploadFileResult = (await this.handleUploadFile(item.tempFilePath)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item.url
          return item
        })
        resolve(result)
      })
    })
  }

  getFileInfo(file) {
    return new Promise(resolve => {
      uni.getFileInfo({
        filePath: file,
        digestAlgorithm: 'md5',
        success: (res: any) => {
          this.fileInfo.md5 = res.digest
          this.obj.url = this.obj.url.replace('$md5', res.digest)
          resolve('done')
        }
      })
    })
  }

  async handleUploadFile(file) {
    console.log('file', file)
    this.obj.url =
      process.env.VUE_APP_FTP_API + `/ftp/uploadFile?path=${getEnv(process.env.VUE_APP_ENV)}/house_file/$md5`
    if (this.obj.url.includes('$md5')) {
      await this.getFileInfo(file)
    }

    return new Promise(async resolve => {
      const res = this.obj.ftp ? await this.ftpRequest(file) : await this.request(file)
      resolve(res)
    })
  }

  ftpRequest(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData() as any
      if (this.fileInfo.name) {
        formData.appendFile('file', file, this.fileInfo.name)
      } else {
        formData.appendFile('file', file)
      }

      const data = formData.getData()
      wx.request({
        url: this.obj.url,
        method: 'POST',
        header: {
          'Content-Type': data.contentType
        },
        data: data.buffer,
        success: res => {
          const result = res.data as any
          const url = result.data
          resolve({ url, ...this.fileInfo })
        },
        fail: () => {
          reject('上传失败')
        },
        complete: () => {
          uni.hideToast()
        }
      })
    })
  }

  request(file) {
    return new Promise((resolve, reject) => {
      console.log('file', file)

      uni.uploadFile({
        url: this.obj.url,
        filePath: file,
        name: 'file',
        header: this.obj.header,
        formData: {
          ...this.obj.formData,
          token: getToken()
        },
        success: res => {
          resolve(JSON.parse(res.data))
        },
        fail: () => {
          reject('上传失败')
        },
        complete: () => {
          uni.hideToast()
        }
      })
    })
  }

  chooseImage() {
    return new Promise(resolve => {
      uni.chooseImage({
        count: this.obj.count,
        sizeType: this.obj.sizeType,
        sourceType: this.obj.sourceType,
        success: res => {
          resolve(res)
        }
      })
    })
  }

  chooseVideo() {
    return new Promise(resolve => {
      uni.chooseVideo({
        sourceType: this.obj.sourceType,
        success: res => {
          resolve([res])
        }
      })
    })
  }

  chooseMessageFile() {
    return new Promise(resolve => {
      wx.chooseMessageFile({
        count: this.obj.count,
        type: this.obj.type,
        success: res => {
          resolve(res)
        }
      })
    })
  }
}
