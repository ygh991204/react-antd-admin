import { useMemo } from 'react'
import { useLocation, useParams, matchRoutes } from 'react-router-dom'
import qs from 'qs'
import { useAppSelector } from '@/store'
import { RoutesRender } from '@/router'
import { cloneDeep } from 'lodash'

export interface RouteLocation<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject> {
  readonly fullPath: string
  readonly hash: string
  readonly matched: Route[]
  readonly match: Route
  readonly meta: RouteMeta
  readonly params: P
  readonly path: string
  readonly query: Q
}

/**
 * 当前路由对象
 */
function useRoute<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject>(): RouteLocation<Q, P> {
  const location = useLocation()
  const param = useParams()
  const routes = useAppSelector(state => state.routes.routes)

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
    const _routes = matchRoutes(RoutesRender(cloneDeep(routes)), location) || []
    const matchPaths = _routes.map(item => item.pathname)
    const _matched = matchPaths.reduce((matchedRoutes, matchPath) => {
      if (matchedRoutes.length) {
        const children = matchedRoutes[matchedRoutes.length - 1].children
        if (children) {
          const matchedRoutesChildren = children.filter(route => route.fullPath === matchPath)[0]
          matchedRoutesChildren && matchedRoutes.push(matchedRoutesChildren)
        }
      } else {
        matchedRoutes = routes.filter((v) => v.fullPath === matchPath)
      }
      return matchedRoutes
    }, [] as Route[])
    return _matched
  }, [routes, location])

  const match = useMemo(() => {
    return matched[matched.length - 1]
  }, [matched])

  return {
    fullPath: location.pathname + search,
    hash: location.hash,
    path: location.pathname,
    query,
    params,
    meta: match.meta,
    matched,
    match
  }
}

export default useRoute
