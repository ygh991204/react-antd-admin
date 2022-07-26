import React from 'react'
import { Descriptions, Card, Divider, Table } from 'antd'

import type { ColumnsType } from 'antd/es/table'

import data, { Commodity, createCommodity } from './data'

data.commoditys.push(
  createCommodity(
    '总计',
    '',
    data.commoditys.reduce((prev, v) => {
      prev += v.totalPrice
      return prev
    }, 0),
    data.commoditys.reduce((prev, v) => {
      prev += v.count
      return prev
    }, 0)
  )
)

const columns: ColumnsType<Commodity> = [
  {
    title: '商品编号',
    dataIndex: 'id',
    onCell: (_, index) => ({
      colSpan: (index as number) < data.commoditys.length - 1 ? 1 : 4
    })
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    onCell: (_, index) => ({
      colSpan: (index as number) < data.commoditys.length - 1 ? 1 : 0
    })
  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
    onCell: (_, index) => ({
      colSpan: (index as number) < data.commoditys.length - 1 ? 1 : 0
    })
  },
  {
    title: '单价',
    dataIndex: 'price',
    render: (_, { price }) => '￥' + price + '.00',
    onCell: (_, index) => ({
      colSpan: (index as number) < data.commoditys.length - 1 ? 1 : 0
    })
  },
  {
    title: '数量',
    dataIndex: 'count'
  },
  {
    title: '金额',
    dataIndex: 'totalPrice',
    render: (_, { totalPrice }) => totalPrice + '.00'
  }
]

const DetailBasis: React.FC = () => {
  return (
    <Card bordered={false}>
      <Descriptions title='订单详情'>
        <Descriptions.Item label='订单编号'>{data.id}</Descriptions.Item>
        <Descriptions.Item label='状态'>{data.state}</Descriptions.Item>
        <Descriptions.Item label='店铺名称'>{data.store}</Descriptions.Item>
        <Descriptions.Item label='物流信息'>{data.express}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title='用户信息'>
        <Descriptions.Item label='用户姓名'>{data.user.name}</Descriptions.Item>
        <Descriptions.Item label='联系电话'>{data.user.tel}</Descriptions.Item>
        <Descriptions.Item label='常用快递'>{data.user.express}</Descriptions.Item>
        <Descriptions.Item label='收货地址'>{data.user.address}</Descriptions.Item>
        <Descriptions.Item label='备注'>{data.user.remark || '无'}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Table columns={columns} pagination={false} dataSource={data.commoditys} />
    </Card>
  )
}

export default DetailBasis
