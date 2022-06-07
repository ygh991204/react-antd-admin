import { Outlet } from 'react-router-dom'
import { Alert, Card } from 'antd'
import { useTranslation } from 'react-i18next'

const Menu1 = () => {
  const { t } = useTranslation()
  return (
    <Card bordered={ false }>
      <Alert message={ t('menus.menusMenu1') } description={ <Outlet /> }/>
    </Card>
  )
}

export default Menu1
