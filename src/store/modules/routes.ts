import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { formatRoutes, getShowRoutes } from '@/router/helper'
import constantRoutes, { ErrorRoute } from '@/router/constantRoutes'
import { getMenus } from '@/api/user'

function createRoutes(menus: CaseRoute[] = []) {
  const _constantRoutes = cloneDeep(constantRoutes)
  const menuRoutes = _constantRoutes.filter((v => v.path === '/'))[0].children
  if (menuRoutes) {
    menuRoutes.push(...menus)
  }
  const routes = formatRoutes(_constantRoutes)
  const _menuRoutes = routes.filter((v) => v.path === '/')[0].children || []
  return {
    routes,
    menuRoutes: getShowRoutes(cloneDeep(_menuRoutes))
  }
}

export const loadAsyncMenus = createAsyncThunk('routes/loadAsyncMenus', async() => {
  const response = await getMenus()
  return response.data
})

const { routes, menuRoutes } = createRoutes()

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes: routes,
    menuRoutes: menuRoutes
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAsyncMenus.fulfilled, (state, { payload }) => {
      const { routes, menuRoutes } = createRoutes(payload)
      routes.push(ErrorRoute)
      state.routes = routes as any
      state.menuRoutes = menuRoutes as any
    })
    builder.addCase(loadAsyncMenus.rejected, (state) => {
      state.routes.push(ErrorRoute as any)
    })
  }
})

export default routesSlice.reducer
