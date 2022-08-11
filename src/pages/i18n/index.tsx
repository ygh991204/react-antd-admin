import { useTranslation } from 'react-i18next'
import { Card, Space, Typography, Radio, Alert } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'
import Calendar from '@/components/Calendar'
import { changeAppLange } from '@/store/modules/language'

const { Link } = Typography

function I18n() {
  const { t } = useTranslation()
  const { lang, langs } = useAppSelector((state) => state.language)
  const dispatch = useAppDispatch()
  return (
    <Card
      title={
        <Space>
          <Link href='https://react.i18next.com/' target='_blank'>
            https://react.i18next.com/
          </Link>
        </Space>
      }
      bordered={false}>
      <Radio.Group
        options={langs.map((v) => ({
          label: v.label,
          value: v.key
        }))}
        onChange={(val) => {
          dispatch(changeAppLange(val.target.value))
        }}
        value={lang}
        optionType='button'
        buttonStyle='solid'
      />
      <Space direction='vertical'>
        <Alert style={{ margin: '15px 0' }} message={t('i18n.title')} type='info' />
        <Space>
          <DatePicker />
          <TimePicker />
        </Space>
        <Calendar />
      </Space>
    </Card>
  )
}

export default I18n
