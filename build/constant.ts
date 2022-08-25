import { loadEnv } from 'vite'
import { formatEnvVal, formatAppEnv } from './formatAppEnv'

// 当前 vite modo
export const mode = process.argv[process.argv.length - 1] as AppEnv['APP_MODE']

// 指定 vite env 前缀
export const envPrefix = 'APP'

// viet env
export const appEnv = formatAppEnv(loadEnv(mode, process.cwd(), envPrefix) as unknown as AppEnvOrigin)

// 是否 build
export const isBuild = appEnv.APP_NODE_ENV === 'build'

/**
 * cross-env 变量
 */
// 默认值
const defaultProcessEnv: ProcessEnv = {
  visualizer: false
}
const _processEnv = process.env
//
export const processEnv = Object.assign(
  {},
  defaultProcessEnv,
  Object.keys(_processEnv).reduce((prev, key) => {
    prev[key] = formatEnvVal(_processEnv[key])
    return prev
  }, {} as IAnyObject) as ProcessEnv
)

// cross-env 与 vite env 合并
export const Env = { ...processEnv, ...appEnv }
