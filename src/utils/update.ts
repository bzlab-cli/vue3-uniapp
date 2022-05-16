/*
 * @Author: jrucker
 * @Description: 小程序检测新版本
 * @Date: 2021/09/02 16:08:22
 * @LastEditors: jrucker
 * @LastEditTime: 2022/05/11 17:45:36
 */

export const autoUpdate = () => {
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        //检测到新版本，需要更新
        wx.showModal({
          title: '更新提示',
          content: '检测到新版本，是否下载新版本并重启小程序？',
          success: function (res) {
            if (res.confirm) {
              downLoadAndUpdate(updateManager)
            } else if (res.cancel) {
              //用户点击取消按钮，强制更新
              wx.showModal({
                title: '温馨提示',
                content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问哦~',
                showCancel: false,
                confirmText: '确定更新',
                success: function (res) {
                  if (res.confirm) {
                    downLoadAndUpdate(updateManager)
                  }
                }
              })
            }
          }
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试'
    })
  }
}

export const downLoadAndUpdate = updateManager => {
  wx.showLoading()
  updateManager.onUpdateReady(function () {
    wx.hideLoading()
    updateManager.applyUpdate()
  })
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
    wx.hideLoading()
    wx.showModal({
      title: '已经有新版本了',
      content: '新版本已经上线，请您删除当前小程序，重新搜索打开哦~'
    })
  })
}
