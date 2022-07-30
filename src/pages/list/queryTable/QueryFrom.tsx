import React from 'react'
import { Form, Card, Row, Col, Select, Input, Space, Button } from 'antd'

import { GetListQueryFrom } from '@/api/list'
import DatePicker from '@/components/DatePicker'

const { RangePicker } = DatePicker

const { Option } = Select

const StatusOption: {
  value: BasisListItem['status']
  label: string
}[] = [
  {
    value: 1,
    label: '已开启'
  },
  {
    value: 2,
    label: '已关闭'
  }
]
interface QueryFromProps {
  onChange: (params: GetListQueryFrom) => void
}

const QueryCol: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  return (
    <Col xxl={6} xl={8} lg={8} md={12} sm={12} xs={24}>
      {children}
    </Col>
  )
}

const QueryFrom = React.memo<QueryFromProps>(({ onChange }) => {
  const [form] = Form.useForm()

  function formFinish(values: any) {
    const _data: GetListQueryFrom = {
      name: values.name,
      status: values.status,
      createTime: values.createTime ?
        [values.createTime[0].format('YYYY-MM-DD'), values.createTime[1].format('YYYY-MM-DD')] :
        undefined
    }
    console.log(_data)
    onChange(_data)
  }

  function formClear() {
    form.resetFields()
    formSubmit()
  }

  function formSubmit() {
    form.submit()
  }

  return (
    <>
      <Card bordered={false}>
        <Form form={form} onFinish={formFinish}>
          <Row gutter={[24, 0]}>
            <QueryCol>
              <Form.Item label='名称' name='name'>
                <Input placeholder='输入名称' allowClear onPressEnter={formSubmit} />
              </Form.Item>
            </QueryCol>
            <QueryCol>
              <Form.Item label='状态' name='status'>
                <Select placeholder='选择状态' allowClear onChange={formSubmit}>
                  {StatusOption.map((v) => (
                    <Option key={'status' + v.value} value={v.value}>
                      {v.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </QueryCol>
            <QueryCol>
              <Form.Item label='日期范围' name='createTime'>
                <RangePicker allowClear onChange={formSubmit} />
              </Form.Item>
            </QueryCol>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item style={{ marginBottom: '0' }}>
                <Space>
                  <Button type='primary' onClick={formSubmit}>
                    查询
                  </Button>
                  <Button onClick={formClear}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
})

export default QueryFrom
