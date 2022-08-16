const { getThemeVariables } = require('antd/dist/theme')

export function createModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    '@menu-collapsed-width': '50px'
  }
}
