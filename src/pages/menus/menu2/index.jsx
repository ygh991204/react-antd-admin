
import { useTranslation } from 'react-i18next/react-i18next'
import { Alert, Card } from 'antd'

const Menu2 = () => {
  const { t } = useTranslation()
  return (
    <Card bordered={ false }>
      <Alert message={ t('menus.menusMenu2') } />
    </Card>
  )
}

export default Menu2
