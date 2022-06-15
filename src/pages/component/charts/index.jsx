import { useTranslation } from 'react-i18next/react-i18next'
import { Card, Space, Typography } from 'antd'

const { Link } = Typography

const ComponentCharts = () => {
  const { t } = useTranslation()
  return (
    <Card title={ <Space>
      <span> {t('menus.componentCharts') }</span>
      <Link href='https://charts.ant.design/zh' target='_blank'>
      https://charts.ant.design/zh
      </Link>
    </Space>} bordered={false}>
      {/*  */}
    </Card>
  )
}

export default ComponentCharts
