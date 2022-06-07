
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from '@/store'
import App from './App'

import '@/assets/styles/index.less'
import 'normalize.css/normalize.css'
import 'virtual:svg-icons-register'

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
//   </React.StrictMode>
)
