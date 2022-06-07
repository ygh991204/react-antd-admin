import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams, useNavigate, Navigate, Route, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'

import loadable from '@loadable/component'
import styled from 'styled-components'
import { Spin } from 'antd'

import Layout from '@/layout'
import { setPageTitle } from '@/utils'
import { routerBeforeEach } from './permission'

/**
 * 页面加载态
 */
const RouterLoadingWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const RouterLoading = (
  <RouterLoadingWrapper>
    <Spin size='large' />
  </RouterLoadingWrapper>
)

/**
 * 对 useNavigate 二次封装
 */
export const useRouter = () => {
  const navigate = useNavigate()
  const _to = (options, replace = false) => {
    if (typeof options === 'string') {
      navigate(options)
    } else {
      const { query, params, path } = options
      const _path = path + (query ? '?' + qs.stringify(query) : '')
      navigate(_path, {
        replace,
        state: params
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

export const useRoute = () => {
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
    const _paths = path.split('/').filter((v) => !!v).map((v, i) => (i === 0 ? '/' + v : v))
    return _paths.reduce((prev, item) => {
      if (prev.length) {
        if (prev[prev.length - 1].children) {
          const a = prev[prev.length - 1].children.filter((v) => v.path === item)
          if (a[0]) prev.push(a[0])
        }
      } else {
        prev = routes.filter((v) => v.path === item)
        if (!prev.length) {
          const layoutRoutes = routes.filter(v => v.path === '/')[0].children
          const _curRoute = layoutRoutes.filter(v => v.fullPath === item)[0]
          prev = _curRoute ? [{
            ..._curRoute,
            path: _curRoute.fullPath
          }] : []
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

/**
 *  路由懒加载
 */
export const RouterLazy = (path) =>
  loadable(() => import(`../pages/${path}.jsx`), {
    fallback: RouterLoading
  })

/**
 * 路由守卫，包裹对应的路由组件
 */
export const RouterGuard = ({ children, render }) => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)
  const next = (options) => {
    if (options) {
      const replace = !!(typeof options !== 'string' && options.replace)
      if (replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
    setAuth(true)
  }
  useEffect(() => {
    const beforeEach = async() => {
      setPageTitle(t(route.meta.title))
      await routerBeforeEach(route, next)
    }
    beforeEach()
  }, [])
  const dom = render || children || RouterLoading
  return <>{auth ? dom : RouterLoading}</>
}

/**
 * 路由对象，映射
 */
export const renderRouter = (routes = []) => {
  return routes.map(route => {
    const RouterElement = () => {
      const component = route.component
      if (component) {
        if (component !== 'Layout') {
          const PageComponent = RouterLazy(component)
          return (
            <RouterGuard>
              <PageComponent />
            </RouterGuard>
          )
        }
      } else {
        if (route.redirect) {
          if (route.children) {
            return <Outlet />
          } else {
            return <Navigate to={route.redirect} replace />
          }
        } else {
          return <Outlet />
        }
      }
    }
    return (
      <Route
        key={route.fullPath}
        path={route.path}
        element={route.component === 'Layout' ? <Layout /> : <RouterElement />}>
        {route.redirect ? <Route index element={<Navigate to={route.redirect} replace />} /> : null}
        {route.children && route.children.length ? renderRouter(route.children) : null}
      </Route>
    )
  })
}
