import type { TranslationLocale } from '@/language/zh_CN'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      [key in AppLanguage]: TranslationLocale
    }
  }
}
