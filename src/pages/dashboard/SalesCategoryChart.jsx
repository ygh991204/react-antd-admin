
import { Card } from 'antd'
import { Pie } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'

const SalesCategoryChart = () => {
  const { t } = useTranslation()
  const data = [
    {
      type: '分类一',
      value: 27
    },
    {
      type: '分类二',
      value: 25
    },
    {
      type: '分类三',
      value: 18
    },
    {
      type: '分类四',
      value: 58
    },
    {
      type: '分类五',
      value: 10
    },
    {
      type: '分类6',
      value: 10
    }
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}'
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      }
    ]
  }
  return <>
    <Card bordered={ false } title={t('dashboard.salesTypeRatio')}>
      <Pie {...config} />
    </Card>
  </>
}

export default SalesCategoryChart
