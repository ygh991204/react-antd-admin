import { useState, useCallback, useEffect, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'antd'
import { setPageTitle } from '@/utils'
import { getToken } from '@/utils/auth'
import { RouterLoading } from '@/router/loading'
import { RouteLocation, RouterOptions, useRoute, useRouter } from '@/router/hook'
import { logout, setLoadMenus, userInfo } from '@/store/modules/userSlice'
import { loadAsyncMenus } from '@/store/modules/permissionSlice'
import store from '@/store'
import React from 'react'

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
  } catch(e) {
    notification.error({
      message: '路由菜单加载失败',
      description: '您可以尝试刷新浏览器，重新加载路由'
    })
    next({ replace: true, path: '/' })
  }
}

export async function routerBeforeEach(route: RouteLocation, next: RouterGuardNext) {
  if (getToken()) {
    if (route.path === '/login') {
      next('/')
    } else {
      const state = store.getState()
      if (state.user.permissions.length === 0) {
        try {
          await store.dispatch(userInfo()).unwrap()
          loadMenus(route, next)
        } catch (e) {
          store.dispatch(logout())
          location.reload()
        }
      } else if (state.user.loadMenus) {
        loadMenus(route, next)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(route.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
}

export function RouterGuard({ children, render }: PropsWithChildren<{
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
    setPageTitle(route.meta.title ? t(route.meta.title as any) : '')
    routerBeforeEach(route, next)
  }, [])

  return <>{auth ? children || render || RouterLoading : RouterLoading}</>
}
