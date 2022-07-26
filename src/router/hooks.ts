import { useMemo } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import qs from 'qs'
import { omitBy } from 'lodash'
import { useAppSelector } from '@/store'

export type RouterOptions = {
  path: string
  query?: IAnyObject
  params?: IAnyObject
}

/**
 * 路由跳转封装
 */
export function useRouter() {
  const navigate = useNavigate()

  function _to(options: RouterOptions | string, replace = false) {
    if (typeof options === 'string') {
      navigate(options, {
        replace
      })
    } else {
      const { query, params, path } = options
      const _query =
        query && Object.keys(query).length ?
          omitBy(query, (val) => val === undefined || val === null || val === '') :
          null
      const _path = path + (_query ? '?' + qs.stringify(_query) : '')
      const _params =
        params && Object.keys(params).length ?
          omitBy(params, (val) => val === undefined || val === null || val === '') :
          null
      navigate(_path, {
        replace,
        state: _params
      })
    }
  }

  function push(options: RouterOptions | string) {
    _to(options, false)
  }

  function replace(options: RouterOptions | string) {
    _to(options, true)
  }

  function go(delta: number) {
    navigate(delta)
  }

  function back() {
    go(-1)
  }

  return {
    push,
    replace,
    go,
    back
  }
}

export interface RouteLocation {
  readonly fullPath: string
  readonly hash: string
  readonly matched: Route[]
  readonly match: Route
  readonly meta: RouteMeta
  readonly params: IAnyObject
  readonly path: string
  readonly query: IAnyObject
}

/**
 * 当前路由对象
 */
export function useRoute(): RouteLocation {
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
    return _query as IAnyObject
  }, [search])

  const params = useMemo(() => {
    const state = location.state as IAnyObject
    const _state = state ? { ...state } : {}
    const _param = param ? { ...param } : {}
    return { ..._state, ..._param }
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
