import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { constantRoutes, formatRoutes } from '@/router/routes'

export function getMenuRoutes(routes: CaseRoute[]) {
  return routes.filter((v) => v.path === '/')[0].children || []
}

function createRoutes(menus: CaseRoute[] = []) {
  const _constantRoutes = cloneDeep(constantRoutes)
  getMenuRoutes(_constantRoutes).push(...menus)
  const routes = formatRoutes(_constantRoutes)
  return {
    routes,
    menuRoutes: getMenuRoutes(routes) as Route[],
  }
}

const { routes, menuRoutes } = createRoutes()

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes,
    menuRoutes,
  },
  reducers: {
    addRoutes(state, { payload }: PayloadAction<CaseRoute[]>) {
      const { routes, menuRoutes } = createRoutes(payload)
      state.routes = routes.concat({
        path: '*',
        redirect: '/404',
        fullPath: '',
        meta: {},
      })
      state.menuRoutes = menuRoutes
    }
  },
})

export const { addRoutes } = routesSlice.actions

export default routesSlice.reducer
