import type { RouteRecordCase, RouteRecord } from '@/router/type'
import { validateURL } from '@/utils/validate'
import { EnvConfig } from '@/env'
import loadable from '@loadable/component'
import { RouterLoading } from './loading'

let layoutModules: IAnyObject | null = null

export function asyncImportLayout() {
  let asynLayout = null
  if(EnvConfig.APP_NODE_ENV === 'server') {
    asynLayout = () => import('../layout' + '' + '/index.tsx')
  } else {
    layoutModules = layoutModules || import.meta.glob('@/layout/index.tsx')
    asynLayout = layoutModules['../layout/index.tsx']
  }
  return loadable(asynLayout, {
    fallback: RouterLoading
  })
}

let pagesModules: IAnyObject | null = null

export function asyncImportPage(component: string) {
  let asynPage = null
  if(EnvConfig.APP_NODE_ENV === 'server') {
    asynPage = () => import('../pages/' + component + '/index.tsx')
  } else {
    pagesModules = pagesModules || import.meta.glob('@/pages/**/index.tsx')
    asynPage = pagesModules['../pages/' + component + '/index.tsx']
  }
  return loadable(asynPage, {
    fallback: RouterLoading
  })
}

/**
 *  处理 fullPath
 *  CaseRoute => Route
 */
export function formatRoutes(routes: RouteRecordCase[], parentFullPath = ''): RouteRecord[] {
  return routes.map((route) => {
    let children
    let fullPath = route.path
    if (!validateURL(route.path)) {
      fullPath = parentFullPath + route.path
      children =
        route.children && route.children.length ?
          formatRoutes(route.children, fullPath === '/' ? fullPath : fullPath + '/') :
          undefined
    }
    return {
      ...route,
      fullPath,
      children: children,
      meta: { ...route.meta }
    }
  })
}

/**
 * 过滤隐藏的路由
 */
export function getShowRoutes(routes: RouteRecord[] = []): RouteRecord[] {
  return routes.filter((route) => {
    if (route.meta.hidden) {
      return false
    } else {
      if (route.children) {
        route.children = getShowRoutes(route.children)
      }
      return true
    }
  })
}
