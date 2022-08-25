import { useState, useCallback, useEffect, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'antd'
import { setPageTitle } from '@/utils'
import { getToken } from '@/utils/auth'
import { RouterLoading } from '@/router/loading'
import { RouteLocation, RouterOptions, useRoute, useRouter } from '@/router/hook'
import { logout, setLoadMenus, getuserInfo } from '@/store/modules/userSlice'
import { loadAsyncMenus } from '@/store/modules/permissionSlice'
import store from '@/store'
import React from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

type RouterGuardNext = (
  options?:
  | (RouterOptions & {
    replace?: boolean
  })
  | string
) => void

async function loadMenus(route: RouteLocation, next: RouterGuardNext) {
  try {
    store.dispatch(setLoadMenus(false))
    await store.dispatch(loadAsyncMenus()).unwrap()
    next({ replace: true, path: route.fullPath })
  } catch (e) {
    notification.error({
      message: '路由菜单加载失败',
      description: '您可以尝试刷新浏览器，重新加载路由'
    })
    next({ replace: true, path: '/' })
  }
}

let isNProgress = true

export async function routerBeforeEach(route: RouteLocation, next: RouterGuardNext) {
  if (isNProgress) {
    NProgress.start()
    isNProgress = false
  }
  if (getToken()) {
    if (route.path === '/login') {
      next('/')
    } else {
      const state = store.getState()
      if (state.user.permissions.length === 0) {
        try {
          await store.dispatch(getuserInfo()).unwrap()
          await loadMenus(route, next)
        } catch (e) {
          await store.dispatch(logout()).unwrap()
          location.reload()
        }
      } else if (state.user.loadMenus) {
        await loadMenus(route, next)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(route.path) !== -1) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
  if (route.match) {
    const children = route.match.children || []
    if (!children.length) {
      NProgress.done()
      isNProgress = true
    }
  }
}

/**
 * 路由守卫组件
 */
export function RouterGuard({
  children,
  render
}: PropsWithChildren<{
  render?: React.ReactNode
}>) {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)

  const next: RouterGuardNext = useCallback((options) => {
    if (options) {
      const _replace = !!(typeof options !== 'string' && options.replace)
      if (_replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
    setAuth(true)
  }, [])

  useEffect(() => {
    setPageTitle((route.meta.title ? t(route.meta.title) : '') as any)
    routerBeforeEach(route, next)
  }, [])

  return <>{auth ? children || render || RouterLoading : RouterLoading}</>
}
