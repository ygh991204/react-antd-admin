import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
import styled from 'styled-components'
import loadable from '@loadable/component'
import { RouterGuard } from '@/router/guard'
import { BasicLayout } from '@/router/constantRoutes'
import Layout from '@/layout'
import { asyncImportPages } from './helper'

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

export function RouterLoading() {
  return (
    <RouterLoadingWrapper>
      <Spin size='large' />
    </RouterLoadingWrapper>
  )
}

function routerLazy(path: string) {
  return loadable(asyncImportPages(path), {
    fallback: <RouterLoading />
  })
}

export function RoutesRender(routes: Route[], isComponent = true): RouteObject[] {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: isComponent ? <Navigate to={route.redirect} replace /> : null,
          path: '',
          fullPath: '',
          meta: {}
        },
        ...children
      ]
    }
    const RouterElement: React.FC = () => {
      if (!isComponent) {
        return <>{null}</>
      }
      const component = route.component
      if (route.index) return <>{component}</>
      if (route.component && route.component !== BasicLayout) {
        if (typeof route.component === 'string') {
          const PageComponent = routerLazy(route.component)
          return (
            <RouterGuard>
              <PageComponent />
            </RouterGuard>
          )
        } else {
          return <>{route.component}</>
        }
      }
      return route.redirect ? route.children ? <Outlet /> : <Navigate to={route.redirect} replace /> : <Outlet />
    }
    return {
      children: route.children ? RoutesRender(route.children, isComponent) : undefined,
      element: isComponent ? (
        route.component === BasicLayout ? (
          <RouterGuard>
            <Layout />
          </RouterGuard>
        ) : (
          <RouterElement />
        )
      ) : null,
      index: route.index || false,
      path: route.path
    }
  })
}
