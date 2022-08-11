import { useTranslation } from 'react-i18next'
import { Result, Button } from 'antd'
import { useRouter } from '@/router/hook'

export default function() {
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
