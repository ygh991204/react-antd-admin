import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'antd'
import { cloneDeep } from 'lodash'

import { RoutesRender, RouterGuard } from '@/router'

const App = () => {
  const routes = useSelector((state) => cloneDeep(state.routes.routes))
  const antdLang = useSelector(state => state.language.antdLang)
  const element = useRoutes(RoutesRender(routes))
  return <>
    <ConfigProvider locale={antdLang}>
      <RouterGuard>
        { element }
      </RouterGuard>
    </ConfigProvider>
  </>
}

export default App
