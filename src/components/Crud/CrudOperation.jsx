import { Button, Space, Tooltip, Dropdown, Menu, Modal } from 'antd'
import { PlusOutlined, DeleteOutlined, ColumnHeightOutlined, ReloadOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import CrudContext from './Context'
import styled from 'styled-components'
import { STATUS } from './common'

const CrudOperationWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
`

const CrudOperation = () => {
  const { tableSize, setTableSize, selections, refresh, toDelete, submitDel, status, toCreate, cancelDel } = useContext(CrudContext)

  const handleDel = () => {
    toDelete(selections)
    Modal.confirm({
      title: '提示',
      type: 'warning',
      content: '确认删除所选的' + selections.length + '条数据',
      confirmLoading: status === STATUS.DELETE_SUBMIT,
      onOk() {
        submitDel(selections)
      },
      onCancel() {
        cancelDel()
      }
    })
  }

  return (
    <CrudOperationWrap>
      <Space>
        <Button type='primary' onClick={() => {
          toCreate()
        }} icon={<PlusOutlined/>}>新增</Button>
        <Button type='primary' loading={status === STATUS.DELETE_SUBMIT} disabled={!selections.length} onClick={handleDel} icon={<DeleteOutlined/>} danger>删除</Button>
      </Space>
      <div>
        <Tooltip title='刷新'>
          <Button type='text' onClick={() => {
            refresh()
          }}>
            <ReloadOutlined style={{ fontSize: '16px' }}/>
          </Button>
        </Tooltip>
        <Dropdown trigger={['click']} overlay={<Menu defaultSelectedKeys={tableSize} onClick={({ key }) => {
          setTableSize(key)
        }} selectedKeys={tableSize} items={[
          { label: '默认', key: 'default' },
          { label: '中等', key: 'middle' },
          { label: '紧凑', key: 'small' }
        ]}/>}>
          <Tooltip title='密度'>
            <Button type='text'>
              <ColumnHeightOutlined style={{ fontSize: '16px' }}/>
            </Button>
          </Tooltip>
        </Dropdown>
      </div>
    </CrudOperationWrap>
  )
}

export default CrudOperation
