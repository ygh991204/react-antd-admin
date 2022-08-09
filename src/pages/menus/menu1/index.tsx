import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'
import React from 'react'

const Menu1: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Alert message={t('menus.menusMenu1')} description={<Outlet />} />
  )
}

export default Menu1
