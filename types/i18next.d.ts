import 'i18next'
import type zh_CN from '@/locales/lang/zh_CN'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof zh_CN
    nsSeparator: '.'
  }
}
