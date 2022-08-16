
declare global {
  declare type ITypeObject<T> = Record<any, T>
  declare type IAnyObject = ITypeObject<any>

  interface ProcessEnv {
    visualizer: boolean
  }

  interface AppEnv {
    readonly APP_NODE_ENV: 'development' | 'production'
    readonly APP_MODE: 'development' | 'production' | 'test'
    readonly APP_TITLE: string
    readonly APP_SHORT_TITLE: string
    readonly APP_PROT: number
    readonly APP_LANGUAGE: 'zh_CN' | 'en_US'
    readonly APP_TOKEN_KEY: string
    readonly APP_BASE_URL: string
    readonly APP_PWA: boolean
    readonly APP_OPEN: boolean
  }

}

export default {}
