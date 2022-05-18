import { createSSRApp } from 'vue'
import App from './App.vue'
import { store } from './store'
// import { loadAllPlugins } from '@/plugins'

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
  // loadAllPlugins(app)
  getSystemInfo()

  app.use(store)
  return {
    app
  }
}
