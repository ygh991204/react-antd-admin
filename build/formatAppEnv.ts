
/**
 * vite env，默认值
 */
const defaultAppEnv: AppEnv = {
  APP_BASE_URL: '',
  APP_LANGUAGE: 'zh_CN',
  APP_MODE: 'development',
  APP_PROT: 300,
  APP_TITLE: '',
  APP_SHORT_TITLE: '',
  APP_NODE_ENV: 'development',
  APP_TOKEN_KEY: 'token',
  APP_PWA: false,
  APP_OPEN: false,
  APP_FOOTER: '',
  APP_PASSWORD_EXPIRES: 7,
  APP_MOBILE_WIDTH: 992,
  APP_MOCK: false,
  APP_LEGACY: false,
  APP_COMPRESSION: false
}

/**
 * 合并默认值
 */
export function formatAppEnv(env: AppEnv) {
  const appEnv = env as IAnyObject
  return Object.assign({}, defaultAppEnv, Object.keys(appEnv).reduce((prev, key) => {
    prev[key] = formatEnvVal(appEnv[key])
    return prev
  }, {} as IAnyObject)) as AppEnv
}

/**
 * 处理 环境变量 boolen 数字 的情况
 */
export function formatEnvVal(val: any) {
  if(val === 'true') {
    return true
  } else if(val === 'false') {
    return false
  } else if(/^\d+$/.test(val)) {
    return Number(val)
  } else {
    return val
  }
}
