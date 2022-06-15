import React, { useContext, useCallback, useState } from 'react'
import { Table, Card, Input, Form, Modal, Button } from 'antd'
import { CrudProvider, CrudContext, Pagination, CrudOperation, DataOperation, QueryOperation, useBeforeRefresh } from '@/components/Crud'
import basicListCurd, { basicListUrl } from '@/api/basicList'
const Test = ({ count }) => {
  return (
    <div>
      { count }
    </div>
  )
}

const TesTWrapper = ({ children }) => {
  const [count, setCount] = useState(1)
  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        count: count
      })
    })
  }
  return (
    <>
      <div>
        <Button onClick={() => {
          setCount(count + 10)
        }}>点击</Button>
      </div>
      { renderChildren() }
    </>
  )
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    fixed: 'right',
    width: 110,
    render: (text, record) => {
      return <DataOperation data={record}/>
    }
  }
]

const defaultForm = {
  id: null,
  name: '6666'
}

const CrudForm = () => {
  const { visibleCu, form, title, cancelCU, submitCU } = useContext(CrudContext)

  return (
    <Modal title={title} width={'600px'} visible={visibleCu} onOk={submitCU} onCancel={cancelCU}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        autoComplete='off'
      >
        <Form.Item
          label='名称'
          name='name'
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const BasicList = () => {
  const { data, tableSize, query, selections, selectionsHandle, loading } = useContext(CrudContext)

  useBeforeRefresh((paylod) => {
    console.log(paylod)
  })

  return (
    <>
      <TesTWrapper>
        <Test count={9999}/>
      </TesTWrapper>
      <Card bordered={false} style={{ marginBottom: '20px' }}>
        <QueryOperation>
          <Input placeholder='名称' value={query.name}/>
        </QueryOperation>
      </Card>
      <Card bordered={false}>
        <CrudOperation/>
        <Table dataSource={data} loading={loading} rowSelection={{
          selections,
          onChange: selectionsHandle
        }} size={tableSize} pagination={false} rowKey='id' columns={columns} />
        <Pagination />
      </Card>
      <CrudForm />
    </>
  )
}

export default () => {
  return <>
    <CrudProvider url={ basicListUrl } crudMethod={ basicListCurd } title='文章' defaultForm={defaultForm}>
      <BasicList />
    </CrudProvider>
  </>
}
