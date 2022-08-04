import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import routerLazy from './routerLazy'
import RouterGuard from './RouterGuard'

function RoutesRender(routes: Route[]): RouteObject[] {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: <Navigate to={route.redirect} replace />,
          path: '',
          fullPath: '',
          meta: {}
        },
        ...children
      ]
    }
    const RouterElement: React.FC = () => {
      const component = route.component
      if (route.index) return <>{component}</>
      if (route.component && route.component !== 'Layout') {
        const PageComponent = routerLazy(route.component as any)
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
      path: route.path
    }
  })
}

export default RoutesRender