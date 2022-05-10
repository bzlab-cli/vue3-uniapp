<template>
  <view class="content">
    <!-- <svg-icon icon-class="dashboard" class="dashboard" /> -->
    <view class="mt-4">请求测试</view>
    <view @click="testReq">testReq</view>
  </view>
</template>

<script setup lang="ts">
import { login } from '@/api/user'

import { useStore } from 'vuex'
const store = useStore()

console.log('store', store)

//request
const testReq = () => {
  console.log('999')

  login({
    test: 1
  })
}
</script>

<style lang="scss" scoped></style>
