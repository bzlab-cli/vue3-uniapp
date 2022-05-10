<template>
  <view class="mine">
    <view>{{ name }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('我的')
</script>

<style lang="scss" scoped>
.mine {
}
</style>
