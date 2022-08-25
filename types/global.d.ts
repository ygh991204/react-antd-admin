
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
    visualizer: boolean
  }

  // vite-env
  declare interface AppEnv {
    APP_NODE_ENV: 'server' | 'build'
    APP_MODE: 'development' | 'production' | 'test'
    APP_TITLE: string
    APP_SHORT_TITLE: string
    APP_PROT: number
    APP_LANGUAGE: AppLanguage
    APP_TOKEN_KEY: string
    APP_BASE_URL: string
    APP_PWA: boolean
    APP_OPEN: boolean
    APP_FOOTER: string
    APP_PASSWORD_EXPIRES: number
    APP_MOBILE_WIDTH: number
    APP_MOCK: boolean
    APP_LEGACY: boolean
    APP_COMPRESSION: boolean
    APP_GITHUP: string
    APP_GITEE: string
    APP_DOC: string
  }
  declare type AppEnvOrigin = Record<keyof AppEnv, string>

}

export {}
