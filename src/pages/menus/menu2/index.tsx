import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'

export default function Menu2() {
  const { t } = useTranslation()
  return <Alert message={t('menus.menusMenu2')} />
}
