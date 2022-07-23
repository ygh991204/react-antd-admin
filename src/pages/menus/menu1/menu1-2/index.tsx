
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'
import React from 'react'

const Menu1_2: React.FC = () => {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-2') } type='success'/>
}

export default Menu1_2
