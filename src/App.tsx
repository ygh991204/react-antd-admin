import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { cloneDeep } from 'lodash'

import { RoutesRender } from '@/router'
import { RouterGuard } from '@/router/guard'
import { useAppSelector } from '@/store'

export default function App() {
  const routes = useAppSelector((state) => state.routes.routes)
  const antdLang = useAppSelector((state) => state.language.antdLang)
  const element = useRoutes(RoutesRender(cloneDeep(routes)))
  return (
    <>
      <ConfigProvider locale={antdLang}>
        <RouterGuard>{element}</RouterGuard>
      </ConfigProvider>
    </>
  )
}
