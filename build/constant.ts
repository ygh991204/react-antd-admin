import { loadEnv } from 'vite'
import { formatEnvVal, formatAppEnv } from './util'

export const mode = process.argv[process.argv.length - 1] as AppEnv['APP_MODE']
export const envPrefix = 'APP'

export const appEnv = formatAppEnv(loadEnv(mode, process.cwd(), envPrefix) as unknown as AppEnv)
export const isBuild = appEnv.APP_NODE_ENV === 'production'

const defaultProcessEnv: ProcessEnv = {
  visualizer: false
}
const _processEnv = process.env
export const processEnv = Object.assign(
  {},
  defaultProcessEnv,
  Object.keys(_processEnv).reduce((prev, key) => {
    prev[key] = formatEnvVal(_processEnv[key])
    return prev
  }, {} as IAnyObject) as ProcessEnv
)

export const Env = { ...processEnv, ...appEnv }
