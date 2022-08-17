import type { Locale as AntdLocale } from 'antd/lib/locale-provider'
import i18n from 'i18next'
import Languagedetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { defalutLanguage } from '@/env'
import zhCNLocale, { TranslationLocale } from './zh_CN'
import enUSLocale from './en_US'
import antdZhCNLocale from 'antd/lib/locale/zh_CN'
import antdEnUSLocale from 'antd/lib/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh'
import 'dayjs/locale/en'

export type Languages = {
  [key in AppLanguage]: {
    label: string
    translation: TranslationLocale
    antd: AntdLocale
    dayjs: 'zh' | 'en'
  }
}

export const languages: Languages = {
  zh_CN: {
    label: '简体中文',
    antd: antdZhCNLocale,
    translation: zhCNLocale,
    dayjs: 'zh'
  },
  en_US: {
    label: 'English',
    antd: antdEnUSLocale,
    translation: enUSLocale,
    dayjs: 'en'
  }
}

dayjs.locale(languages[defalutLanguage].dayjs)

export const languageList = Object.keys(languages).reduce((prev, item) => {
  const key = item as AppLanguage
  prev.push({
    key,
    label: languages[key].label
  })
  return prev
}, [] as { key: AppLanguage, label: string }[])

export function getSpecifiedLanguage(type: AppLanguage) {
  const specLanguage = languages[type]
  return specLanguage
}

i18n.use(Languagedetector)
  .use(initReactI18next)
  .init({
    resources: Object.keys(languages).reduce((prev, item) => {
      const key = item as AppLanguage
      prev[key] = {
        translation: languages[key].translation
      }
      return prev
    }, {} as IAnyObject),
    fallbackLng: defalutLanguage,
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
