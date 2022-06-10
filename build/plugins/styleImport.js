
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default (isBuild, env) => {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: name => `antd/es/${name}/style/index`
      }
    ]
  })
}
