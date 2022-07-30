import { useTranslation } from 'react-i18next'
import { Card, Space, Typography } from 'antd'
import RichText from '@/components/RichText'
import React from 'react'

const { Link } = Typography

const ComponentRichText: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Card
      title={
        <Space>
          <span> {t('menus.componentRichText')}</span>
          <Link href='https://quilljs.com/' target='_blank'>
          https://quilljs.com/
          </Link>
        </Space>
      }
      bordered={false}>
      <RichText/>
    </Card>
  )
}

export default ComponentRichText
