import type { RouteRecord } from '@/router/type'
import type { RouteLocation } from '@/router/hook'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { constantRoutes } from '@/router/constant'
import { formatRoutes } from '@/router/helper'

export function getAffixTabRoutes(routes: RouteRecord[], tags: RouteLocation[] = []) {
  return routes.reduce((prev, route) => {
    if (route.meta && route.meta.affixTab) {
      prev.push({
        ...route,
        path: route.fullPath,
        hash: '',
        match: route,
        matched: [],
        params: {},
        query: {}
      })
    }
    if (route.children) {
      getAffixTabRoutes(route.children, prev)
    }
    return prev
  }, tags)
}

const initialStatePages = getAffixTabRoutes(formatRoutes(constantRoutes))

const tabsSlice = createSlice({
  name: 'tabs',

  initialState: {
    pages: initialStatePages
  },

  reducers: {

    addTabsPage(state, { payload }: PayloadAction<RouteLocation>) {
      if (state.pages.some((v) => v.path === payload.path)) return
      state.pages.push(Object.assign({}, payload) as any)
    },

    delTabsPage(state, { payload }: PayloadAction<{ path: string }>) {
      for (const [i, v] of state.pages.entries()) {
        if (v.path === payload.path) {
          state.pages.splice(i, 1)
          break
        }
      }
    },

    delAllTabPage(state) {
      state.pages = state.pages.filter((v) => {
        return v.meta && v.meta.affixTab
      })
    },

    delOtherTabPage(state, { payload }: PayloadAction<{ path: string }>) {
      state.pages = state.pages.filter((v) => {
        return (v.meta && v.meta.affixTab) || v.path === payload.path
      })
    }

  }
})

export const { delAllTabPage, delTabsPage, addTabsPage, delOtherTabPage } = tabsSlice.actions

export default tabsSlice.reducer
