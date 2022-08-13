import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import Storage, { StorageData } from '@/utils/storage'
import i18n, { getSpecifiedLanguage, defalutLanguage, LanguageType } from '@/language'

export const changeAppLange = createAsyncThunk('app/changeAppLange', async(lang: LanguageType) => {
  await i18n.changeLanguage(lang)
  const language = getSpecifiedLanguage(lang)
  dayjs.locale(language.dayjs)
  Storage.set('language', lang)
  return lang
})

const appSlice = createSlice({
  name: 'app',
  initialState: () => {
    const device = Storage.get('device')
    const sideBarOpend = Storage.get('sideBarOpend')
    return {
      device: device || 'desktop',
      sideBarOpend: sideBarOpend === null ? true : sideBarOpend,
      language: defalutLanguage,
      antdLanguage: getSpecifiedLanguage(defalutLanguage).antd
    }
  },
  reducers: {
    toogleSideBar(state) {
      Storage.set('sideBarOpend', !state.sideBarOpend)
      state.sideBarOpend = !state.sideBarOpend
    },
    toogleDevice(state, { payload }: PayloadAction<StorageData['device']>) {
      Storage.set('device', payload)
      state.device = payload
    },
    closeSideBar(state) {
      Storage.set('sideBarOpend', false)
      state.sideBarOpend = false
    }
  },
  extraReducers(builder) {
    builder.addCase(changeAppLange.fulfilled, (state, { payload }) => {
      state.language = payload
      state.antdLanguage = getSpecifiedLanguage(payload).antd
    })
  }
})

export const { toogleSideBar, toogleDevice, closeSideBar } = appSlice.actions

export default appSlice.reducer
