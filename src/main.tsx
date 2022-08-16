import 'virtual:svg-icons-register'
import { setupProdMockServer } from '../mock/_prodServer'
import { EnvConfig } from './env'
if (EnvConfig.APP_NODE_ENV !== 'development') {
  setupProdMockServer()
}

import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/App'
import '@/language'
import '@/assets/styles/index.less'
import 'normalize.css/normalize.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
