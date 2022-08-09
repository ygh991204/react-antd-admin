
import type { RouteLocation } from './useRoute'
import { validateURL } from '@/utils/validate'

export function formatRoutes(routes: CaseRoute[], parentFullPath = ''): Route[] {
  return routes.map((route) => {
    let children
    let fullPath = route.path
    if (!validateURL(route.path)) {
      fullPath = parentFullPath + (route.path === '/' ? '' : route.path)
      children = route.children && route.children.length ? formatRoutes(route.children, fullPath + '/') : undefined
    }
    return {
      ...route,
      fullPath,
      children: children,
      meta: route.meta ? { ...route.meta } : {}
    }
  })
}

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
        path: route.fullPath || '',
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
