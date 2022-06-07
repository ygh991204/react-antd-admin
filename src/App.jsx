import { useMemo } from 'react'
import { Routes } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'antd'
import { RouterGuard, renderRouter } from './router'
import './assets/styles/index.less'

const App = () => {
  const routes = useSelector((state) => state.routes.routes)
  const antdLang = useSelector(state => state.language.antdLang)
  const menuRoutes = useMemo(() => {
    return cloneDeep(routes)
  }, [routes])
  return <>
    <ConfigProvider locale={antdLang}>
      <RouterGuard><Routes>{renderRouter(menuRoutes)}</Routes></RouterGuard>
    </ConfigProvider>
  </>
}

export default App
