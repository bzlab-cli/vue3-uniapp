<template>
  <view class="mine">
    <view @click="test">我的</view>
  </view>
</template>

<script lang="ts" setup>
import { login } from '@/api/user'

const test = () => {
  console.log('mine')
  login({ test: 1 })
}
</script>

<style lang="scss" scoped>
.mine {
}
</style>
