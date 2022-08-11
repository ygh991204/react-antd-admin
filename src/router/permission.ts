import type { RouteLocation } from './hook'
import type { RouterGuardNext } from './guard'
import { notification } from 'antd'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { loadAsyncMenus } from '@/store/modules/routes'
import { setLoadMenus, userInfo, logout } from '@/store/modules/user'

const whiteList = ['/login']

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

/**
 * 路由守卫
 */
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
