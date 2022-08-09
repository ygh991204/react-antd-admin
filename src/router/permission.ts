import type { RouteLocation } from './useRoute'
import type { RouterGuardNext } from './RouterGuard'

import store from '@/store'
import { getToken } from '@/utils/auth'
import { loadAsyncMenus } from '@/store/modules/routes'
import { setLoadMenus, userInfo, logout } from '@/store/modules/user'

const whiteList = ['/login']

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
          store.dispatch(setLoadMenus(false))
          await store.dispatch(loadAsyncMenus()).unwrap()
          next({ replace: true, path: route.fullPath })
        } catch (e) {
          store.dispatch(logout())
          location.reload()
        }
      } else if (state.user.loadMenus) {
        store.dispatch(setLoadMenus(false))
        await store.dispatch(loadAsyncMenus()).unwrap()
        next({ replace: true, path: route.fullPath })
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
