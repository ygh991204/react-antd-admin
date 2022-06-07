import { createSlice } from '@reduxjs/toolkit'
import Storage from '@/utils/storage'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    device: Storage.get('device') || 'desktop', // mobile | device
    sideBarOpend: Storage.get('sideBarOpend') === null ? true : Storage.get('sideBarOpend')
  },
  reducers: {
    chageLang(state, { payload }) {
      state.langCur = payload
    },
    toogleSideBar(state) {
      Storage.set('sideBarOpend', !state.sideBarOpend)
      state.sideBarOpend = !state.sideBarOpend
    },
    toogleDevice(state, { payload }) {
      Storage.set('device', payload)
      state.device = payload
    },
    closeSideBar(state) {
      Storage.set('sideBarOpend', false)
      state.sideBarOpend = false
    }
  }
})

export const { chageLang, toogleSideBar, toogleDevice, closeSideBar } = appSlice.actions

export default appSlice.reducer
