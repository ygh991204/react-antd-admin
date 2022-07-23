import { createSlice } from '@reduxjs/toolkit'
import Storage from '@/utils/storage'

const settingSlice = createSlice({
  name: 'setting',
  initialState: () => {
    const logo = Storage.get('settingLogo')
    const tabs = Storage.get('settingTabs')
    return {
      logo: logo === null ? true : logo,
      tabs: tabs === null ? true : tabs,
    }
  },
  reducers: {
    toogleLogo(state, { payload }) {
      Storage.set('settingLogo', payload)
      state.logo = payload
    },
    toogleTabs(state, { payload }) {
      Storage.set('settingTabs', payload)
      state.tabs = payload
    }
  }
})

export const { toogleLogo, toogleTabs } = settingSlice.actions

export default settingSlice.reducer
