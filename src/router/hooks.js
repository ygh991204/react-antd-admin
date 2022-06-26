import { useMemo } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { delEmptyQueryNodes } from '@/utils'

export function useRouter() {
  const navigate = useNavigate()
  const _to = (options, replace = false) => {
    if (typeof options === 'string') {
      navigate(options, {
        replace
      })
    } else {
      const { query, params, path } = options
      const _query = query && Object.keys(query).length ? delEmptyQueryNodes(query) : null
      const _path = path + (_query ? '?' + qs.stringify(_query) : '')
      const _params = params && Object.keys(params).length ? delEmptyQueryNodes(params) : null
      navigate(_path, {
        replace,
        state: _params
      })
    }
  }
  /**
   * @param {string | { path: string, query: object, params: object }} options
   */
  const push = (options) => {
    _to(options, false)
  }
  /**
   * @param {string | { path: string, query: object, params: object }} options
   */
  const replace = (options) => {
    _to(options, true)
  }
  /**
   * @param {number} delta
   */
  const go = (delta) => {
    navigate(delta)
  }
  const back = () => {
    go(-1)
  }
  return {
    push,
    replace,
    go,
    back
  }
}

export function useRoute() {
  const location = useLocation()
  const routes = useSelector((state) => state.routes.routes)
  const param = useParams()

  const path = useMemo(() => {
    return location.pathname === '/' ? '' : location.pathname
  }, [location.pathname])

  const search = useMemo(() => {
    return location.search ? decodeURIComponent(location.search) : ''
  }, [location.search])

  const query = useMemo(() => {
    return search ? { ...qs.parse(search.substring(1)) } : {}
  }, [search])

  const params = useMemo(() => {
    const _state = location.state ? { ...location.state } : {}
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
        if (prev[prev.length - 1].children) {
          const a = prev[prev.length - 1].children.filter((v) => v.path === item)
          if (a[0]) prev.push(a[0])
        }
      } else {
        prev = routes.filter((v) => v.path === item)
        if (!prev.length) {
          const layoutRoutes = routes.filter((v) => v.path === '/')[0].children
          const _curRoute = layoutRoutes.filter((v) => v.fullPath === item)[0]
          prev = _curRoute
            ? [
              {
                ..._curRoute,
                path: _curRoute.fullPath
              }
            ]
            : []
        }
      }
      return prev
    }, [])
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
