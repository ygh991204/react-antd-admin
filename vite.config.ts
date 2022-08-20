import { defineConfig } from 'vite'
import { build } from './build/build'
import { envPrefix, Env } from './build/constant'
import { modifyVars } from './build/theme'
import { plugins } from './build/plugins'
import { proxy } from './build/proxy'
import path from 'path'

export default defineConfig(() => {
  return {
    plugins: plugins,
    envPrefix,
    base: '/',
    server: {
      host: '127.0.0.1',
      port: Env.APP_PROT,
      open: Env.APP_OPEN,
      proxy: proxy
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: modifyVars
        }
      }
    },
    build: build,
    optimizeDeps: {
      include: [
        '@ant-design/icons',
        '@ant-design/charts',
        'antd/lib/locale/zh_CN',
        'antd/lib/locale/en_US',
        'dayjs/locale/zh',
        'dayjs/locale/en'
      ]
    }
  }
})
