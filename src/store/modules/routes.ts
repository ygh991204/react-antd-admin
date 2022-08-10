import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { constantRoutes, formatRoutes, getShowRoutes } from '@/router'
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
    menuRoutes
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAsyncMenus.fulfilled, (state, { payload }) => {
      const { routes, menuRoutes } = createRoutes(payload)
      routes.push({
        path: '*',
        redirect: '/404',
        fullPath: '',
        meta: {}
      })
      state.routes = routes
      state.menuRoutes = menuRoutes
    })
  }
})

export default routesSlice.reducer
