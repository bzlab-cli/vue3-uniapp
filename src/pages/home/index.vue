<template>
  <view class="home">
    <custom-nav title="首页" />
    <view @click="test">首页</view>
  </view>
</template>

<script lang="ts" setup>
import { login } from '@/api/user'

const test = () => {
  console.log('home')
  login({ test: 1 })
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
