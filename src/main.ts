import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
// import { loadAllPlugins } from '@/plugins'
// import 'virtual:svg-icons-register'
// import svgIcon from '@/icons/svg-icon.vue'

const app = createApp(App)
// loadAllPlugins(app)

uni.getSystemInfo({
  success: function (e: any) {
    // #ifdef MP-WEIXIN
    app.config.globalProperties.$StatusBar = e.statusBarHeight
    const custom = wx.getMenuButtonBoundingClientRect()
    app.config.globalProperties.$Custom = custom
    app.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight
    // #endif

    //窗口高度
    app.config.globalProperties.$windowHeight = e.windowHeight
    //获取导航高度
    app.config.globalProperties.$navHeight = e.statusBarHeight * (750 / e.windowWidth) + 91
    app.config.globalProperties.$SystemInfo = e
  }
})

app.use(store)
app.mount('#app')
