
import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'

export default function Menu1_1() {
  const { t } = useTranslation()
  return <Alert message={ t('menus.menusMenu1-1') } type='success'/>
}
