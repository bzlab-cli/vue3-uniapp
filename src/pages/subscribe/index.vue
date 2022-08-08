<template>
  <view class="subscribe">
    <custom-nav title="订阅" />
    <view v-if="addTipShow" class="addTip">
      点击
      <image class="icon28" src="/static/images/subscribe/icon28.png"></image>
      添加到我的小程序，下次打开更方便
      <image class="icon29" src="/static/images/subscribe/icon29.png" @click="closeTipClk"></image>
    </view>
    <view class="subscribeWrap">
      <view v-if="subscribeType == 1" class="wrap">
        <view class="subscribeTitle">
          <image class="icon4" src="/static/images/subscribe/icon4.png"></image>
          <text class="name">授权订阅消息</text>
        </view>
        <view class="subscribeContent">
          <view class="row">点击「去授权」，选择</view>
          <view class="row">
            <image class="icon22" src="/static/images/subscribe/icon22.png"></image>
            并「允许」
          </view>
          <view class="row">以便每次更新可以第一时间通知到您。</view>
        </view>
        <view class="subscribeBtn" @click="subscribeClk">
          去授权
          <image class="icon30" src="/static/images/subscribe/icon30.png"></image>
        </view>
      </view>
      <view v-if="subscribeType == 2" class="wrap">
        <view class="subscribeTitle">
          <image class="icon4" src="/static/images/subscribe/icon4.png"></image>
          <text class="name">授权订阅消息</text>
        </view>
        <view class="subscribeContent">
          <view class="row">点击「设置」</view>
          <view class="row">
            选择「订阅消息」选中 「
            <image class="icon26" src="/static/images/subscribe/icon26.png"></image>
            」
          </view>
          <view class="row">以便每次更新可以第一时间通知到您。</view>
        </view>
        <view class="subscribeBtn" @click="setupClk">设置</view>
      </view>
      <view v-if="subscribeType == 3" class="wrap">
        <view class="subscribeTitle">
          <image class="icon4" src="/static/images/subscribe/icon4.png"></image>
          <text class="name">授权订阅消息</text>
        </view>
        <view class="subscribeContent">
          <view class="row">点击「设置」</view>
          <view class="row">
            选择「订阅消息」开启「接受订阅消息
            <image class="icon25" src="/static/images/subscribe/icon25.png"></image>
            」
          </view>
          <view class="row">
            并选中 「
            <image class="icon26" src="/static/images/subscribe/icon26.png"></image>
            」
          </view>
          <view class="row">以便每次更新可以第一时间通知到您。</view>
        </view>
        <view class="subscribeBtn" @click="setupClk">设置</view>
      </view>
    </view>
    <view class="versionList" @click="handleVersionList">版本列表</view>
  </view>
</template>

<script lang="ts" setup>
import customNav from '@/components/custom-nav'
import { reactive, toRefs } from 'vue'

const state = reactive({
  addTipShow: false,
  tmplIds: 'dg9mgWzF1eDIHtlfegPcguygPscyZYmqg4_-yjQiGUc',
  subscribeType: 0,
  subscribeNumber: 0
})

function closeTipClk() {
  state.addTipShow = false
}

function onLoad() {
  getSubscribeState()
}

onLoad()

function getSubscribeState() {
  wx.getSetting({
    withSubscriptions: true,
    success: function (res) {
      console.log('wx.getSetting success', res)
      // let a = res.subscriptionsSetting.mainSwitch
      //   ? res.subscriptionsSetting.itemSettings
      //     ? 'accept' == res.subscriptionsSetting.itemSettings[state.tmplIds]
      //       ? 0
      //       : 'reject' == res.subscriptionsSetting.itemSettings[state.tmplIds]
      //       ? 2
      //       : 1
      //     : 1
      //   : 3

      let type = 0
      let mainSwitch = res.subscriptionsSetting.mainSwitch
      if (mainSwitch) {
        let itemSettings = res.subscriptionsSetting.itemSettings
        if (itemSettings) {
          if ('accept' == res.subscriptionsSetting.itemSettings[state.tmplIds]) {
            type = 0
          } else if ('reject' == res.subscriptionsSetting.itemSettings[state.tmplIds]) {
            type = 2
          } else {
            type = 1
          }
        } else {
          type = 1
        }
      } else {
        type = 3
      }

      state.subscribeType = type
    },
    fail: function (e) {
      console.log('err', e)
    }
  })
}

function handleVersionList() {
  console.log('state', state)

  if (state.subscribeType == 0 && state.subscribeNumber < 5) {
    addSubscribeNumber()
  }
}

function addSubscribeNumber() {
  wx.requestSubscribeMessage({
    tmplIds: [state.tmplIds],
    success: function (res) {
      if ('accept' == res[state.tmplIds]) {
        getSubscribeState()
      }
    },
    fail: function (res) {
      console.log('授权失败：code：' + res.errMsg)
    }
  })
}

function subscribeClk() {
  addSubscribeNumber()
}

function setupClk() {
  wx.openSetting()
}

const { addTipShow, subscribeType } = toRefs(state)
</script>

<style lang="scss" scoped>
.subscribe {
  .addTip {
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    background: rgba(231, 193, 140, 1);
    font-size: 26rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    position: fixed;
    top: 22rpx;
    right: 24rpx;
    z-index: 2;

    &::before {
      content: ' ';
      width: 0;
      height: 0;
      border-width: 20rpx;
      border-style: solid;
      border-color: transparent rgba(231, 193, 140, 1) transparent transparent;
      transform: rotate(90deg);
      position: absolute;
      top: -36rpx;
      right: 104rpx;
    }

    .icon28 {
      width: 31rpx;
      height: 12rpx;
      margin: 0 10rpx;
    }

    .icon29 {
      width: 50rpx;
      height: 50rpx;
      margin-left: 18rpx;
    }
  }

  .subscribeWrap {
    padding: 24rpx;
    background-color: #f5f5f5;

    .wrap {
      background: rgba(255, 255, 255, 1);
      border: 1rpx solid rgba(243, 243, 243, 1);
      box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(36, 34, 50, 0.04);
      margin-bottom: 44rpx;
      font-size: 30rpx;
    }

    .subscribeTitle {
      display: flex;
      align-items: center;
      padding: 24rpx 24rpx;
      border-bottom: solid 1rpx #ececec;
      font-size: 32rpx;
      font-weight: bold;
    }

    .subscribeTitle .icon4 {
      width: 44rpx;
      height: 44rpx;
      margin-right: 15rpx;
    }

    .subscribeContent {
      padding: 24rpx;
    }

    .subscribeContent .row {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }

    .subscribeContent .row .icon22 {
      width: 424rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }

    .subscribeContent .row .icon23 {
      width: 43rpx;
      height: 19rpx;
      margin: 0 10rpx;
    }

    .subscribeContent .row .icon24 {
      width: 60rpx;
      height: 60rpx;
      margin: 0 10rpx;
    }

    .subscribeContent .row .icon25 {
      width: 65rpx;
      height: 39rpx;
      margin: 0 10rpx;
    }

    .subscribeContent .row .icon26 {
      width: 228rpx;
      height: 42rpx;
      margin: 0 10rpx;
    }

    .subscribeBtn {
      width: 100%;
      padding: 18rpx 0;
      color: #fff;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(36, 34, 50, 0.04);
      background: linear-gradient(to right, #e0cba8, #cdb387);
    }

    .subscribeBtn .icon30 {
      width: 11rpx;
      height: 17rpx;
      margin: 0 15rpx;
    }
  }
}
</style>
