import type { RouteLocation } from '@/router/hook'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import constantRoutes from '@/router/constantRoutes'
import { formatRoutes, getAffixTabRoutes } from '@/router/helper'

const tabsSlice = createSlice({
  name: 'tabs',

  initialState: {
    pages: getAffixTabRoutes(formatRoutes(constantRoutes))
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
