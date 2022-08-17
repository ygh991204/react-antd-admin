import Storage from '@/utils/storage'
import { formatAppEnv } from '../build/formatAppEnv'

export const EnvConfig = formatAppEnv(import.meta.env as unknown as AppEnv)

export function getAppLanguage() {
  return Storage.get('language') || EnvConfig.APP_LANGUAGE
}

export const defalutLanguage = getAppLanguage()
