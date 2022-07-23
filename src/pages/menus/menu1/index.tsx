import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Card } from 'antd'
import React from 'react'

const Menu1: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Card bordered={false}>
      <Alert message={t('menus.menusMenu1')} description={<Outlet />} />
    </Card>
  )
}

export default Menu1
