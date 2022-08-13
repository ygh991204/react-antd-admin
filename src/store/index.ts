import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import appReducer from './modules/appSlice'
import permissionReducer from './modules/permissionSlice'
import settingReducer from './modules/settingSlice'
import userReducer from './modules/userSlice'
import tabsReducer from './modules/tabsSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
    permission: permissionReducer,
    setting: settingReducer,
    user: userReducer,
    tabs: tabsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
