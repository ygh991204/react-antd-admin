import type { TranslationLocale } from '@/language/zh_CN'
import type { LanguageType } from '@/language'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      [key in LanguageType]: TranslationLocale
    }
  }
}
