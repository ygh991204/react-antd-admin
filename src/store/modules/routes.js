
import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { constantRoutes, formatRoutes } from '@/router/routes'

const generateRoutes = (menu) => {
  const _routes = cloneDeep(constantRoutes)
  const _menueRoute = _routes.filter(v => v.path === '/')[0]
  _menueRoute.children = _menueRoute.children.concat([...menu])
  const routes = formatRoutes(_routes)
  const menuRoutes = [...routes.filter(v => v.path === '/')[0].children]
  return {
    routes,
    menuRoutes
  }
}

const { routes, menuRoutes } = generateRoutes([])

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes: [...routes],
    menuRoutes: [...menuRoutes]
  },
  reducers: {
    addRoutes(state, { payload }) {
      const { routes, menuRoutes } = generateRoutes(payload)
      state.routes = [...routes, {
        path: '*',
        redirect: '/404'
      }]
      state.menuRoutes = [...menuRoutes]
    }
  }
})

export const { addRoutes } = routesSlice.actions

export default routesSlice.reducer
