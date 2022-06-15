import 'virtual:svg-icons-register'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import '@/assets/styles/index.less'
import 'normalize.css/normalize.css'

import store from '@/store'
import App from '@/App'

import '@/i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
//   </React.StrictMode>
)
