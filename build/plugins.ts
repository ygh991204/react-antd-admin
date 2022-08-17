import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import { VitePWA } from 'vite-plugin-pwa'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import eslint from 'vite-plugin-eslint'
import visualizer from 'rollup-plugin-visualizer'
import path from 'path'
import { isBuild, Env } from './constant'

const plugins = [react(), legacy(), eslint()]

plugins.push(
  createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: Env.APP_TITLE
      }
    }
  })
)
plugins.push(
  viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild
  })
)
if(Env.visualizer && isBuild) {
  plugins.push(
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  )
}
if (Env.APP_PWA && isBuild) {
  plugins.push(
    VitePWA({
      manifest: {
        name: Env.APP_TITLE,
        short_name: Env.APP_SHORT_TITLE,
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-big.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  )
}
plugins.push(
  createStyleImportPlugin({
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => `antd/es/${name}/style/index`
      }
    ]
  })
)
plugins.push(
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
    inject: 'body-last',
    customDomId: '__svg__icons__dom__'
  })
)

export {
  plugins
}
