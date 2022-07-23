import React, { useState, useEffect } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import loadable from '@loadable/component'
import styled from 'styled-components'

import Layout from '@/layout'
import { setPageTitle } from '../utils'
import { routerBeforeEach } from './permission'
import { useRoute, useRouter, RouterOptions } from './hooks'

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
const RouterLoading = (
  <RouterLoadingWrapper>
    <Spin size="large" />
  </RouterLoadingWrapper>
)

const pageFiles = import.meta.glob('@/pages/**/index.tsx')

const pages = Object.keys(pageFiles)
  .sort()
  .reduce((pages, pagePath) => {
    const key = pagePath.replace('../pages/', '').replace('/index.tsx', '')
    pages[key] = pageFiles[pagePath]
    return pages
  }, {} as ITypeObject<any>)

function RouterLazy(path: string) {
  return loadable(pages[path], {
    fallback: RouterLoading,
  })
}

/**
 * 路由守卫，包裹对应的路由组件
 */

export type RouterGuardNext = (
  options?:
    | (RouterOptions & {
        replace?: boolean
      })
    | string,
  _auth?: boolean
) => void

export const RouterGuard: React.FC<{
  render?: React.ReactNode
  children?: React.ReactNode
}> = ({ render, children }) => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)

  const next: RouterGuardNext = (options, _auth) => {
    setAuth(!!_auth)
    if (options) {
      const _replace = !!(typeof options !== 'string' && options.replace)
      if (_replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
  }

  useEffect(() => {
    setPageTitle(route.meta.title ? t(route.meta.title) : 'no_name')
    routerBeforeEach(route, next)
  }, [])

  const dom = render || children || RouterLoading
  return <>{auth ? dom : RouterLoading}</>
}

export function RoutesRender(routes: Route[]): RouteObject[] {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: <Navigate to={route.redirect} replace />,
          path: '',
          fullPath: '',
          meta: {},
        },
        ...children,
      ]
    }
    const RouterElement: React.FC = () => {
      const component = route.component
      if (route.index) return <>{component}</>
      if (route.component && route.component !== 'Layout') {
        const PageComponent = RouterLazy(route.component as any)
        return (
          <RouterGuard>
            <PageComponent />
          </RouterGuard>
        )
      }
      return route.redirect ? route.children ? <Outlet /> : <Navigate to={route.redirect} replace /> : <Outlet />
    }
    return {
      children: route.children ? RoutesRender(route.children) : undefined,
      element:
        route.component === 'Layout' ? (
          <RouterGuard>
            <Layout />
          </RouterGuard>
        ) : (
          <RouterElement />
        ),
      index: route.index || false,
      path: route.path,
    }
  })
}
