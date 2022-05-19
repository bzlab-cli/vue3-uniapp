<template>
  <view class="login-wrap">
    <custom-nav hide-home></custom-nav>
    <view class="login-container">
      <view class="title-box">
        <image src="/static/images/login/logo.png"></image>
      </view>
      <view v-if="mode == 'sms'" class="sms-box">
        <view class="input-wrap">
          <input
            class="flex-input"
            placeholder="请输入手机号"
            placeholderStyle="color: #cccccc"
            type="number"
            :value="phoneNum"
            @input="phoneOnInput"
          />
        </view>
        <view class="input-wrap">
          <input
            class="flex-input"
            placeholder="请输入验证码"
            placeholderStyle="color: #cccccc"
            type="number"
            :value="verifyCode"
            @input="codeOnInput"
          />
          <view class="liner"></view>
          <view :class="['verify-code', [canClickCode ? 'active' : '']]" @click="getCode">
            {{ codeText }}
          </view>
        </view>
        <view class="login-btn" :style="['opacity:' + (canSubmit ? '1' : '0.5') + '']" @click="confirmSubmit">
          登录
        </view>
      </view>
      <view v-else>
        <button
          bindgetphonenumber="getPhoneNumber"
          class="wechat-login"
          :disabled="wxBtnDisable"
          openType="getPhoneNumber"
        >
          <view class="wechat-logo icon-wrap">
            <image
              alt=""
              class="auth-icon"
              src="https://yun.mcloud.139.com/miniprogram/static/img/icon32/wechat_icon@2x.png"
            ></image>
          </view>
          <view class="auth-login-text">微信登录</view>
        </button>
      </view>
      <view class="login-check" @click="checkChange">
        <view class="login-tips-check icon-wrap">
          <image v-if="checked" class="auth-icon" src="/static/images/login/muti-selected@2x.png" />
          <image v-if="!checked" class="auth-icon" src="/static/images/login/muti-unselected@2x.png" />
        </view>
        我已阅读并同意
        <label class="agree-tips" data-type="agree" @click="goToPage">用户使用协议</label>
        与
        <label class="agree-tips" data-type="secret" @click="goToPage">隐私政策</label>
      </view>
      <view class="other-login-tips">
        <text class="other-login-tips-btn" @click="switchOtherLogin">其他方式登录 ></text>
      </view>
      <view class="login-tips">
        <view class="login-tips-p">未注册用户登录后自动创建账号</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import customNav from '@/components/custom-nav'

const state = reactive({
  mode: '',
  phoneNum: '',
  totalTime: 60,
  codeText: '获取验证码',
  canClickCode: false,
  verifyCode: '',
  canSubmit: false,
  checked: false,
  wxBtnDisable: false
})

const phoneOnInput = e => {
  let val = e.detail.value.trim()
  console.log('111', val)

  state.phoneNum = val
  state.canClickCode = !!val

  if (state.verifyCode && val) {
    state.canSubmit = true
  } else {
    state.canSubmit = false
  }

  // if ((0 !== state.totalTime && 60 !== state.totalTime) || state.codeText.includes('s')) {
  //   state.canClickCode = false
  // } else {
  //   state.canClickCode = true
  // }
}

const codeOnInput = e => {
  let val = e.detail.value.trim()
  console.log('222', val)

  state.verifyCode = val
  if (val && state.phoneNum) {
    state.canSubmit = true
  } else {
    state.canSubmit = false
  }
}

const switchOtherLogin = () => {
  state.mode = state.mode === 'sms' ? '' : 'sms'
}

const getCode = () => {}

const confirmSubmit = () => {
  state.canSubmit && smsLogin()
}

const checkChange = () => {
  state.checked = !state.checked
}

const goToPage = () => {}

const smsLogin = () => {
  wx.showLoading({
    title: '登录中',
    mask: true,
    showIcon: true
  })
}
const { mode, phoneNum, verifyCode, canClickCode, checked, canSubmit, codeText } = toRefs(state)
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.login-wrap {
  background-color: #f8f9fb;
  height: 100%;
  .login-container {
    .title-box {
      -webkit-box-pack: center;
      display: flex;
      justify-content: center;
      margin-bottom: 80rpx;
      margin-top: 112rpx;
      width: 100%;
      image {
        height: 124rpx;
        width: 300rpx;
      }
    }
    .sms-box {
      .input-wrap {
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
    }
  }
}

.input-wrap,
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

.flex-input {
  -webkit-box-flex: 1;
  flex: 1;
}

.verify-code {
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
  &.active {
    opacity: 1;
  }
}

.liner {
  background: #eaeaea;
  height: 32rpx;
  width: 1rpx;
}

.login-btn {
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

.wechat-login,
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
.wechat-logo {
  height: 40rpx;
  padding-right: 6rpx;
  width: 40rpx;
}

.auth-icon {
  height: 100%;
  width: 100%;
}

.auth-login-text,
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

.login-tips {
  bottom: 32rpx;
  color: #999;
  font-size: 20rpx;
  left: 0;
  line-height: 33rpx;
  position: fixed;
  right: 0;
}

.login-tips-p {
  padding: 5rpx 0;
  text-align: center;
}

.agree-tips {
  color: #0065f2;
}

.login-tips-check {
  height: 24rpx;
  padding-right: 12rpx;
  width: 24rpx;
}

.login-check {
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
