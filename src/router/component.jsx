import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next/react-i18next'
import { Spin } from 'antd'
import loadable from '@loadable/component'
import styled from 'styled-components'

import Layout from '@/layout'
import { setPageTitle } from '../utils'
import { routerBeforeEach } from './permission'
import { useRoute, useRouter } from './hooks'

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
    <Spin size='large' />
  </RouterLoadingWrapper>
)

const pageFiles = import.meta.glob('@/pages/**/index.jsx')

const pages = Object.keys(pageFiles)
  .sort()
  .reduce((pages, pagePath) => {
    pages[pagePath.replace('../pages/', '').replace('/index.jsx', '')] = pageFiles[pagePath]
    return pages
  }, {})

function RouterLazy(path) {
  return loadable(pages[path], {
    fallback: RouterLoading
  })
}

/**
 * 路由守卫，包裹对应的路由组件
 */
export function RouterGuard({ children, render }) {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)
  const next = (options, _auth = true) => {
    setAuth(!!_auth)
    if (options) {
      const replace = !!(typeof options !== 'string' && options.replace)
      if (replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
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

export function RoutesRender(routes = []) {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: <Navigate to={route.redirect} replace />
        },
        ...children
      ]
    }
    const RouterElement = () => {
      const component = route.component
      if (route.index) return component
      if (route.component && route.component !== 'Layout') {
        const PageComponent = RouterLazy(route.component)
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
      element: route.component === 'Layout' ? <RouterGuard><Layout /></RouterGuard> : <RouterElement />,
      index: route.index || false,
      path: route.path
    }
  })
}

/**
 * 路由对象，组件映射
 */
//  export function RouterRender(routes = []) {
//     return routes.map((route) => {
//       const RouterElement = () => {
//         if (route.component && route.component !== 'Layout') {
//           const PageComponent = RouterLazy(route.component)
//           return (
//             <RouterGuard>
//               <PageComponent />
//             </RouterGuard>
//           )
//         }
//         return route.redirect ? route.children ? <Outlet /> : <Navigate to={route.redirect} replace /> : <Outlet />
//       }
//       return (
//         <Route
//           key={route.fullPath}
//           path={route.path}
//           element={
//             route.component === 'Layout' ? (
//               <RouterGuard>
//                 <Layout />
//               </RouterGuard>
//             ) : (
//               <RouterElement />
//             )
//           }>
//           {route.redirect ? <Route index element={<Navigate to={route.redirect} replace />} /> : null}
//           {route.children && route.children.length ? RouterRender(route.children) : null}
//         </Route>
//       )
//     })
//   }

