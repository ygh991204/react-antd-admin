import 'virtual:svg-icons-register'

import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Config from './config'

import '@/assets/styles/index.less'
import 'normalize.css/normalize.css'

import store from '@/store'
import App from '@/App'

import '@/i18n'

import { setupProdMockServer } from '../mock/_prodServer'

/** 非开发模式下，添加mock */
if (Config.env !== 'development') {
  console.log('6666')
  setupProdMockServer()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
