<template>
  <view class="nav-wrap" :style="['background:' + props.bgColor]">
    <view class="status-bar" :style="['height:' + statusBarHeight + 'rpx']"></view>
    <view class="header">
      <view class="nav-title" :style="['color: ' + props.fontColor]">{{ props.title }}</view>
      <view v-if="showBack || showHome" class="'nav-capsule is-both">
        <view v-if="showBack" class="nav-icon-wrap" @click="handleBack">
          <view class="iconfont icon-back" :style="['color: ' + props.iconColor]"></view>
        </view>
        <view v-if="showBack && showHome" :class="['navbar-v-line ' + props.borderType]"></view>
        <view v-if="showHome" class="nav-icon-wrap" @click="handleHome">
          <view class="iconfont icon-home" :style="['color: ' + props.iconColor]"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, watch, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  borderType: {
    type: String,
    default: 'black'
  },
  iconColor: {
    type: String,
    default: '#333'
  },
  bgColor: {
    type: String,
    default: '#F8F9FB'
  },
  fontColor: {
    type: String,
    default: '#333'
  },
  hideBack: {
    type: Boolean,
    default: false
  },
  hideHome: {
    type: Boolean,
    default: false
  }
})

const statusBarHeight = computed(() => {
  return store.state.app.statusBarHeight
})

const state = reactive({
  showBack: true,
  showHome: true
})

watch(
  () => [props.hideBack, props.hideHome],
  ([back, home]) => {
    state.showBack = !back
    state.showHome = !home
  },
  {
    immediate: true
  }
)

const handleBack = () => {
  wx.navigateBack({
    delta: 1
  })
}

const handleHome = () => {
  wx.reLaunch({
    url: '/pages/home/index'
  })
}

const { showBack, showHome } = toRefs(state)
</script>

<style lang="scss" scoped>
@font-face {
  font-display: swap;
  font-family: iconfont;
  font-style: normal;
  font-weight: 400;
  src: url('data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMEAA0AAAAABzAAAAKvAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCShEICoIIgV8LDAABNgIkAxQEIAWFCAdAGxYGEZWbYcl+JNhuo64ZupEbOsFKI3wZIUknQeRf9NXz3kkMpZjI4FDh7tGKFF10/mAkryVzXsubUS9USc6iBLJlujVZAEzcjFuEkxMMbQ7Nl+djUcAJBJxNW5QFMoC6LMGA/IHowzLAbsncWIWAN0fblYe3fR78zO0dqIy6SEImF3IkRN40NipDWpVeYAPwfPyoZ5QnKZPhTjJ8+tCpBnyz+6ZyVigVTM6KCgQgQ4bGAgyRCTSWa4+yciHldUolIL/B3w3+ZP/iEWUJQCQkAECAjxelkgTKgIrIMAyTADkAQqrTpcq8bbt2Hj16vO707cV6M3acOHZq187aUye133r99H63vabOtDjgpNUx9VasuPp08UylStn0qanSmlMFz/Uazlhz6945qWK258KDO/+0WzFuRrX501eef3K31b3zzxcV86tPH7to0wkzZp5+13139uLHr961fvfdVyvGjjd/2sozd9Oq2sVau9ruqjX6u+dtzPBv344vX1xrVTo/of6lGo3qV/upWrlGNS4BgeDLP78dEFbr81v5SrlFPE2pmPfICigvgWDhxfI+kPfAfzlAmRwQY8iFvA8CZfSSQEJFFVECUNMHAaijswChvNECJOXMEyBT3ooAufIOByijkicClFXeZwEq6hSDBKikVmyXibwCOmKjobpBaFLVFDRT3XwgRzaiZdR1Bi2rutdoRWP90F5J2xCGveOSx1TJmSR/ap2OQ1HDPezvqzP7N+b/6+WpDISPA8+8/HXxgr+nFU1enKJ+82Wtw+I7Hq67qvuOlxW4KkP20n5uWbcyIAsplrGXSxGNedeNMoXfafKUDm7aB9etDMjiSo15P5U5YRL+5PseUJHTwXWLkhWn4W6PE2m9yMwciRxAJdDvNcMAKNRIkVXosRIeCTiTOVQAAA==')
      format('woff2'),
    url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUAAA0AAAAABzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAE5AAAABoAAAAcjB2m7UdERUYAAATEAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjx3SB1jbWFwAAAB+AAAAEYAAAFK5iTpxWdhc3AAAAS8AAAACAAAAAj//wADZ2x5ZgAAAkwAAAD1AAABCCzE5OJoZWFkAAABMAAAAC8AAAA2GcnD4mhoZWEAAAFgAAAAHgAAACQIDwPCaG10eAAAAeQAAAAUAAAAFA2RAQBsb2NhAAACQAAAAAwAAAAMACoAhG1heHAAAAGAAAAAHgAAACABEQBGbmFtZQAAA0QAAAFJAAACiCnmEVVwb3N0AAAEkAAAACkAAABAqCasAnjaY2BkYGAA4s8/Hh2I57f5ysDNwgACt232f0LQ/xtZDJkbgFwOBiaQKACJdg0QAHjaY2BkYGBu+N/AEMNiwwAELIYMjAyogBUAUIoC2wAAeNpjYGRgYGBlsGJgYgABEMkFhAwM/8F8BgAOqQFYAAB42mNgZJFjnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7POJ/xMDf8b2CIYW5kaAAKM4LkAOYjDA8AAAQAAAAAAAAAAVUAAAQAAQAEPAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnnE+4/n/n4EBQkv+kvwBVQ8EjGwMcA4jE5BgYkAFjAzDHgAAvr0KsgAAAAAAAAAAAAAAKgCEeNodjsFKw0AYhP/Z6G4Wu6ubRLNJJIc0pAWDYiwtIvTkAyj0ID6BXrz4AtajjyKUvITgkwgKvfQuWxPnNAzfDEMAbd+8Pe+ZIqLdHJpVI1STGebIGRdgv5ILY2PpbgcDtH5sA8F99zT2rT3gQuJDDTU+peAm7qA76sSItsudc++FarokCgU/ZTNMmxj/+2cwGicoqsn0CkbCXDRHEe+DEZqcHZqhmXsPmS5TKKx1qfEjOe8/ZEiiZZim4cKt3Puid69hArS2LoINgqLGY6aQlQpfSrnMjxPDuTx21x1apfjGjWtd0tk0xH2HW7fBfl/+A73PLZYAAAB42n2QPU4DMRCFn/MHJBJCIKhdUQDa/JQpEyn0CKWjSDbekGjXXnmdSDkBLRUHoOUYHIAbINFyCl6WSZMia+3o85uZ57EBnOMbCv/fJe6EFY7xKFzBETLhKvUX4Rr5XbiOFj6FG9R/hJu4VQPhFi7UGx1U7YS7m9JtywpnGAhXcIon4Sr1lXCN/CpcxxU+hBvUv4SbGONXuIVrZakM4WEwQWCcQWOKDeMCMRwskjIG1qE59GYSzExPN3oRO5s4GyjvV2KXAx5oOeeAKe09t2a+Sif+YMuB1JhuHgVLtimNLiJ0KBtfLJzV3ahzsP2e7ba02L9rgTXH7FENbNT8Pdsz0khsDK+QkjXyMrekElOPaGus8btnKdbzXgiJTrzL9IjHmjR1OvduaeLA4ufyjBx9tLmSPfeoHD5jWQh5v91OxCCKXYY/k9hxGQAAAHjaY2BigAAuBuyAFYgZGZgYmRiZOTOT8/PikxKTsyGsjPzcVABN+Qd4AAAAAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9G2b/Z9gNABDqwc6AAA=')
      format('woff');
}

.iconfont {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: iconfont !important;
  font-size: 32rpx;
  font-style: normal;
}

.icon-back:before {
  content: '\e609';
}

.icon-home:before {
  content: '\e60c';
}

.nav-wrap {
  background: transparent;
  color: #000;
  position: sticky;
  top: 0;
  z-index: 999;
  .status-bar {
    width: 100%;
  }

  .header {
    box-sizing: border-box;
    position: relative;
    height: 80rpx;
    .nav-title {
      color: #333;
      font-size: 36rpx;
      font-weight: 600;
      left: 50%;
      margin: auto;
      max-width: 300rpx;
      overflow: hidden;
      position: absolute;
      text-overflow: ellipsis;
      top: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
}

.nav-capsule {
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  left: 14rpx;
}

.just-back,
.nav-capsule {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.just-back {
  left: 32rpx;
}

.nav-icon-wrap {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 7rpx 25rpx;
}

.is-both .navbar-v-line {
  background: rgba(0, 0, 0, 0.08);
  height: 40rpx;
  width: 2rpx;
}

.gray.is-both .navbar-v-line {
  background: hsla(0, 0%, 100%, 0.3);
}

.icon-back,
.icon-home {
  font-size: 34rpx;
}

.nav-capsule:after {
  border: 2rpx solid #e8eaef;
  border-radius: 64rpx;
  box-sizing: border-box;
  content: '';
  height: 200%;
  left: 0;
  position: absolute;
  top: 0;
  transform: scale(0.5);
  transform-origin: left top;
  width: 200%;
  z-index: -1;
}
</style>
