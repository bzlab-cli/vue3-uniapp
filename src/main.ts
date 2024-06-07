import { createSSRApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import uviewPlus from 'uview-plus'
import customNav from '@/components/custom-nav/index.vue'
import customLayout from '@/components/custom-layout/index.vue'

const getSystemInfo = () => {
  uni.getSystemInfo({
    success: function (e: any) {
      console.log('getSystemInfo', e)
      store.commit('SET_STATE', {
        statusBarHeight: e.statusBarHeight * 2
      })
    }
  })
}

export function createApp() {
  const app = createSSRApp(App)
  app.component('CustomNav', customNav)
  app.component('CustomLayout', customLayout)
  app.use(uviewPlus)
  getSystemInfo()
  app.use(store)
  return {
    app
  }
}
