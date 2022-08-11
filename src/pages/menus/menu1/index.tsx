import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'

export default function Menu1() {
  const { t } = useTranslation()
  return <Alert message={t('menus.menusMenu1')} description={<Outlet />} />
}
