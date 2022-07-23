import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { constantRoutes, formatRoutes } from '@/router/routes'

const routes = formatRoutes(constantRoutes)

export function getMenuRoutes(routes: Route[]) {
  return routes.filter((v) => v.path === '/')[0].children || []
}

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes: routes,
    menuRoutes: getMenuRoutes(cloneDeep(routes)),
  },
  reducers: {
    addRoutes(state, { payload }) {
      getMenuRoutes(state.routes).push(payload)
      state.routes.push({
        path: '*',
        redirect: '/404',
      })
      state.menuRoutes.push(payload)
    }
  }
})

export const { addRoutes } = routesSlice.actions

export default routesSlice.reducer
