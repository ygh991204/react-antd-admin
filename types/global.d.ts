
declare global {

  declare type ITypeObject<T> = Record<any, T>
  declare type IAnyObject = ITypeObject<any>

  // 窗口终端
  declare type AppDevice = 'mobile' | 'desktop'

  // 语言
  declare type AppLanguage = 'zh_CN' | 'en_US'

  // cross-env
  declare interface ProcessEnv {
    // 打包后是否压缩 gzip
    readonly visualizer: boolean
  }

  // vite env
  declare interface AppEnv {
    readonly APP_NODE_ENV: 'development' | 'production'
    readonly APP_MODE: 'development' | 'production' | 'test'
    readonly APP_TITLE: string
    readonly APP_SHORT_TITLE: string
    readonly APP_PROT: number
    readonly APP_LANGUAGE: AppLanguage
    readonly APP_TOKEN_KEY: string
    readonly APP_BASE_URL: string
    readonly APP_PWA: boolean
    readonly APP_OPEN: boolean
    readonly APP_FOOTER: string
    readonly APP_PASSWORD_EXPIRES: number
    readonly APP_MOBILE_WIDTH: number
    readonly APP_MOCK: boolean
    readonly APP_LEGACY: boolean
    readonly APP_COMPRESSION: boolean
  }

}

export default {}
