import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'
import copy from 'rollup-plugin-copy'
import Vant from './src/utils/vant'

export default ({ command, mode }) => {
  console.log('command', command, mode)
  const getVantPaths = () => {
    const env = {
      dev: 'dev',
      deploy: 'build',
      prod: 'build'
    }
    const vantPaths = Array.from(Vant(), item => {
      return {
        src: `node_modules/@vant/weapp/dist/${item}`,
        dest: `dist/${env[mode]}/mp-weixin/wxcomponents/vant`
      }
    })
    const binPaths = [
      {
        src: `bin`,
        dest: `dist/${env[mode]}/mp-weixin`
      }
    ]
    return [...vantPaths, ...binPaths]
  }

  const config = {
    base: '/',
    plugins: [
      uni(),
      eslintPlugin(),
      copy({
        targets: getVantPaths() as any
      })
    ],
    server: {
      cors: true,
      port: 6450,
      proxy: {
        '/village-service': {
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
          additionalData: `@import "@/styles/scss/variables.scss";`
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
