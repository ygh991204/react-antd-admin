
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'

export default function Menu1_2() {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-2') } type='success'/>
}
