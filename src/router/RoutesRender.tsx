import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import routerLazy from './routerLazy'
import RouterGuard from './RouterGuard'

function RoutesRender(routes: Route[], isComponent = true): RouteObject[] {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: isComponent ? <Navigate to={route.redirect} replace /> : undefined,
          path: '',
          fullPath: '',
          meta: {}
        },
        ...children
      ]
    }
    const RouterElement: React.FC = () => {
      if(!isComponent) {
        return <>{null}</>
      }
      const component = route.component
      if (route.index) return <>{component}</>
      if (route.component && route.component !== 'Layout') {
        if(typeof route.component === 'string') {
          const PageComponent = routerLazy(route.component)
          return (
            <RouterGuard>
              <PageComponent />
            </RouterGuard>
          )
        } else {
          return <>{ route.component }</>
        }
      }
      return route.redirect ? route.children ? <Outlet /> : <Navigate to={route.redirect} replace /> : <Outlet />
    }
    return {
      children: route.children ? RoutesRender(route.children, isComponent) : undefined,
      element:
       isComponent ? route.component === 'Layout' ? (
         <RouterGuard>
           <Layout />
         </RouterGuard>
       ) : (
         <RouterElement />
       ) : undefined,
      index: route.index || false,
      path: route.path
    }
  })
}

export default RoutesRender
