const { getThemeVariables } = require('antd/dist/theme')

export const modifyVars = {
  ...getThemeVariables({ dark: false }),
  '@menu-collapsed-width': '50px'
}
