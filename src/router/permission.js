
import store from '@/store'
import { getToken } from '@/utils/auth'
import { wait } from '@/utils'
import { getMenus } from '@/api/user'
import { addRoutes } from '@/store/modules/routes'
import { setLoadMenus, userInfo, logout } from '@/store/modules/user'
import { formatRoutes } from '@/router/routes'

const whiteList = ['/login']

const loadMenus = async(route, next) => {
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
export const routerBeforeEach = async(route, next) => {
  await wait(300)
  const state = store.getState()
  if (getToken()) {
    if (route.path === '/login') {
      next('/')
    } else {
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
      next({
        path: '/login',
        query: {
          redirect: route.fullPath
        }
      })
    }
  }
}

