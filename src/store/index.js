import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
// import * as loggerMiddleware from 'redux-logger'
const middlewares = [thunkMiddleware]

// /** 如果时 dev 环境， 添加 logger */
// if (process.env.NODE_ENV === 'dev') {
//   middlewares.push(loggerMiddleware.createLogger())
// }

/** 自动加载模块  https://vitejs.cn/guide/features.html#glob-import */
const modulesFiles = import.meta.globEager('./modules/*.js')
const reducer = Object.keys(modulesFiles)
  .sort()
  .reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace('modules/', '')
    const value = modulesFiles[modulePath]
    modules[moduleName] = value.default
    return modules
  }, {})

const store = configureStore({
  reducer,
  middleware: [...middlewares]
})

export default store
