
import react from '@vitejs/plugin-react'
// import legacy from '@vitejs/plugin-legacy'

import htmlPlugin from './html'
import mockPlugin from './mock'
import svgIconsPlugin from './svgIcons'
import styleImportPlugin from './styleImport'

export const createPlugins = (isBuild, env) => {
  const plugins = [
    react()
    // legacy()
  ]
  plugins.push(htmlPlugin(isBuild, env))
  plugins.push(mockPlugin(isBuild, env))
  plugins.push(svgIconsPlugin(isBuild, env))
  plugins.push(styleImportPlugin(isBuild, env))
  return plugins
}
