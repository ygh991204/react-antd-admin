const { getThemeVariables } = require('antd/dist/theme')
const lessToJs = require('less-vars-to-js')
import fs from 'fs'
import path from 'path'

const paletteLess = fs.readFileSync(path.resolve(process.cwd(), 'src/assets/styles/theme.less'), 'utf8')

const palette = lessToJs(paletteLess, { resolveVariables: true, stripPrefix: false })

export const modifyVars = {
  ...getThemeVariables({ dark: false }),
  ...palette
}
