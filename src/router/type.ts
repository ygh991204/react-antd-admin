import type { TFunction, Namespace } from 'react-i18next'

export type RouteMetaTitle = Parameters<TFunction<Namespace, undefined>>[0]

export interface RouteMeta {
  hidden?: boolean
  title?: RouteMetaTitle
  affixTab?: boolean
  icon?: string
}

export interface RouteRecordCase {
  path: string
  meta: RouteMeta,
  component?: string
  redirect?: string
  children?: RouteRecordCase[]
}

export interface RouteRecord {
  path: string
  meta: RouteMeta
  fullPath: string
  component?: string
  redirect?: string
  children?: RouteRecord[]
  index?: boolean
}
