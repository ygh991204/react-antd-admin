import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'

const Menu1_1 = () => {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-1') } type='success'/>
}

export default Menu1_1
