import type { Locale as AntdLocale } from 'antd/lib/locale-provider'
import i18n from 'i18next'
import Languagedetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import Storage from '@/utils/storage'
import Config from '@/config'
import zhCNLocale, { TranslationLocale } from './zh_CN'
import enUSLocale from './en_US'
import antdZhCNLocale from 'antd/lib/locale/zh_CN'
import antdEnUSLocale from 'antd/lib/locale/en_US'
import 'dayjs/locale/zh'
import 'dayjs/locale/en'
import dayjs from 'dayjs'

export type DayjsLocale = 'zh' | 'en'
export type LanguageType = ImportMeta['env']['VITE_LANGUAGE']

export interface LanguageItem {
  label: string
  translation: TranslationLocale
  antd: AntdLocale
  dayjs: DayjsLocale
}

export type Languages = {
  [key in LanguageType]: LanguageItem
}

export type I18nResources = {
  [key in LanguageType]: {
    translation: TranslationLocale
  }
}

export const defalutLanguage = Storage.get('language') || Config.language

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

export const languageList = Object.keys(languages).reduce((prev, item) => {
  const key = item as LanguageType
  prev.push({
    key,
    label: languages[key].label
  })
  return prev
}, [] as { key: LanguageType, label: string }[])

export function getSpecifiedLanguage(type: LanguageType) {
  const specLanguage = languages[type]
  return specLanguage
}

dayjs.locale(languages[defalutLanguage].dayjs)

i18n.use(Languagedetector)
  .use(initReactI18next)
  .init({
    resources: Object.keys(languages).reduce((prev, item) => {
      const key = item as LanguageType
      prev[key] = {
        translation: languages[key].translation
      }
      return prev
    }, {} as I18nResources),
    fallbackLng: defalutLanguage,
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
