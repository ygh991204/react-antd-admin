
import { createSlice } from '@reduxjs/toolkit'
import Storage from '@/utils/storage'

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    logo: Storage.get('setting_logo') === null ? true : Storage.get('setting_logo'),
    tabs: Storage.get('setting_tabs') === null ? true : Storage.get('setting_tabs')
  },
  reducers: {
    toogleLogo(state, { payload }) {
      Storage.set('setting_logo', payload)
      state.logo = payload
    },
    toogleTabs(state, { payload }) {
      Storage.set('setting_tabs', payload)
      state.tabs = payload
    }
  }
})

export const { toogleLogo, toogleTabs } = settingSlice.actions

export default settingSlice.reducer
