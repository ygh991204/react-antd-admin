import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh_CN from './lang/zh_CN.json'
import en_US from './lang/en_US.json'
import Config from '@/config'

export const getLanguage = () => localStorage.getItem('lang') || Config.lang
export const setLanguage = (ln) => {
  localStorage.setItem('lang', ln)
}

i18n.use(initReactI18next).init({
  resources: {
    zh_CN: {
      translation: zh_CN
    },
    en_US: {
      translation: en_US
    }
  },
  fallbackLng: getLanguage(),
  debug: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
