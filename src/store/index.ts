import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// import thunkMiddleware from 'redux-thunk'
// import * as loggerMiddleware from 'redux-logger'
// const middlewares = [thunkMiddleware]

/** modules */
import app from './modules/app'
import language from './modules/language'
import routes from './modules/routes'
import setting from './modules/setting'
import user from './modules/user'
import tabs from './modules/tabs'

/** 如果时 dev 环境， 添加 logger */
// if (process.env.NODE_ENV === 'dev') {
//   middlewares.push(loggerMiddleware.createLogger())
// }

const store = configureStore({
  reducer: { app, language, routes, setting, user, tabs}
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
