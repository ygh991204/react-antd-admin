
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'
import React from 'react'

const Menu1_1: React.FC = () => {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-1') } type='success'/>
}

export default Menu1_1
