import type { TFunction, Namespace } from 'react-i18next'

declare global {
  declare type RouteMetaTitle = Parameters<TFunction<Namespace<'zh_CN'>, undefined>>[0]
  declare interface RouteMeta<M = RouteMetaTitle> {
    hidden?: boolean
    title?: M
    affixTab?: boolean
    permission?: string
    icon?: string
  }
  declare interface CaseRoute<M = RouteMetaTitle> {
    path: string
    component?: React.ReactNode
    redirect?: string
    children?: CaseRoute<M>[]
    meta?: RouteMeta<M>
  }
  declare interface Route {
    path: string
    fullPath: string
    meta: RouteMeta
    component?: React.ReactNode
    redirect?: string
    children?: Route[]
    index?: boolean
  }
  declare type AppLange = 'zh_CN' | 'en_US'
  declare type ITypeObject<T> = Record<any, T>
  declare type IAnyObject = ITypeObject<any>
}

export default {}
