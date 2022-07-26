import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Tooltip } from 'antd'
import React from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

import SalesCategoryChart from './SalesCategoryChart'
import UserSourceChart from './UserSourceChart'
import SalesChart from './SalesChart'

const CardHeader: React.FC<{
  title: string
  data: string
}> = ({ title, data }) => {
  const { t } = useTranslation()
  return (
    <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
      <Card bordered={false}>
        <div
          style={{ color: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{title}</span>
          <Tooltip title={t('dashboard.intorDes')}>
            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
        </div>
        <div style={{ fontSize: '32px', paddingTop: '6px', paddingLeft: '5px' }}>{data}</div>
      </Card>
    </Col>
  )
}

const DashboardAnalyze: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Row gutter={[20, 20]}>
        <CardHeader title={t('dashboard.totalSales')} data='¥ 199,120' />
        <CardHeader title={t('dashboard.paysCount')} data='4,012' />
        <CardHeader title={t('dashboard.totalUserCount')} data='21,999' />
        <CardHeader title={t('dashboard.operEffect')} data='87%' />
      </Row>
      <SalesChart />
      <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <UserSourceChart />
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <SalesCategoryChart />
        </Col>
      </Row>
    </>
  )
}

export default DashboardAnalyze
