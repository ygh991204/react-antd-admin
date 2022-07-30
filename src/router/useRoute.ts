import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import qs from 'qs'

import { useAppSelector } from '@/store'

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
  const routes = useAppSelector((state) => state.routes.routes)
  const param = useParams()

  const path = useMemo(() => {
    return location.pathname === '/' ? '' : location.pathname
  }, [location.pathname])

  const search = useMemo(() => {
    return location.search ? decodeURIComponent(location.search) : ''
  }, [location.search])

  const query = useMemo(() => {
    const _query = search ? { ...qs.parse(search.substring(1)) } : {}
    return _query as Q
  }, [search])

  const params = useMemo(() => {
    const state = location.state as IAnyObject
    const _state = state ? { ...state } : {}
    const _param = param ? { ...param } : {}
    return { ..._state, ..._param } as P
  }, [location.state, param])

  const matched = useMemo(() => {
    const _paths = path
      .split('/')
      .filter((v) => !!v)
      .map((v, i) => (i === 0 ? '/' + v : v))
    return _paths.reduce((prev, item) => {
      if (prev.length) {
        const children = prev[prev.length - 1].children
        if (children) {
          const a = children.filter((v) => v.path === item)
          if (a[0]) prev.push(a[0])
        }
      } else {
        prev = routes.filter((v) => v.path === item)
        if (!prev.length) {
          const layoutRoutes = routes.filter((v) => v.path === '/')[0].children || []
          const _curRoute = layoutRoutes.filter((v) => v.fullPath === item)[0]
          prev = _curRoute ?
            [
              {
                ..._curRoute,
                path: _curRoute.fullPath
              }
            ] :
            []
        }
      }
      return prev
    }, [] as Route[])
  }, [path, routes])

  const match = useMemo(() => {
    return matched[matched.length - 1] || {}
  }, [matched])

  const meta = useMemo(() => {
    return match.meta || {}
  }, [match])

  const hash = useMemo(() => {
    return location.hash
  }, [location.hash])

  const fullPath = useMemo(() => {
    return path + search
  }, [path, search])

  return {
    fullPath,
    hash,
    matched,
    match,
    meta,
    params,
    path,
    query
  }
}

export default useRoute
