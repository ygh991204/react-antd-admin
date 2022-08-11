import type { ComponentType } from 'react'
import type { RouteLocation } from '@/router/hook'
import { validateURL } from '@/utils/validate'

const pagesModules = import.meta.glob('@/pages/**/index.tsx')

export function asyncImportPages(component: string) {
  const keys = '../pages/' + component + '/index.tsx'
  return pagesModules[keys] as () => Promise<ComponentType>
}

/**
 *  处理 fullPath
 *  CaseRoute => Route
 */
export function formatRoutes(routes: CaseRoute[], parentFullPath = ''): Route[] {
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
      meta: route.meta ? { ...route.meta } : {}
    }
  })
}

/**
 * 过滤隐藏的路由
 */
export function getShowRoutes(routes: Route[] = []): Route[] {
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

export function getAffixTabRoutes(routes: Route[], tags: RouteLocation[] = []) {
  return routes.reduce((prev, route) => {
    if (route.meta && route.meta.affixTab) {
      prev.push({
        ...route,
        path: route.fullPath,
        hash: '',
        match: route,
        matched: [],
        params: {},
        query: {}
      })
    }
    if (route.children) {
      getAffixTabRoutes(route.children, prev)
    }
    return prev
  }, tags)
}
