import type { RouteRecord, RouteMeta } from '@/router/type'

import { useMemo, useCallback } from 'react'
import { useLocation, useParams, matchRoutes, useNavigate } from 'react-router-dom'
import qs from 'qs'
import { cloneDeep, omitBy } from 'lodash-es'
import { useAppSelector } from '@/store'
import { RoutesRender } from '@/router'

export interface RouteLocation<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject> {
  readonly fullPath: string
  readonly hash: string
  readonly matched: RouteRecord[]
  readonly match: RouteRecord
  readonly meta: RouteMeta
  readonly params: P
  readonly path: string
  readonly query: Q
}

/**
 * 当前路由对象
 */
export function useRoute<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject>(): RouteLocation<Q, P> {
  const location = useLocation()
  const param = useParams()
  const routes = useAppSelector((state) => state.permission.routes)

  const search = useMemo(() => {
    return location.search ? decodeURIComponent(location.search) : ''
  }, [location.search])

  const query = useMemo(() => {
    const routequery = search ? { ...qs.parse(search.substring(1)) } : {}
    return routequery as Q
  }, [search])

  const params = useMemo(() => {
    const state = location.state as IAnyObject
    const routeState = state ? { ...state } : {}
    const routeParam = param ? { ...param } : {}
    return { ...routeState, ...routeParam } as P
  }, [location.state, param])

  const matched = useMemo(() => {
    const _routes = matchRoutes(RoutesRender(cloneDeep(routes), false), location) || []
    const matchPaths = _routes.map((item) => item.pathname)
    const _matched = matchPaths.reduce((matchedRoutes, matchPath) => {
      if (matchedRoutes.length) {
        const children = matchedRoutes[matchedRoutes.length - 1].children
        if (children) {
          const matchedRoutesChildren = children.filter((route) => route.fullPath === matchPath)[0]
          matchedRoutesChildren && matchedRoutes.push(matchedRoutesChildren)
        }
      } else {
        matchedRoutes = routes.filter((v) => v.fullPath === matchPath)
      }
      return matchedRoutes
    }, [] as RouteRecord[])
    return _matched
  }, [routes, location])

  const match = useMemo(() => {
    return matched[matched.length - 1] || {}
  }, [matched])

  return {
    fullPath: location.pathname + search,
    hash: location.hash,
    path: location.pathname,
    query,
    params,
    meta: match.meta || {},
    matched,
    match
  }
}

export interface RouterOptions<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject> {
  path: string
  query?: Q
  params?: P
}

function filterQuery(query: IAnyObject | undefined) {
  if (query) {
    const navigateQuery = omitBy(query, (val) => val === undefined || val === null || val === '')
    return Object.keys(navigateQuery).length ? navigateQuery : null
  } else {
    return null
  }
}

/**
 * 路由跳转封装
 */
export function useRouter<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject>() {
  const navigate = useNavigate()

  const customNavigate = useCallback((options: RouterOptions | string, replace = false) => {
    if (typeof options === 'string') {
      navigate(options, { replace })
    } else {
      const navigateQuery = filterQuery(options.query)
      const navigateParams = filterQuery(options.params)
      const navigatePath = options.path + (navigateQuery ? '?' + qs.stringify(navigateQuery) : '')
      navigate(navigatePath, {
        replace,
        state: navigateParams
      })
    }
  }, [])

  const push = useCallback(<Qt extends Q = Q, Pt extends P = P>(options: RouterOptions<Qt, Pt> | string) => {
    customNavigate(options, false)
  }, [])

  const replace = useCallback(<Qt extends Q = Q, Pt extends P = P>(options: RouterOptions<Qt, Pt> | string) => {
    customNavigate(options, true)
  }, [])

  const go = useCallback((delta: number) => {
    navigate(delta)
  }, [])

  const back = useCallback(() => {
    go(-1)
  }, [])

  return {
    push,
    replace,
    go,
    back
  }
}
