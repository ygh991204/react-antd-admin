import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import { VitePWA } from 'vite-plugin-pwa'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function createPlugins(isBuild: boolean, env: ImportMetaEnv) {
  const plugins = [react(), legacy()]
  console.log(isBuild, env)
  plugins.push(
    createHtmlPlugin({
      minify: isBuild,
      inject: {
        data: {
          title: env.VITE_TITLE
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
  if (isBuild) {
    plugins.push(
      VitePWA({
        manifest: {
          name: env.VITE_TITLE,
          short_name: env.VITE_SHORT_TITLE,
          icons: [
            {
              src: '/logo.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/logo-2.png',
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
  return plugins
}
