import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

const resolve = (src) => path.resolve(__dirname, src)

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        supportTs: false,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__'
      }),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: env.VITE_TITLE
          }
        },
        template: path.resolve(process.cwd(), 'public/index.html')
      })
    ],
    server: {
      host: '127.0.0.1',
      port: 8080,
      open: true,
      proxy: {}
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    }
  }
})
