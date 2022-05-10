import path, { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import viteSvgIcons from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import Vant from './src/utils/vant'

export default ({ command, mode }: any) => {
  console.log('command', command, mode)
  const getVantPaths = () => {
    const env = {
      dev: 'dev',
      deploy: 'build',
      prod: 'build'
    }

    const vantPaths = Array.from(Vant(), item => {
      return {
        src: resolve(`node_modules/@vant/weapp/dist/${item}`),
        dest: resolve(`dist/${env[mode]}/mp-weixin/wxcomponents/vant`)
      }
    })
    return [...vantPaths]
  }

  const config = {
    base: '/',
    plugins: [
      uni(),
      vue(),
      vueJsx(),
      eslintPlugin(),
      // #ifdef H5
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // #endif
      copy({
        targets: getVantPaths() as any
      })
    ],
    server: {
      cors: true,
      port: 6450,
      proxy: {
        '/business-web': {
          target: 'http://localhost:6300',
          changeOrigin: true
        }
      }
    },
    build: {
      minify: 'terser',
      brotliSize: false,
      chunkSizeWarningLimit: 5000,
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    } as any,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/common/variables.scss";`
        }
      }
    }
  }

  if (mode !== 'dev') {
    config.build.terserOptions = {
      compress: {
        drop_console: false,
        pure_funcs: ['console.log', 'console.info'],
        drop_debugger: true
      }
    }
  }

  return config
}

// import { defineConfig } from 'vite'
// import { resolve } from 'path'
// import uni from '@dcloudio/vite-plugin-uni'

// export default defineConfig({
//   resolve: {
//     alias: [
//       {
//         find: '@',
//         replacement: resolve(__dirname, 'src')
//       }
//     ]
//   },
//   plugins: [uni()]
// })
