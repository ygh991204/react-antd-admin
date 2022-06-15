
import { useTranslation } from 'react-i18next/react-i18next'
import { Alert } from 'antd'

const Menu1_2 = () => {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-2') } type='success'/>
}

export default Menu1_2
