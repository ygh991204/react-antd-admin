import React, { useEffect, useCallback, useState } from 'react'
import { Button, Form, Space, Card, Input, Select, Table } from 'antd'
import { getList, GetListQueryFrom } from '@/api/list'
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
        <Form form={form} layout='inline' onFinish={formFinish}>
          <Form.Item label='名称' name='name'>
            <Input placeholder='输入名称' onPressEnter={formSubmit} />
          </Form.Item>
          <Form.Item label='状态' name='status'>
            <Select placeholder='选择状态' onChange={formSubmit}>
              {StatusOption.map((v) => (
                <Option key={'status' + v.value} value={v.value}>
                  {v.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='日期范围' name='createTime'>
            <RangePicker onChange={formSubmit} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={formClear}>重置</Button>
              <Button type='primary' onClick={formSubmit}>
                查询
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
})
const ListQueryTable: React.FC = () => {
  const [data, setData] = useState<BasisListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({
    index: 1
  })

  const [count, setCount] = useState(1)

  const [query, setQuery] = useState<GetListQueryFrom>({
    name: undefined,
    createTime: undefined,
    status: undefined
  })

  async function refresh() {
    setLoading(true)
    const response = await getList({
      pageIndex: page.index,
      ...query
    })
    setData(response.data.list)
    setCount(response.data.count)
    setLoading(false)
  }

  async function toQuery() {
    setPage({ index: 1 })
  }

  async function pageChange(page: number) {
    setPage({ index: page })
  }

  useEffect(() => {
    refresh()
  }, [query, page])

  const queryChange = useCallback((params: GetListQueryFrom) => {
    setQuery(params)
  }, [])

  return (
    <>
      <QueryFrom onChange={queryChange} />
      <Card style={{ marginTop: '20px' }} bordered={false}>
        <Table
          dataSource={data}
          pagination={{
            current: page.index,
            defaultCurrent: page.index,
            defaultPageSize: 10,
            pageSize: 10,
            total: count,
            onChange: pageChange
          }}
          columns={[
            {
              title: '编号',
              dataIndex: 'id',
              key: 'id'
            },
            {
              title: '名称',
              dataIndex: 'name'
            },
            {
              title: '描述',
              dataIndex: 'description'
            },
            {
              title: '状态',
              dataIndex: 'status'
            },
            {
              title: '创建时间',
              dataIndex: 'createTime'
            }
          ]}
          loading={loading}
        />
      </Card>
    </>
  )
}

export default ListQueryTable
