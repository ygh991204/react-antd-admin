
import { Result, Button } from 'antd'
import { useRouter } from '@/router'
import { useTranslation } from 'react-i18next'

const Error404 = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return <Result
    status='404'
    title='404'
    subTitle={t('error.404Tip')}
    extra={<Button type='primary' onClick={() => {
      router.replace('/')
    }}>{t('app.backHome')}</Button>}
  />
}

export default Error404
