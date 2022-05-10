<template>
  <div
    class="nav-top"
    :style="{
      paddingTop: `${paddingTop}px`
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paddingTop: 0
    }
  },
  created() {
    try {
      const res = uni.getSystemInfoSync()
      //46为第三方导航栏的高度
      this.paddingTop = 46 + res.statusBarHeight
    } catch (e) {
      // error
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-top {
  position: relative;
}
</style>
