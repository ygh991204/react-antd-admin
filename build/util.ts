
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

export function formatAppEnv(env: AppEnv) {
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
    APP_OPEN: false
  }
  const appEnv = env as IAnyObject
  return Object.assign({}, defaultAppEnv, Object.keys(appEnv).reduce((prev, key) => {
    prev[key] = formatEnvVal(appEnv[key])
    return prev
  }, {} as IAnyObject)) as AppEnv
}