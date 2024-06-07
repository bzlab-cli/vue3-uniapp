<template>
  <view class="container" :style="containerStyle">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const statusBarHeight = computed(() => {
  return store.state.app.statusBarHeight
})

const headerHeight = computed(() => {
  return store.state.app.headerHeight
})

const containerStyle = computed(() => {
  return {
    paddingTop: statusBarHeight.value + headerHeight.value - 1 + 'rpx'
  }
})
</script>
