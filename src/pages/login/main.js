var e = require('../../@babel/runtime/helpers/interopRequireWildcard'),
  t = require('../../@babel/runtime/helpers/interopRequireDefault')

require('../../@babel/runtime/helpers/Arrayincludes')

var a,
  i = t(require('../../@babel/runtime/regenerator')),
  o = require('../../@babel/runtime/helpers/asyncToGenerator'),
  n = require('../../utils/assembly'),
  s = require('../../utils/storage/index'),
  c = t(require('../../modules/login/loginReq.js')),
  r = t(require('../../modules/login/index.js')),
  d = t(require('../../common/router/index')),
  l = t(require('../../common/config/index')),
  u = t(require('../../common/toast/index')),
  h = e(require('../../common/logs/index')),
  m = require('../../utils/system'),
  g = require('../../utils/network'),
  f = require('../../common/api/request'),
  p = t(require('../../utils/onfire')),
  k = require('../../common/api/header'),
  v = t(require('../../common/api/codeMsg')),
  b = require('../../components/verifyModal/utils')

Page({
  data: {
    navInfo: {
      bgColor: '#fff'
    },
    mode: '',
    hideNavHome: !1,
    totalTime: 60,
    modifyCodeText: '获取验证码',
    phoneNum: '',
    noback: '',
    modifyCode: '',
    modifyCanClick: !1,
    canSubmit: !1,
    isWxloginBtnDisable: !1,
    isShowAgreeModal: !1,
    isWifi: !0,
    isOpenFromPC: (0, m.getSystemInfo)('isPC'),
    urlsrc: '',
    tab: '',
    adlink: '',
    linkScene: '',
    linkID: '',
    targetDir: '',
    cloudID: '',
    invitationCode: '',
    validePeriod: '',
    familyName: '',
    creatTime: '',
    invalidTime: '',
    shareID: '',
    beFrom: '',
    isConnected: !0,
    messageID: '',
    verifyOptions: {
      loadStatus: !1,
      data: {}
    },
    verifyResult: {
      checkStatus: !1,
      code: ''
    },
    verifyConfig: {
      tip: '拖动滑块完成拼图，获取验证码',
      needSSO: !1
    },
    loginTipsChecked: !1,
    isShowTipsModal: !1,
    currentLoginType: ''
  },
  customData: {
    adLogId: '',
    verifyInfo: null,
    wxcodeTimer: null,
    clockTimer: null
  },
  onLoad:
    ((a = o(
      i.default.mark(function e(t) {
        var a,
          o,
          n = this
        return i.default.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (a = this), (e.next = 3), (0, f.getNetworkType)()

                case 3:
                  ;(o = e.sent),
                    this.setData({
                      isWifi: o && 'wifi' === o.networkType
                    }),
                    t.mode &&
                      this.setData({
                        mode: t.mode
                      }),
                    this.setData({
                      totalTime: 60,
                      modifyCodeText: '获取验证码',
                      urlsrc: t.urlsrc || this.data.urlsrc,
                      hideNavHome: t.hideNavHome || this.data.hideNavHome,
                      adlink: t.adlink || '',
                      tab: t.tab || '',
                      linkID: t.linkID || '',
                      linkScene: t.linkScene || '',
                      targetDir: t.targetDir || '',
                      cloudID: t.cloudID || '',
                      invitationCode: t.invitationCode || '',
                      validePeriod: t.validePeriod || '',
                      familyName: t.familyName || '',
                      creatTime: t.creatTime || '',
                      invalidTime: t.invalidTime || '',
                      beFrom: t.beFrom || '',
                      shareID: t.shareID || '',
                      messageID: t.messageID || '',
                      routeUrl: t.routeUrl || '',
                      loginTipsChecked: s.sessionStorage.get('loginTipsChecked') || !1
                    }),
                    (this.customData.adLogId = t.adLogId ? decodeURIComponent(t.adLogId) : ''),
                    this.initWxLoginCode(),
                    this.getLastWxCode(),
                    s.storage.set('isShowAuthorizeModal', !1),
                    p.default.on('changeNetWork', function (e) {
                      e !== a.data.isConnected &&
                        n.setData({
                          isConnected: e
                        })
                    })

                case 12:
                case 'end':
                  return e.stop()
              }
          },
          e,
          this
        )
      })
    )),
    function (e) {
      return a.apply(this, arguments)
    }),
  getLastWxCode: function () {
    var e = this
    this.customData.wxcodeTimer && clearInterval(this.customData.wxcodeTimer),
      (this.customData.wxcodeTimer = setInterval(function () {
        e.initWxLoginCode()
      }, 295e3))
  },
  onShow: function () {
    this.setData({
      loginTipsChecked: s.sessionStorage.get('loginTipsChecked') || !1
    }),
      h.default.report({
        key: 'LoginView'
      })
  },
  onUnload: function () {
    this.customData.clockTimer && clearInterval(this.customData.clockTimer),
      this.customData.wxcodeTimer && clearInterval(this.customData.wxcodeTimer),
      this.setData({
        totalTime: 60,
        modifyCodeText: '获取验证码'
      })
  },
  setTime: function () {
    var e,
      t = this
    this.data.modifyCanClick &&
      (0 === this.data.totalTime
        ? this.setData({
            modifyCodeText: '重新获取',
            modifyCanClick: !0
          })
        : (this.setData({
            modifyCodeText: this.data.totalTime + 's后重试',
            modifyCanClick: !1
          }),
          e && clearInterval(e),
          (e = setInterval(function () {
            t.setData({
              totalTime: t.data.totalTime - 1,
              modifyCodeText: t.data.totalTime - 1 + 's后重试',
              modifyCanClick: !1
            }),
              t.data.totalTime < 0 &&
                (clearInterval(e),
                t.setData({
                  modifyCodeText: '重新获取',
                  totalTime: 60,
                  modifyCanClick: !0
                }))
          }, 1e3)),
          (this.customData.clockTimer = e)))
  },
  checkChange: function () {
    this.setData({
      loginTipsChecked: !this.data.loginTipsChecked
    }),
      s.sessionStorage.set('loginTipsChecked', this.data.loginTipsChecked)
  },
  switchOtherLogin: function () {
    var e = ''
    ;(e = 'sms' === this.data.mode ? '' : 'sms'),
      this.setData({
        mode: e
      })
  },
  goToPage: function (e) {
    var t = 'agree' === e.currentTarget.dataset.type ? l.default.agreementUrl : l.default.policyUrl
    d.default.navigateTo({
      url: '/pages/webview/main?url='.concat(encodeURIComponent(t))
    })
  },
  handleNetWork: function () {
    u.default.hideLoading(),
      s.sessionStorage.get('network_isConnected')
        ? this.data.loginTipsChecked ||
          this.setData({
            isShowTipsModal: !0,
            currentLoginType: 'wxLogin'
          })
        : (0, g.netWorkBrokenTips)()
  },
  getCode: function () {
    var e = this
    return o(
      i.default.mark(function t() {
        var a, o, n, s, d
        return i.default.wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (e.data.modifyCanClick || !(e.data.totalTime > 0 || 60 !== e.data.totalTime)) {
                  t.next = 2
                  break
                }
                return t.abrupt('return')

              case 2:
                return (
                  h.default.report({
                    key: 'Login_Verification'
                  }),
                  (a = {
                    account: e.data.phoneNum,
                    reqType: 3
                  }),
                  (t.next = 6),
                  c.default.getSmsCode(a)
                )

              case 6:
                if (((o = t.sent), (n = o.success), (s = o.errCode), !n)) {
                  t.next = 14
                  break
                }
                u.default.showToast({
                  title: '验证码已发送',
                  position: 'bottom'
                }),
                  e.setTime(),
                  (t.next = 18)
                break

              case 14:
                if (!s || !b.showVerifyModalCode.includes(s)) {
                  t.next = 17
                  break
                }
                return e.selectComponent('.verifyModal').show(), t.abrupt('return')

              case 17:
                r.default.checkHasShowModal(s, {
                  checkFreeze: !0
                }) ||
                  ((d = v.default.loginCode[s] || ('netWorkError' === s && '网络异常，请稍后重试')),
                  u.default.showToast({
                    title: d || '发送失败，请稍后再试',
                    position: 'bottom'
                  }))

              case 18:
              case 'end':
                return t.stop()
            }
        }, t)
      })
    )()
  },
  handleVerifyModal: function (e) {
    var t = e.detail,
      a = t.type,
      i = t.data
    switch (a) {
      case 'verifyEnd':
        this.handleVerifyEnd(i)
        break

      case 'getVerifyOptions':
        this.getVerifyOptions()
        break

      case 'checkVerifyResult':
        this.checkVerifyResult(i)
        break

      case 'clearData':
        this.clearVerifyOptions(i)
    }
  },
  handleVerifyEnd: function (e) {
    'success' === e.code && (this.clearVerifyOptions(), this.setTime())
  },
  checkVerifyResult: function (e) {
    var t = this
    return o(
      i.default.mark(function a() {
        var o, n, s, r, d, l
        return i.default.wrap(function (a) {
          for (;;)
            switch ((a.prev = a.next)) {
              case 0:
                return (
                  (o = e.serverX),
                  (n = {
                    account: t.data.phoneNum,
                    reqType: 3,
                    puzzleVerfyCode: parseInt(o, 10)
                  }),
                  (a.next = 4),
                  c.default.getSmsCode(n)
                )

              case 4:
                ;(s = a.sent),
                  (r = s.success),
                  (d = s.errCode) && console.error('checkVerifyInfo', d),
                  (l = {
                    checkStatus: r,
                    code: d || ''
                  }),
                  t.setData({
                    verifyResult: l
                  })

              case 10:
              case 'end':
                return a.stop()
            }
        }, a)
      })
    )()
  },
  getVerifyOptions: function () {
    var e = this
    return o(
      i.default.mark(function t() {
        var a, o, n, s, r, d
        return i.default.wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (a = {
                    account: e.data.phoneNum,
                    type: '2'
                  }),
                  (t.next = 3),
                  c.default.getSmsSlideInfo(a)
                )

              case 3:
                ;(o = t.sent),
                  (n = o.success),
                  (s = o.result),
                  (r = o.errMsg) && console.error('getVerifyInfo', r),
                  (d = {
                    loadStatus: n,
                    data: s || {}
                  }),
                  e.setData({
                    verifyOptions: d
                  })

              case 10:
              case 'end':
                return t.stop()
            }
        }, t)
      })
    )()
  },
  clearVerifyOptions: function () {
    this.setData({
      verifyResult: {
        checkStatus: !1,
        code: ''
      },
      verifyOptions: {
        loadStatus: !1,
        data: {}
      }
    })
  },
  Login: function () {
    s.sessionStorage.get('network_isConnected')
      ? this.data.loginTipsChecked
        ? this.smsLogin()
        : this.setData({
            isShowTipsModal: !0,
            currentLoginType: 'sms'
          })
      : (0, g.netWorkBrokenTips)()
  },
  smsLogin: function () {
    var e = this,
      t = {
        account: this.data.phoneNum,
        dycPwd: this.data.modifyCode,
        loginStyle: 'passSMS',
        ifOpenAccount: 1
      }
    u.default.showLoading({
      title: '登录中',
      mask: !0,
      showIcon: !0
    }),
      c.default
        .doLoginRequest(t, {
          returnToken: !0
        })
        .then(function (t) {
          console.log('login: ', t),
            u.default.hideLoading(),
            r.default.loginSuccessFn(t, function (t) {
              e.loginSuccessGoBackPage(t)
            })
          var a = s.storage.get('login_tokenInfo')
          h.biLog.initPhone(a.account)
        })
        .catch(function (e) {
          u.default.hideLoading(),
            console.error('login error: ', e),
            h.wxlog.error('login error：', e),
            r.default.checkHasShowModal(e && e.code, {
              checkLogOut: !0,
              checkFreeze: !0,
              checkIot: !0,
              showDefaultMsg: !0
            })
        })
  },
  initWxLoginCode: function () {
    return new Promise(function (e, t) {
      wx.login({
        success: function (t) {
          console.log('Get login code success: ', t), s.sessionStorage.set('loginCode', t.code), e()
        },
        fail: function (e) {
          console.log('Get login code fail: ', e), t(e)
        }
      })
    })
  },
  getPhoneNumber: function (e) {
    if (s.sessionStorage.get('network_isConnected')) {
      u.default.showLoading({
        title: '加载中',
        mask: !0,
        showIcon: !0
      }),
        this.setData({
          isWxloginBtnDisable: !0
        }),
        h.default.report({
          key: 'LoginWechat'
        }),
        console.log(e)
      var t = e.detail,
        a = t.iv,
        i = t.encryptedData,
        o = this
      wx.checkSession({
        success: function () {
          console.log('checkSessionSuccess')
          var t = s.sessionStorage.get('loginCode')
          if ('getPhoneNumber:ok' === e.detail.errMsg) {
            var n = {
              wxSecret: ''.concat(i, '|').concat(a),
              dycPwd: t,
              loginStyle: 'thirdPartToken',
              ifOpenAccount: 1
            }
            o.wxLogin(n)
          } else {
            u.default.hideLoading()
            ;['deny', 'cancel'].find(function (t) {
              return e.detail.errMsg.includes(t)
            })
              ? u.default.showToast({
                  title: '授权已取消'
                })
              : u.default.showToast({
                  title: '授权失败'
                }),
              o.setData({
                isWxloginBtnDisable: !1
              }),
              s.sessionStorage.set('loginCode', t)
          }
        },
        fail: function () {
          console.log('checkSessionFail'),
            u.default.hideLoading(),
            wx.login({
              success: function (t) {
                if ((s.sessionStorage.set('loginCode', t.code), 'getPhoneNumber:ok' === e.detail.errMsg)) {
                  var n = {
                    wxSecret: ''.concat(i, '|').concat(a),
                    dycPwd: t.code,
                    loginStyle: 'thirdPartToken',
                    ifOpenAccount: 1
                  }
                  o.wxLogin(n)
                } else
                  e.detail.errMsg.includes('deny') &&
                    u.default.showToast({
                      title: '授权已取消'
                    }),
                    o.setData({
                      isWxloginBtnDisable: !1
                    }),
                    s.sessionStorage.set('loginCode', t.code)
              },
              fail: function () {
                o.setData({
                  isWxloginBtnDisable: !1
                })
              }
            })
        }
      })
    } else (0, g.netWorkBrokenTips)()
  },
  wxLogin: function (e) {
    var t = this
    return o(
      i.default.mark(function a() {
        return i.default.wrap(
          function (a) {
            for (;;)
              switch ((a.prev = a.next)) {
                case 0:
                  if (((a.prev = 0), e.dycPwd)) {
                    a.next = 5
                    break
                  }
                  return (a.next = 4), t.initWxLoginCode()

                case 4:
                  e.dycPwd = s.sessionStorage.get('loginCode')

                case 5:
                  c.default
                    .doLoginRequest(e, {
                      returnToken: !0
                    })
                    .then(function (e) {
                      console.log('login: ', e),
                        t.setData({
                          isWxloginBtnDisable: !1
                        }),
                        r.default.loginSuccessFn(e, function (e) {
                          t.loginSuccessGoBackPage(e)
                        }),
                        u.default.hideLoading()
                      var a = s.storage.get('login_tokenInfo')
                      h.biLog.initPhone(a.account)
                    })
                    .catch(function (e) {
                      t.initWxLoginCode(),
                        u.default.hideLoading(),
                        t.setData({
                          isWxloginBtnDisable: !1
                        }),
                        console.error('login error: ', e),
                        r.default.checkHasShowModal(e && e.code, {
                          checkLogOut: !0,
                          checkFreeze: !0,
                          checkIot: !0,
                          showDefaultMsg: !0
                        })
                    }),
                    (a.next = 15)
                  break

                case 8:
                  ;(a.prev = 8),
                    (a.t0 = a.catch(0)),
                    u.default.hideLoading(),
                    u.default.showToast({
                      title: '微信登录失败，请重试'
                    }),
                    t.initWxLoginCode(),
                    t.setData({
                      isWxloginBtnDisable: !1
                    }),
                    h.wxlog.error('wxLogin error: ', a.t0)

                case 15:
                case 'end':
                  return a.stop()
              }
          },
          a,
          null,
          [[0, 8]]
        )
      })
    )()
  },
  comfirmSubmit: function () {
    this.data.canSubmit && this.Login()
  },
  phoneOnInput: function (e) {
    var t = e.detail.value.trim()
    this.setData({
      phoneNum: t
    }),
      !(0, n.isPoneAvailable)(this.data.phoneNum) ||
      (0 !== this.data.totalTime && 60 !== this.data.totalTime) ||
      this.data.modifyCodeText.includes('s')
        ? this.setData({
            modifyCanClick: !1
          })
        : this.setData({
            modifyCanClick: !0
          }),
      !(0, n.isPoneAvailable)(t) ||
      (0 !== this.data.totalTime && 60 !== this.data.totalTime) ||
      this.data.modifyCodeText.includes('s')
        ? this.setData({
            modifyCanClick: !1
          })
        : this.setData({
            modifyCanClick: !0
          })
  },
  codeOnInput: function (e) {
    var t = e.detail.value.trim()
    this.setData({
      modifyCode: t
    }),
      (0, n.isPoneAvailable)(this.data.phoneNum) && this.data.modifyCode
        ? this.setData({
            canSubmit: !0
          })
        : this.setData({
            canSubmit: !1
          })
  },
  goToAutoLogin: function () {
    s.sessionStorage.get('network_isConnected')
      ? this.data.loginTipsChecked
        ? this.autoLogin()
        : this.setData({
            isShowTipsModal: !0,
            currentLoginType: 'autoLogin'
          })
      : (0, g.netWorkBrokenTips)()
  },
  autoLogin: function () {
    var e = this
    wx.getNetworkType({
      success: function (t) {
        var a = t.networkType
        ;['2g', '3g', '4g', '5g'].indexOf(a) > -1
          ? e.routeToAutoLoginPage()
          : 'wifi' === a &&
            u.default.showToast({
              title: '请关闭WIFI，切换至移动数据网络下使用'
            })
      },
      fail: function (e) {
        u.default.showToast({
          title: '网络异常，请稍后重试'
        })
      }
    })
  },
  onCheckBtnEvent: function () {
    switch (
      (this.setData({
        loginTipsChecked: !0,
        isShowTipsModal: !1
      }),
      s.sessionStorage.set('loginTipsChecked', !0),
      this.data.currentLoginType)
    ) {
      case 'wxLogin':
        u.default.showLoading({
          title: '加载中',
          mask: !0,
          showIcon: !0
        })
        break

      case 'autoLogin':
        this.autoLogin()
        break

      case 'sms':
        this.smsLogin()
    }
  },
  onCancelBtnEvent: function () {
    this.setData({
      isShowTipsModal: !1
    })
  },
  routeToAutoLoginPage: function () {
    var e = '/pages/home/main?tab=personal'
    switch (this.data.urlsrc) {
      case 'beshare':
        var t = JSON.parse(this.data.targetDir)
        e = this.data.targetDir
          ? '/pages/beshare/main?scene='
              .concat(this.data.linkScene, '&path=')
              .concat(t.path, '&caName=')
              .concat(t.caName)
          : '/pages/beshare/main?scene='.concat(this.data.linkScene)
        break

      case 'memoryalbum_beshare':
        e = '/pages/memoryalbum_beshare/main?linkID='.concat(this.data.linkID)
        break

      case 'group':
        e = '/pages/sub_pages/group_audit/index?messageID='.concat(this.data.messageID)
        break

      case 'cloudShare':
        var a = this.data,
          i = a.invitationCode,
          o = a.cloudID,
          n = a.validePeriod,
          s = a.familyName,
          c = a.creatTime,
          r = a.invalidTime
        e = '/pages/family/InviteFriends/main?invitationCode='
          .concat(i, '&cloudID=')
          .concat(o, '&validePeriod=')
          .concat(n, '&familyName=')
          .concat(s, '&creatTime=')
          .concat(c, '&invalidTime=')
          .concat(r)
        break

      case 'share_content':
        e = '/pages/share_content/main?beFrom='.concat(this.data.beFrom, '&shareID=').concat(this.data.shareID)
        break

      case 'link':
        e = '/pages/home/main?adlink='.concat(encodeURIComponent(this.data.adlink), '&tab=').concat(this.data.tab)
        break

      case 'marketing':
        e = '/pages/marketing/main'
        break

      case 'webview_special':
        e = '/pages/home/main?tab=me&urlsrc=webview_special&adlink='.concat(encodeURIComponent(this.data.adlink))
        break

      case 'webview_common':
        e = '/pages/home/main?tab=me&urlsrc=webview_common&adlink='.concat(encodeURIComponent(this.data.adlink))
        break

      default:
        e = this.data.routeUrl || e
    }
    var u = 'https://yun.139.com/miniprogram/wxautologin/#/?urlsrc=' + encodeURIComponent(e)
    u += '&version='
      .concat(encodeURIComponent(l.default.version), '&deviceInfo=')
      .concat(encodeURIComponent((0, k.getXDeviceInfo)()))
    var h = this.customData.adLogId ? '&adLogId='.concat(encodeURIComponent(this.customData.adLogId)) : ''
    d.default.navigateTo({
      url: '/pages/webview/main?url='.concat(encodeURIComponent(u)).concat(h)
    })
  },
  loginSuccessGoBackPage: function (e) {
    var t = '/pages/home/main'
    switch (this.data.urlsrc) {
      case 'beshare':
        var a = this.data,
          i = a.linkScene,
          o = a.targetDir
        if (o && 'undefined' !== o)
          try {
            var n = JSON.parse(o),
              s = n.path,
              c = n.caName
            t = '/pages/beshare/main?scene='.concat(i, '&path=').concat(s, '&caName=').concat(c)
          } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e)
            console.log(e)
          }
        else t = '/pages/beshare/main?scene='.concat(i)
        break

      case 'memoryalbum_beshare':
        var r = getCurrentPages()
        console.log('微信登录、验证码登录，层级：', r),
          (t = '/pages/memoryalbum_beshare/main?linkID='.concat(this.data.linkID))
        break

      case 'app':
        t = '/pages/wechat_backup/main'
        break

      case 'cloudShare':
        var d = this.data,
          l = d.invitationCode,
          u = d.cloudID,
          m = d.validePeriod,
          g = d.familyName,
          f = d.creatTime,
          p = d.invalidTime
        t = '/pages/family/InviteFriends/main?invitationCode='
          .concat(l, '&cloudID=')
          .concat(u, '&validePeriod=')
          .concat(m, '&familyName=')
          .concat(g, '&creatTime=')
          .concat(f, '&invalidTime=')
          .concat(p)
        break

      case 'share_content':
        var k = this.data,
          v = k.beFrom,
          b = k.shareID
        t = '/pages/share_content/main?beFrom='.concat(v, '&shareID=').concat(b)
        break

      case 'group':
        t = '/pages/sub_pages/group_audit/index?messageID='.concat(this.data.messageID)
        break

      case 'link':
        this.customData.adLogId &&
          h.default.report({
            key: 'AdsViewNologin',
            other: 'Adsid:' + this.customData.adLogId
          }),
          (t = '/pages/home/main?tab='.concat(this.data.tab, '&adlink=').concat(this.data.adlink))
        break

      case 'marketing':
        t = '/pages/marketing/main'
        break

      case 'webview_special':
        t = '/pages/home/main?tab=me&urlsrc=webview_special&adlink='.concat(this.data.adlink)
        break

      case 'webview_common':
        t = '/pages/home/main?tab=me&urlsrc=webview_common&adlink='.concat(this.data.adlink)
        break

      default:
        t = this.data.routeUrl ? decodeURIComponent(this.data.routeUrl) : '/pages/home/main'
    }
    wx.reLaunch({
      url: t,
      complete: function () {
        e && e()
      }
    })
  }
})
