import Storage from '@/utils/storage'
import { formatAppEnv } from '../build/formatAppEnv'

// 处理后的 app-env
export const EnvConfig = formatAppEnv(import.meta.env as unknown as AppEnvOrigin)

/**
 * 获取当前 语言
 */
export function getAppLanguage() {
  return Storage.get('language') || EnvConfig.APP_LANGUAGE
}

// 当前语言
export const defalutLanguage = getAppLanguage()
