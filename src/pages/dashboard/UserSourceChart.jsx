
import { Rose } from '@ant-design/plots'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

const UserSourceChart = () => {
  const { t } = useTranslation()
  const data = [
    {
      type: '来源一',
      value: 27
    },
    {
      type: '来源二',
      value: 25
    },
    {
      type: '来源三',
      value: 18
    },
    {
      type: '来源四',
      value: 15
    },
    {
      type: '来源五',
      value: 10
    },
    {
      type: '其他',
      value: 5
    }
  ]
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: {
      position: 'bottom'
    }
  }
  return <>
    <Card bordered={ false } title={t('dashboard.userSource')}>
      <Rose {...config} />
    </Card>
  </>
}

export default UserSourceChart
