
import { Card, Space, Typography, Alert } from 'antd'
import React from 'react'

const { Link } = Typography

const ComponentCharts: React.FC = () => {
  return (
    <>
      <Alert
        message={
          <>
            <p>图表是后台管理常见的功能。推荐 Ant Design Charts，基于 antv，对 React 更友好，功能也比较全</p>
            <p>当然 ECharts 也是不错的选择</p>
          </>
        }
        type='info'
      />
      <Card style={{ marginTop: '20px' }} title={ <Space>
        <Link href='https://charts.ant.design/zh' target='_blank'>
                  https://charts.ant.design/zh
        </Link>
      </Space>} bordered={false} />
    </>

  )
}

export default ComponentCharts
