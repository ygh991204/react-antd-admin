/// <reference types="react" />

/**
 * 路由源信息
 */
declare interface RouteMeta {
  hidden?: boolean
  title?: string
  affixTab?: boolean
  permission?: string
  icon?: string
}

declare interface CaseRoute {
  path: string
  component?: React.ReactNode
  redirect?: string
  children?: CaseRoute[]
  meta?: RouteMeta
}

declare interface Route {
  path?: string
  fullPath?: string
  component?: React.ReactNode
  redirect?: string
  children?: Route[]
  meta?: RouteMeta
  index?: boolean
}
