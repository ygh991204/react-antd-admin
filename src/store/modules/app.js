import { createSlice } from '@reduxjs/toolkit'
import storage from '@/utils/storage'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    device: storage.get('device') || 'desktop', // mobile | device
    sideBarOpend: storage.get('sideBarOpend') === null ? true : storage.get('sideBarOpend')
  },
  reducers: {
    chageLang(state, { payload }) {
      state.langCur = payload
    },
    toogleSideBar(state) {
      storage.set('sideBarOpend', !state.sideBarOpend)
      state.sideBarOpend = !state.sideBarOpend
    },
    toogleDevice(state, { payload }) {
      storage.set('device', payload)
      state.device = payload
    },
    closeSideBar(state) {
      storage.set('sideBarOpend', false)
      state.sideBarOpend = false
    }
  }
})

export const { chageLang, toogleSideBar, toogleDevice, closeSideBar } = appSlice.actions

export default appSlice.reducer
