
import { useTranslation } from 'react-i18next'
import { Alert, Card } from 'antd'
import React from 'react'

const Menu2: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Card bordered={ false }>
      <Alert message={ t('menus.menusMenu2') } />
    </Card>
  )
}

export default Menu2
