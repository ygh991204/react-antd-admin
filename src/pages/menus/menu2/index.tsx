
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'
import React from 'react'

const Menu2: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Alert message={ t('menus.menusMenu2') } />
  )
}

export default Menu2
