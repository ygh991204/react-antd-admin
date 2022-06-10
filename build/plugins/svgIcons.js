import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default (isBuild, env) => {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
    inject: 'body-last',
    customDomId: '__svg__icons__dom__'
  })
}
