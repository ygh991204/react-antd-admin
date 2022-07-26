import { useTranslation } from 'react-i18next'
import { Card, Space, Typography, Divider, Radio, Alert } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'
import Calendar from '@/components/Calendar'
import { changeAppLange } from '@/store/modules/language'

const { Link } = Typography

const I18n: React.FC = () => {
  const { t } = useTranslation()
  const { lang, langs } = useAppSelector((state) => state.language)
  const dispatch = useAppDispatch()
  return (
    <Card
      title={
        <Space>
          <span> {t('menus.i18n')}</span>
          <Link href='https://react.i18next.com/' target='_blank'>
            https://react.i18next.com/
          </Link>
        </Space>
      }
      bordered={false}>
      <Divider orientation='left'>切换语言</Divider>
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
      <Divider orientation='left'>效果展示</Divider>
      <Space direction='vertical'>
        <Alert message={t('i18n.title')} type='info' />
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
