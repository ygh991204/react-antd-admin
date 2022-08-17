import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Statistic } from 'antd'
import SalesCategoryChart from './SalesCategoryChart'
import UserSourceChart from './UserSourceChart'
import SalesChart from './SalesChart'

function StatisticsCard({ children }: PropsWithChildren) {
  return (
    <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
      <Card bordered={false}>{children}</Card>
    </Col>
  )
}

function DashboardAnalyze() {
  const { t } = useTranslation()
  return (
    <>
      <Row gutter={[20, 20]}>
        <StatisticsCard>
          <Statistic title={t('dashboard.totalSales')} prefix='￥' valueStyle={{ fontSize: '32px' }} value={199120} />
        </StatisticsCard>
        <StatisticsCard>
          <Statistic title={t('dashboard.paysCount')} valueStyle={{ fontSize: '32px' }} value={4012} />
        </StatisticsCard>
        <StatisticsCard>
          <Statistic title={t('dashboard.totalUserCount')} valueStyle={{ fontSize: '32px' }} value={21999} />
        </StatisticsCard>
        <StatisticsCard>
          <Statistic title={t('dashboard.operEffect')} valueStyle={{ fontSize: '32px' }} suffix='%' value={87} />
        </StatisticsCard>
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
