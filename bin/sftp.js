#!/usr/bin/env node
const path = require('path')
const sftpUpload = require('@bzlab/bz-sftp-upload')

const sftp = new sftpUpload.default({
  dir: path.join(__dirname, '../wechat/bs-uniapp/'),
  remote: '/data/upload/wechat/bs-uniapp',
  host: '192.168.10.216',
  port: 22,
  username: 'sftpuser',
  password: '10b67f9a7556f46cdca24c483ba85993',
  // 过滤出需要删除的文件，返回true将会删除该文件（可选）
  deleteFilter() {
    return false
  }
})

sftp.put()
