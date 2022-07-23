import store from '@/store'
import { getToken } from '@/utils/auth'
import { getMenus } from '@/api/user'
import { addRoutes } from '@/store/modules/routes'
import { setLoadMenus, userInfo, logout } from '@/store/modules/user'
import { formatRoutes } from '@/router/routes'

import type { RouteLocation } from './hooks'
import type { RouterGuardNext } from './component'

const whiteList = ['/login']

async function loadMenus(route: RouteLocation, next: RouterGuardNext) {
  store.dispatch(setLoadMenus(false))
  const _menus = await getMenus()
  const _memuData = [..._menus.data]
  const _routes = formatRoutes(_memuData)
  store.dispatch(addRoutes(_routes))
  next({ replace: true, path: route.fullPath })
}

/**
 * 守卫，路由组件渲染之前执行
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
          await loadMenus(route, next)
        } catch (e) {
          store.dispatch(logout())
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
      next({ path: '/login' }, false)
    }
  }
}
