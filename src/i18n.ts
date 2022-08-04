import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import Languagedetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import zh_CN from '@/lang/zh_CN'
import en_US from '@/lang/en_US'
import Storage from '@/utils/storage'
import Config from './config'

export const defalutLang = Storage.get('lang') || Config.lang

i18n
  .use(Backend)
  .use(Languagedetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh_CN: {
        translation: zh_CN
      },
      en_US: {
        translation: en_US
      }
    },
    fallbackLng: defalutLang,
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })
export default i18n
