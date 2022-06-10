import { useMemo } from 'react'
import { Routes, HashRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { ConfigProvider } from 'antd'
import store from '@/store'

import { RouterGuard, renderRouter } from './router'

const App = () => {
  const routes = useSelector((state) => state.routes.routes)
  const antdLang = useSelector(state => state.language.antdLang)
  const menuRoutes = useMemo(() => {
    return cloneDeep(routes)
  }, [routes])
  return <>
    <Provider store={store}>
      <ConfigProvider locale={antdLang}>
        <HashRouter>
          <RouterGuard><Routes>{renderRouter(menuRoutes)}</Routes></RouterGuard>
        </HashRouter>
      </ConfigProvider>
    </Provider>
  </>
}

export default App
