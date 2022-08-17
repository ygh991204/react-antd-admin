import { formatAppEnv } from '../build/util'
import Storage from '@/utils/storage'

export const EnvConfig = formatAppEnv(import.meta.env as unknown as AppEnv)

export function getAppLanguage() {
  return Storage.get('language') || EnvConfig.APP_LANGUAGE
}

export const defalutLanguage = getAppLanguage()
