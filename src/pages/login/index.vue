<template>
  <view class="login">
    <custom-nav hide-home title="登录"></custom-nav>
    <custom-layout>
      <view class="content">
        <view class="logo">
          <image src="/static/images/login/logo.png"></image>
          <view>小程序</view>
        </view>
        <view v-if="showMode == 'mobile'" class="mobile-box">
          <view class="input-wrap">
            <input
              v-model="mobile"
              placeholder="请输入手机号"
              :placeholderStyle="placeholderStyle"
              type="number"
              @input="handleMobileInput"
            />
          </view>
          <view class="input-wrap">
            <input
              v-model="code"
              placeholder="请输入验证码"
              :placeholderStyle="placeholderStyle"
              type="number"
              @input="handleMobileInput"
            />
            <view class="liner"></view>
            <view :class="['code', [codeActive ? 'active' : '']]" @click="getCode">
              {{ codeText }}
            </view>
          </view>
          <view class="submit-btn" :style="submitStyle" @click="confirmSubmit">登录</view>
        </view>
        <view v-if="showMode == 'wechat'" class="wechat-box">
          <button bindgetphonenumber="getPhoneNumber" class="number-btn" openType="getPhoneNumber">
            <view class="icon-wrap">
              <image class="wechat-icon mr5" src="/static/images/login/wechat.png" />
            </view>
            <view class="t-center">微信登录</view>
          </button>
        </view>
        <view class="check-box" @click="checked = !checked">
          <view class="tips-check icon-wrap">
            <image v-if="checked" class="icon" src="/static/images/login/muti-selected.png" />
            <image v-if="!checked" class="icon" src="/static/images/login/muti-unselected.png" />
          </view>
          我已阅读并同意
          <label class="agree">用户使用协议</label>
          与
          <label class="agree">隐私政策</label>
        </view>
        <view class="other-box">
          <text class="text" @click="handleSwitchLogin">其他方式登录 ></text>
        </view>
        <view class="desc-box">
          <view class="desc">未注册用户登录后自动创建账号</view>
        </view>
      </view>
    </custom-layout>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue'

const state = reactive({
  showMode: 'wechat',
  mobile: '',
  code: '',
  placeholderStyle: 'color: #ccc',
  codeText: '获取验证码',
  codeActive: false,
  submitActive: false,
  checked: false
})

const submitStyle = computed(() => {
  return {
    opacity: state.submitActive ? '1' : '0.5'
  }
})

const handleMobileInput = () => {
  state.codeActive = !!state.mobile
  state.submitActive = !!state.code && !!state.mobile
}

const handleSwitchLogin = () => {
  state.showMode = state.showMode === 'wechat' ? 'mobile' : 'wechat'
}

const getCode = () => {}

const confirmSubmit = () => {
  state.submitActive && smsLogin()
}

const smsLogin = () => {
  wx.showLoading({
    title: '登录中',
    mask: true,
    showIcon: true
  })
  uni.switchTab({
    url: '/pages/home/index'
  })
}
const { showMode, mobile, code, placeholderStyle, codeActive, checked, codeText } = toRefs(state)
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.login {
  height: 100%;
  .content {
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 112rpx;
      padding-bottom: 80rpx;
      width: 100%;
      color: #333;
      image {
        height: 110rpx;
        width: 120rpx;
      }
    }
    .mobile-box {
      .input-wrap {
        align-items: center;
        border-bottom: 1rpx solid #eaeaea;
        display: flex;
        height: 100rpx;
        margin: 0 auto 15rpx;
        padding-bottom: 18rpx;
        padding-left: 28rpx;
        padding-top: 18rpx;
        width: 686rpx;
        box-sizing: border-box;
        input {
          font-size: 30rpx;
          color: #000;
          height: 100%;
          line-height: 32rpx;
          outline: none;
          width: 100%;
          flex: 1;
        }
      }
      .code {
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
      .submit-btn {
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
    }
    .wechat-box {
      .number-btn {
        align-items: center;
        background: #07c160;
        border-radius: 50rpx;
        color: #fff;
        display: flex;
        font-size: 32rpx;
        height: 88rpx;
        justify-content: center;
        letter-spacing: 0;
        margin-left: 32rpx;
        margin-right: 32rpx;
        margin-top: 220rpx;
        text-align: center;
      }
      .wechat-icon {
        width: 22px;
        height: 22px;
      }
      .t-center {
        font-size: 32rpx;
      }
    }
    .check-box {
      align-items: center;
      display: flex;
      font-size: 24rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin: 66rpx 140rpx auto;
      text-align: center;
      .tips-check {
        height: 24rpx;
        padding-right: 12rpx;
        width: 24rpx;
      }

      .agree {
        color: #0065f2;
      }
    }
    .other-box {
      bottom: 124rpx;
      color: #0065f2;
      font-size: 24rpx;
      left: 0;
      position: fixed;
      right: 0;
      text-align: center;
    }
    .desc-box {
      bottom: 32rpx;
      color: #999;
      font-size: 20rpx;
      left: 0;
      line-height: 33rpx;
      position: fixed;
      right: 0;
      .desc {
        font-size: 20rpx;
        padding: 5rpx 0;
        text-align: center;
      }
    }
  }
}

.icon-wrap {
  align-items: center;
  display: flex;
  .icon {
    height: 100%;
    width: 100%;
  }
}
</style>
