import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { constantRoutes, formatRoutes } from '@/router'
import type { RouteLocation } from '@/router/hooks'

function getAffixTabRoutes(routes: Route[], tags: RouteLocation[] = []) {
  return routes.reduce((prev, route) => {
    if (route.meta && route.meta.affixTab) {
      prev.push({
        ...route,
        path: route.fullPath || '',
        hash: '',
        match: route,
        matched: [],
        params: {},
        query: {},
      })
    }
    if (route.children) {
      getAffixTabRoutes(route.children, prev)
    }
    return prev
  }, tags)
}

const tabsSlice = createSlice({
  name: 'tabs',

  initialState: {
    pages: getAffixTabRoutes(formatRoutes(constantRoutes)),
  },

  reducers: {
    addTabsPage(state, { payload }: PayloadAction<RouteLocation>) {
      if (state.pages.some((v) => v.path === payload.path)) return
      state.pages.push(
        Object.assign({}, payload, {
          title: payload.meta.title || 'no-name',
        })
      )
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
