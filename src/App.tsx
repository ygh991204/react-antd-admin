import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { cloneDeep } from 'lodash'

import { RoutesRender, RouterGuard } from '@/router'
import { useAppSelector } from './store'


const App: React.FC = () => {
  const routes = useAppSelector((state) => state.routes.routes)
  const antdLang = useAppSelector(state => state.language.antdLang)
  const element = useRoutes(RoutesRender(cloneDeep(routes)))
  return <>
    <ConfigProvider locale={antdLang}>
      <RouterGuard>
        { element }
      </RouterGuard>
    </ConfigProvider>
  </>
}

export default App
