import type { RouteRecord } from '@/router/type'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { RouterGuard } from '@/router/permission'
import { BasicLayout } from '@/router/constant'
import { asyncImportPage, asyncImportLayout } from './helper'
import React from 'react'

let Layout: React.ComponentType | null = null

function getLayout() {
  if (!Layout) {
    const LayoutComponent = asyncImportLayout()
    Layout = () => <RouterGuard render={<LayoutComponent />} />
  }
  return Layout
}

export function RoutesRender(routes: RouteRecord[], isComponentRender = true): RouteObject[] {
  return routes.map((route) => {
    const { index, component, redirect } = route
    let children = route.children || []
    if (children.length) {
      children = [
        {
          index: true,
          redirect: redirect || children[0].fullPath,
          path: '',
          fullPath: '',
          meta: {}
        },
        ...children
      ]
    }
    let ElementComponent: React.ComponentType | null = null
    if (isComponentRender) {
      if (index && redirect) {
        ElementComponent = () => <Navigate to={redirect} replace/>
      } else if (component) {
        if (component === BasicLayout) {
          ElementComponent = getLayout()
        } else {
          const PageComponent = asyncImportPage(component)
          ElementComponent = () => <RouterGuard render={<PageComponent />} />
        }
      } else if (redirect) {
        if (children.length) {
          ElementComponent = Outlet
        } else {
          ElementComponent = () => <Navigate to={redirect} replace />
        }
      } else {
        ElementComponent = Outlet
      }
    }
    return {
      children: children.length ? RoutesRender(children, isComponentRender) : undefined,
      element: ElementComponent ? <ElementComponent /> : undefined,
      index: route.index || undefined,
      path: route.path || undefined
    }
  })
}
