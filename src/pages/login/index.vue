<template>
  <view class="login_wrap">
    <custom-nav :hide-home="hideNavHome" title=""></custom-nav>
    <view class="login_container">
      <view class="login_title">
        <image src="/static/images/login/logo.png"></image>
      </view>
      <view v-if="mode == 'sms'">
        <view class="input_wrap">
          <input
            class="flex_input"
            placeholder="请输入手机号"
            placeholderStyle="color:#cccccc"
            type="number"
            :value="phoneNum"
            @input="phoneOnInput"
          />
        </view>
        <view class="input_wrap">
          <input
            class="flex_input"
            placeholder="请输入验证码"
            placeholderStyle="color:#cccccc"
            type="number"
            :value="modifyCode"
            @input="codeOnInput"
          />
          <view class="liner"></view>
          <view :class="['login_getVerifyCode', [modifyCanClick ? 'activeFontColor' : '']]" @click="getCode">
            {{ modifyCodeText }}
          </view>
        </view>
        <view class="login_btn" :style="'opacity:' + (canSubmit ? '1' : '0.5') + ';'" @click="confirmSubmit">登录</view>
      </view>
      <view v-else>
        <button
          bindgetphonenumber="getPhoneNumber"
          class="wechatLogin"
          :disabled="isWxloginBtnDisable"
          openType="getPhoneNumber"
        >
          <view class="wechatlogin-logo icon-wrap">
            <image
              alt=""
              class="auth-icon"
              src="https://yun.mcloud.139.com/miniprogram/static/img/icon32/wechat_icon@2x.png"
            ></image>
          </view>
          <view class="authLoginText">微信登录</view>
        </button>
      </view>
      <view class="login_check" @click="checkChange">
        <view class="login-tips-check icon-wrap">
          <image v-if="loginTipsChecked" class="auth-icon" src="/static/images/login/muti-selected@2x.png" />
          <image v-if="!loginTipsChecked" class="auth-icon" src="/static/images/login/muti-unselected@2x.png" />
        </view>
        我已阅读并同意
        <label class="agree_tips" data-type="agree" @click="goToPage">用户使用协议</label>
        与
        <label class="agree_tips" data-type="secret" @click="goToPage">隐私政策</label>
      </view>
      <view class="other-login-tips">
        <text class="other-login-tips-btn" @click="switchOtherLogin">其他方式登录 ></text>
      </view>
      <view class="login_tips">
        <view class="login_tips_p">未注册用户登录后自动创建账号</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import customNav from '@/components/custom-nav'

const state = reactive({
  hideNavHome: false,
  mode: '',
  phoneNum: '',
  totalTime: 60,
  modifyCodeText: '获取验证码',
  modifyCanClick: false,
  modifyCode: '',
  canSubmit: false,
  loginTipsChecked: false,
  isWxloginBtnDisable: false
})

const phoneOnInput = e => {
  var t = e.detail.value.trim()
  state.phoneNum = t
  if ((0 !== state.totalTime && 60 !== state.totalTime) || state.modifyCodeText.includes('s')) {
    state.modifyCanClick = false
  } else {
    state.modifyCanClick = true
  }
}

const codeOnInput = e => {
  var t = e.detail.value.trim()
  state.modifyCode = t
  if (state.phoneNum && state.modifyCode) {
    state.canSubmit = true
  } else {
    state.canSubmit = false
  }
}

const switchOtherLogin = () => {
  if (state.mode === 'sms') {
    state.mode = ''
  } else {
    state.mode = 'sms'
  }
}

const getCode = () => {}

const confirmSubmit = () => {
  state.canSubmit && smsLogin()
}

const checkChange = () => {
  state.loginTipsChecked = !state.loginTipsChecked
}

const goToPage = () => {}

const smsLogin = () => {
  wx.showLoading({
    title: '登录中',
    mask: true,
    showIcon: true
  })
}
const { hideNavHome, mode, modifyCanClick, loginTipsChecked, modifyCodeText } = toRefs(state)
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.env-wrap {
  color: #000;
  font-size: 32rpx;
  left: 60rpx;
  position: fixed;
  top: 160rpx;
}

.login_wrap {
  background-color: #f8f9fb;
  height: 100%;
}

.login_title {
  -webkit-box-pack: center;
  display: flex;
  justify-content: center;
  margin-bottom: 80rpx;
  margin-top: 112rpx;
  width: 100%;
}

.login_title image {
  height: 124rpx;
  width: 300rpx;
}

.input_wrap {
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1rpx solid #eaeaea;
  display: flex;
  height: 100rpx;
  margin: 0 auto 28rpx;
  padding-bottom: 18rpx;
  padding-left: 28rpx;
  padding-top: 18rpx;
  width: 686rpx;
}

.input_wrap,
input {
  box-sizing: border-box;
  font-size: 32rpx;
}

input {
  color: #000;
  height: 100%;
  line-height: 32rpx;
  outline: none;
  width: 100%;
}

.flex_input {
  -webkit-box-flex: 1;
  flex: 1;
}

.login_getVerifyCode {
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  color: #0065f2;
  display: flex;
  font-size: 24rpx;
  height: 100rpx;
  justify-content: center;
  opacity: 0.5;
  width: 168rpx;
}

.activeFontColor {
  opacity: 1;
}

.liner {
  background: #eaeaea;
  height: 32rpx;
  width: 1rpx;
}

.login_btn {
  background: #0065f2;
  border-radius: 50rpx;
  color: #fff;
  font-size: 32rpx;
  height: 88rpx;
  letter-spacing: 0;
  line-height: 88rpx;
  margin: 54rpx 32rpx 0;
  text-align: center;
}

.wechatLogin,
button[disabled] {
  -webkit-box-pack: center !important;
  -webkit-box-align: center !important;
  align-items: center !important;
  background: #07c160 !important;
  border-radius: 50rpx !important;
  box-sizing: border-box !important;
  color: #fff !important;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: flex !important;
  font-size: 32rpx !important;
  height: 88rpx !important;
  justify-content: center !important;
  letter-spacing: 0 !important;
  margin-left: 32rpx !important;
  margin-right: 32rpx !important;
  margin-top: 220rpx !important;
  text-align: center !important;
}

.authLogin {
  -webkit-box-pack: center;
  background: none;
  border: 2rpx solid #0065f2;
  border-radius: 50rpx;
  color: #0065f2;
  font-size: 32rpx;
  height: 88rpx;
  justify-content: center;
  letter-spacing: 0;
  margin: 48rpx 32rpx;
  text-align: center;
}

.authLogin,
.icon-wrap {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
}

.authlogin-logo,
.wechatlogin-logo {
  height: 40rpx;
  padding-right: 6rpx;
  width: 40rpx;
}

.auth-icon {
  height: 100%;
  width: 100%;
}

.authLoginText,
.pass-login-tips {
  text-align: center;
}

.pass-login-tips {
  bottom: 204rpx;
  color: #0065f2;
  font-size: 24rpx;
  left: 0;
  margin: 128rpx auto 0;
  position: fixed;
  right: 0;
}

.pass-login-tips-btn {
  padding: 12rpx;
}

.other-login-tips {
  bottom: 124rpx;
  color: #0065f2;
  font-size: 24rpx;
  left: 0;
  position: fixed;
  right: 0;
  text-align: center;
}

.login_tips {
  bottom: 32rpx;
  color: #999;
  font-size: 20rpx;
  left: 0;
  line-height: 33rpx;
  position: fixed;
  right: 0;
}

.login_tips_p {
  padding: 5rpx 0;
  text-align: center;
}

.agree_tips {
  color: #0065f2;
}

.login-tips-check {
  height: 24rpx;
  padding-right: 12rpx;
  width: 24rpx;
}

.login_check {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  font-size: 24rpx;
  height: 80rpx;
  line-height: 80rpx;
  margin: 66rpx 140rpx auto;
  text-align: center;
}
</style>
