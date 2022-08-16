import { defineConfig } from 'vite'
import { createBuild } from './build/build'
import { createModifyVars } from './build/modifyVars'
import { envPrefix, Env } from './build/constant'
import { createPlugins } from './build/plugins'
import path from 'path'

export default defineConfig(() => {
  return {
    plugins: createPlugins(),
    envPrefix,
    base: '/',
    server: {
      host: '127.0.0.1',
      port: Env.APP_PROT,
      open: Env.APP_OPEN,
      proxy: {}
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
          modifyVars: createModifyVars()
        }
      }
    },
    build: createBuild(),
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
