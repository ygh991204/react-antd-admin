
import 'react-i18next'
import type { Locale } from '@/lang/zh_CN'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: AppLange;
    resources: {
      zh_CN: Locale,
    }
  }
}
