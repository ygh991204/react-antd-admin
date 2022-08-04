import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { constantRoutes } from '@/router'
import { validateURL } from '@/utils/validate'
import { getMenus } from '@/api/user'

export function formatRoutes(routes: CaseRoute[], parentFullPath = ''): Route[] {
  return routes.map((route) => {
    let children
    let fullPath = route.path
    if (!validateURL(route.path)) {
      fullPath = parentFullPath + (route.path === '/' ? '' : route.path)
      children = route.children && route.children.length ? formatRoutes(route.children, fullPath + '/') : undefined
    }
    return {
      ...route,
      fullPath,
      children: children,
      meta: route.meta ? { ...route.meta } : {}
    }
  })
}

function getShowRoutes(routes: Route[] = []): Route[] {
  return routes.filter((route) => {
    if (route.meta.hidden) {
      return false
    } else {
      if (route.children) {
        route.children = getShowRoutes(route.children)
      }
      return true
    }
  })
}

function createRoutes(menus: CaseRoute[] = []) {
  const _constantRoutes = cloneDeep(constantRoutes)
  constantRoutes.filter((v) => v.path === '/')[0].children?.push(...menus)
  const routes = formatRoutes(_constantRoutes)
  const _menuRoutes = routes.filter((v) => v.path === '/')[0].children || []
  return {
    routes,
    menuRoutes: getShowRoutes(_menuRoutes)
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
    routes,
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
