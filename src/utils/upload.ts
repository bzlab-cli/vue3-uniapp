/*
 * 上传文件
 * 1、基础使用
 * let result = await new Upload().uploadImage(); 上传图片
 * let result = await new Upload().uploadFile(); 上传文件
 * @Author: jrucker
 * @Description:
 * @Date: 2022/03/11 16:50:49
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/03 11:39:47
 */

import { getFileName, getFileType, guid, getDeviceType } from '@/utils'
import { getToken } from '@/utils/auth'
import FormData from './form'
import { getEnv } from '@/config/settings'

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
    formData: any
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
      url:
        import.meta.env.VITE_APP_FTP_API + `/ftp/uploadFile?path=${getEnv(import.meta.env.VITE_APP_ENV)}/epc_file/$md5`,
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

  async uploadImage(params = {} as any) {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const onLimit = params.onLimit || null
    const chooseImageResult = (await this.chooseImage()) as any
    console.log('chooseImageResult', chooseImageResult)

    const imgArr = await chooseImageResult.tempFiles.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      let path = item.path
      this.fileInfo.name = getFileName(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.type = getFileType(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.size = item.size
      if (getDeviceType() === 'h5') {
        path = item
      }
      if (onLimit) {
        const before = onLimit(this.fileInfo)
        if (!before) return false
      }
      const uploadFileResult = (await this.handleUploadFile(path)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item?.url
          return item
        })
        resolve(result)
      })
    })
  }

  async uploadFile(params = {} as any) {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const onLimit = params.onLimit || null
    const chooseMessageResult = (await this.chooseMessageFile()) as any
    const imgArr = await chooseMessageResult.tempFiles.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      let path = item.path
      this.fileInfo.name = getFileName(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.type = getFileType(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.size = item.size
      if (getDeviceType() === 'h5') {
        path = item
      }
      if (onLimit) {
        const before = onLimit(this.fileInfo)
        if (!before) return false
      }
      const uploadFileResult = (await this.handleUploadFile(path)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item?.url
          return item
        })
        resolve(result)
      })
    })
  }
  async uploadVideo(params = {} as any) {
    if (Object.prototype.toString.call(this.object) !== '[object Object]') return
    const onLimit = params.onLimit || null
    const chooseVideo = (await this.chooseVideo()) as any
    const imgArr = await chooseVideo.tempFiles.map(async item => {
      uni.showLoading({
        title: `正在上传...`
      })
      let path = item.path
      this.fileInfo.name = getFileName(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.type = getFileType(getDeviceType() === 'h5' ? item.name : item.path)
      this.fileInfo.size = item.size
      if (getDeviceType() === 'h5') {
        path = item
      }
      if (onLimit) {
        const before = onLimit(this.fileInfo)
        if (!before) return false
      }
      const uploadFileResult = (await this.handleUploadFile(path)) as any
      return uploadFileResult
    })

    return new Promise(resolve => {
      Promise.all(imgArr).then((result: any) => {
        uni.hideLoading()
        result = result.map((item: any) => {
          item.url = '/img' + item?.url
          return item
        })
        resolve(result)
      })
    })
  }

  getFileInfo(file) {
    return new Promise(resolve => {
      if (getDeviceType() === 'h5') {
        const digest = guid()
        this.fileInfo.md5 = digest
        this.obj.url = this.obj.url.replace('$md5', digest)
        return resolve('done')
      }
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
    if (this.obj.url.includes('$md5')) {
      await this.getFileInfo(file)
    }
    return new Promise(async resolve => {
      let res
      if (getDeviceType() === 'h5') {
        res = await this.ftpH5Request(file)
      } else {
        res = await this.ftpRequest(file)
      }
      resolve(res)
    })
  }

  ftpH5Request(file) {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData()
      const name = this.fileInfo.name + '.' + this.fileInfo.type
      await formData.appendFile('file', file, name)
      const data = formData.getData()
      const header = {
        'Content-Type': data.contentType
      } as any
      if (getToken()) {
        header.token = getToken()
      }

      uni.request({
        url: this.obj.url,
        method: 'POST',
        header,
        data: data.buffer,
        success: res => {
          const result = res.data
          const url = result.data
          resolve({
            url,
            ...this.fileInfo
          })
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

  ftpRequest(file) {
    return new Promise((resolve, reject) => {
      const formData = this.obj.formData
      if (getToken()) {
        formData.token = getToken()
      }
      uni.uploadFile({
        url: this.obj.url,
        filePath: file,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data'
        },
        formData,
        success: res => {
          const result = JSON.parse(res.data)
          const url = result.data
          resolve({
            url,
            ...this.fileInfo
          })
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
