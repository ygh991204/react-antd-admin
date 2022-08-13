import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Button, Space, Card, Table, Row, Col, Popconfirm, notification, Modal, Tag } from 'antd'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { getList, GetListQueryFrom, del } from '@/api/list'
import useStateSync from '@/hooks/useStateSync'
import { wait } from '@/utils'
import QueryFrom from './QueryFrom'
import EditorForm, { EditorFormRef } from './EditorForm'

function ListQueryTable() {
  const [data, setData] = useState<Api.BasisListDb[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(1)
  const [pageIndex, setPageIndex, pageIndexRef] = useStateSync(1)
  const form = useRef<EditorFormRef>(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const query = useRef<GetListQueryFrom>({
    name: undefined,
    createTime: undefined,
    status: undefined
  })

  const refresh = useCallback(async() => {
    const response = await getList({
      pageIndex: pageIndexRef.current,
      ...query.current
    })
    setData(response.data.list)
    setCount(response.data.count)
    await wait(500)
    setLoading(false)
  }, [])

  const toQuery = useCallback(async() => {
    setPageIndex(1)
    refresh()
  }, [])

  const queryChange = useCallback((params: GetListQueryFrom) => {
    query.current = params
    toQuery()
  }, [])

  const pageChange = useCallback((num: number) => {
    setPageIndex(num)
    refresh()
  }, [])

  const delItem = useCallback(async(ids: string[]) => {
    await del(ids)
    notification.success({
      message: '删除成功'
    })
    refresh()
  }, [])

  useEffect(() => {
    toQuery()
  }, [])

  return (
    <>
      <QueryFrom onChange={queryChange} />
      <EditorForm ref={form} onRefresh={refresh} />
      <Card style={{ marginTop: '20px' }} bordered={false}>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={12}>
            <Space>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  form.current?.open()
                }}>
                新增
              </Button>
              <Button
                danger
                type='primary'
                disabled={!selectedRowKeys.length}
                onClick={() => {
                  Modal.confirm({
                    title: '提示！',
                    icon: <ExclamationCircleOutlined />,
                    content: '确认删除该' + selectedRowKeys.length + '条数据吗',
                    onOk() {
                      return delItem(selectedRowKeys as string[])
                    }
                  })
                }}
                icon={<DeleteOutlined />}>
                删除
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>{/*  */}</Space>
          </Col>
        </Row>
        <Table
          dataSource={data}
          rowKey={(row) => row.id}
          pagination={{
            current: pageIndex,
            defaultCurrent: pageIndex,
            defaultPageSize: 10,
            pageSize: 10,
            total: count,
            onChange: pageChange,
            showQuickJumper: true,
            showSizeChanger: false,
            size: 'small'
          }}
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys)
            }
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
              dataIndex: 'status',
              render: (_, row) => {
                return row.status === 1 ? <Tag color='green'>已开启</Tag> : <Tag color='red'>已关闭</Tag>
              }
            },
            {
              title: '创建时间',
              dataIndex: 'createTime'
            },
            {
              title: '操作',
              key: 'action',
              render: (_, row) => (
                <Space size='small'>
                  <Button
                    size='small'
                    onClick={() => {
                      form.current?.open(row)
                    }}>
                    编辑
                  </Button>
                  <Popconfirm title='确认删除该条数据？' onConfirm={() => delItem([row.id])}>
                    <Button danger size='small'>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              )
            }
          ]}
          loading={loading}
        />
      </Card>
    </>
  )
}

export default ListQueryTable
