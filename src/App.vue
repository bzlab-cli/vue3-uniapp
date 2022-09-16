<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { autoUpdate } from '@/utils/update'
onLaunch(() => {
  console.log('App Launch')
  autoUpdate()
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@/styles/scss/index.scss';
@import 'uview-plus/index.scss';
</style>
