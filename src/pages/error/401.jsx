import { useTranslation } from 'react-i18next/react-i18next'
import { Result, Button } from 'antd'
import { useRouter } from '@/router'

const Error401 = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return <Result
    status='403'
    title='401'
    subTitle={t('error.401Tip')}
    extra={<Button type='primary' onClick={() => {
      router.replace('/')
    }}>{t('app.backHome')}</Button>}
  />
}

export default Error401
