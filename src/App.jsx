import { useMemo } from 'react'
import { Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'antd'
import { cloneDeep } from 'lodash'

import { RouterRender } from '@/router'

const App = () => {
  const routes = useSelector((state) => state.routes.routes)
  const antdLang = useSelector(state => state.language.antdLang)
  const menuRoutes = useMemo(() => {
    return cloneDeep(routes)
  }, [routes])
  return <>
    <ConfigProvider locale={antdLang}>
      <Routes>{RouterRender(menuRoutes)}</Routes>
    </ConfigProvider>
  </>
}

export default App
