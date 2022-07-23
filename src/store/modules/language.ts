import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

/** antd语言 */
import AntdZhCN from 'antd/lib/locale/zh_CN'
import AntdEnUS from 'antd/lib/locale/en_US'

/** dayjs语言 */
import 'dayjs/locale/zh'
import 'dayjs/locale/en'

import i18n from '@/i18n'
import Storage from '@/utils/storage'
import Config from '@/config'
import type { Locale } from 'antd/lib/locale-provider'

const defaultLang = Storage.get('lang') || Config.lang

const dayjsLangs = {
  zh_CN: 'zh',
  en_US: 'en',
}

const antdLangs = {
  zh_CN: AntdZhCN,
  en_US: AntdEnUS,
}

dayjs.locale(dayjsLangs[defaultLang])

export const changeAppLange = createAsyncThunk('language/changeAppLange', async (lang: AppLange) => {
  dayjs.locale(dayjsLangs[lang])
  await i18n.changeLanguage(lang)
  Storage.set('lang', lang)
  return lang
})

interface LanguageState {
  lang: AppLange
  langs: { key: AppLange; label: string }[]
  antdLang: Locale
}

const initialState: LanguageState = {
  langs: [
    { key: 'zh_CN', label: '简体中文' },
    { key: 'en_US', label: 'English' },
  ],
  lang: defaultLang,
  antdLang: antdLangs[defaultLang],
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeAppLange.fulfilled, (state, { payload }) => {
      state.lang = payload
      state.antdLang = antdLangs[payload]
    })
  },
})

export default languageSlice.reducer
