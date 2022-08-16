import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { cloneDeep } from 'lodash-es'
import { RoutesRender } from '@/router'
import { RouterGuard } from '@/router/permission'
import { useAppSelector } from '@/store'

export default function App() {
  const routes = useAppSelector((state) => state.permission.routes)
  const antdLanguage = useAppSelector((state) => state.app.antdLanguage)
  const element = useRoutes(RoutesRender(cloneDeep(routes)))
  return (
    <>
      <ConfigProvider locale={antdLanguage}>
        <RouterGuard>{element}</RouterGuard>
      </ConfigProvider>
    </>
  )
}
