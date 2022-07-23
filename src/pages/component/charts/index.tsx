import { useTranslation } from 'react-i18next'
import { Card, Space, Typography } from 'antd'
import React from 'react'

const { Link } = Typography

const ComponentCharts: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Card title={ <Space>
      <span> {t('menus.componentCharts') }</span>
      <Link href='https://charts.ant.design/zh' target='_blank'>
      https://charts.ant.design/zh
      </Link>
    </Space>} bordered={false} />
  )
}

export default ComponentCharts
