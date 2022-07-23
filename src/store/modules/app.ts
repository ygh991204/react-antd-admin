import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import storage, { StorageData } from '@/utils/storage'

const appSlice = createSlice({
  name: 'app',
  initialState: () => {
    const device = storage.get('device')
    const sideBarOpend = storage.get('sideBarOpend')
    return {
      device: device || 'desktop',
      sideBarOpend: sideBarOpend === null ? true : sideBarOpend,
    }
  },
  reducers: {
    toogleSideBar(state) {
      storage.set('sideBarOpend', !state.sideBarOpend)
      state.sideBarOpend = !state.sideBarOpend
    },
    toogleDevice(state, { payload }: PayloadAction<StorageData['device']>) {
      storage.set('device', payload)
      state.device = payload
    },
    closeSideBar(state) {
      storage.set('sideBarOpend', false)
      state.sideBarOpend = false
    }
  }
})

export const { toogleSideBar, toogleDevice, closeSideBar } = appSlice.actions

export default appSlice.reducer
