
import { Button, Space, Popconfirm } from 'antd'
import React, { useContext } from 'react'
import CrudContext from './Context'
import styled from 'styled-components'

const DataOperationWrap = styled.div`
    
`

const DataOperation = React.memo(({ data, children, leftRender, rightRender }) => {
  const { toDelete, cancelDel, toUpdate, submitDel } = useContext(CrudContext)

  const confimDel = async() => {
    await submitDel([data])
  }

  return (
    <DataOperationWrap>
      <Space>
        { leftRender }
        <Button size='small' onClick={() => {
          toUpdate(data)
        }}>编辑</Button>
        { children }
        <Popconfirm
          title='确认删除这条数据吗？'
          onConfirm={confimDel}
          onCancel={() => {
            cancelDel()
          }}
          onVisibleChange={val => {
            if (val) {
              toDelete([data])
            }
          }}
          okText='确认'
          cancelText='取消'
        >
          <Button size='small' danger>删除</Button>
        </Popconfirm>
        { rightRender }
      </Space>
    </DataOperationWrap>
  )
})

export default DataOperation
