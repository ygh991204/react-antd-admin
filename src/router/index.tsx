import type { RouteRecord } from '@/router/type'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { RouterGuard } from '@/router/permission'
import { BasicLayout } from '@/router/constant'
import { asyncImportPage, asyncImportLayout } from './helper'
import React from 'react'

let Layout: React.ComponentType | null = null

function getLayout() {
  if(!Layout) {
    const LayoutComponent = asyncImportLayout()
    Layout = () => <RouterGuard render={<LayoutComponent/>} />
  }
  return Layout
}

export function RoutesRender(routes: RouteRecord[], isComponentRender = true): RouteObject[] {
  return routes.map((route) => {
    if (route.component && route.redirect) {
      const children = route.children || []
      route.children = [
        {
          index: true,
          component: isComponentRender ? <Navigate to={route.redirect} replace /> : null,
          path: '',
          fullPath: '',
          meta: {}
        },
        ...children
      ]
    }
    let ElementComponent: React.ComponentType | null = null
    if(isComponentRender) {
      if(route.component) {
        if(typeof route.component === 'string') {
          if(route.component === BasicLayout) {
            ElementComponent = getLayout()
          } else {
            const PageComponent = asyncImportPage(route.component)
            ElementComponent = () => <RouterGuard render={<PageComponent/>}/>
          }
        } else {
          ElementComponent = () => <RouterGuard render={route.component} />
        }
      } else {
        const redirect = route.redirect
        if(redirect) {
          if(route.children) {
            ElementComponent = Outlet
          } else {
            ElementComponent = () => <Navigate to={redirect} replace />
          }
        } else {
          ElementComponent = Outlet
        }
      }
    }
    return {
      children: route.children ? RoutesRender(route.children, isComponentRender) : undefined,
      element: ElementComponent ? <ElementComponent/> : null,
      index: route.index || false,
      path: route.path
    }
  })
}
