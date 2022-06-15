import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { getLanguage, setLanguage } from '@/utils/auth'
import i18n from '@/i18n'

/** dayjs语言 */
import 'dayjs/locale/zh'
import 'dayjs/locale/en'

/** antd语言 */
import AntdZhCN from 'antd/lib/locale/zh_CN'
import AntdEnUS from 'antd/lib/locale/en_US'

const lang = getLanguage()

const dayjsLangs = {
  zh_CN: 'zh',
  en_US: 'en'
}
dayjs.locale(dayjsLangs[lang])

const antdLangs = {
  zh_CN: AntdZhCN,
  en_US: AntdEnUS
}
const antdLang = antdLangs[lang]

export const changeAppLange = createAsyncThunk('language/changeAppLange', async(lang, thunkApi) => {
  dayjs.locale(dayjsLangs[lang])
  await i18n.changeLanguage(lang)
  setLanguage(lang)
  return lang
})

const languageSlice = createSlice({

  name: 'language',

  initialState: {
    langs: [
      { key: 'zh_CN', label: '简体中文' },
      { key: 'en_US', label: 'English' }
    ],
    lang,
    antdLang
  },

  extraReducers(builder) {
    builder.addCase(changeAppLange.fulfilled, (state, { payload }) => {
      state.lang = payload
      state.antdLang = antdLangs[payload]
    })
  }

})

export default languageSlice.reducer
