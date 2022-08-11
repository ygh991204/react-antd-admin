import { Card } from 'antd'
import { Column, ColumnConfig } from '@ant-design/plots'

function SalesChart() {
  const data = [
    {
      type: '1月',
      sales: 25860
    },
    {
      type: '2月',
      sales: 14553
    },
    {
      type: '3月',
      sales: 35698
    },
    {
      type: '4月',
      sales: 25860
    },
    {
      type: '5月',
      sales: 41142
    },
    {
      type: '6月',
      sales: 43645
    },
    {
      type: '7月',
      sales: 23455
    },
    {
      type: '8月',
      sales: 54222
    },
    {
      type: '9月',
      sales: 75544
    },
    {
      type: '10月',
      sales: 25860
    },
    {
      type: '11月',
      sales: 47844
    },
    {
      type: '12月',
      sales: 36977
    }
  ]
  const config: ColumnConfig = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: '类别'
      },
      sales: {
        alias: '销售额'
      }
    }
  }
  return <>
    <Card style={{ marginTop: '20px' }} bordered={ false }>
      <Column {...config} />
    </Card>
  </>
}

export default SalesChart
