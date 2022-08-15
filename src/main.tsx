import 'virtual:svg-icons-register'
import config from './config'
import { setupProdMockServer } from '../mock/_prodServer'

// 非开发模式下 添加 mock
if (config.mode !== 'development') {
  setupProdMockServer()
}

import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@/store'
import App from '@/App'

import '@/assets/styles/index.less'
import 'normalize.css/normalize.css'

import '@/language'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
