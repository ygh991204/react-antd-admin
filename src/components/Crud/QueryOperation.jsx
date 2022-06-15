import React, { useContext } from 'react'
import { Button, Space } from 'antd'
import CrudContext from './Context'
import styled from 'styled-components'

const QueryOperationWrapper = styled.div``

const QueryOperation = React.memo(({ children }) => {
  const { resetQuery, toQuery, loading } = useContext(CrudContext)

  return (
    <QueryOperationWrapper>
      <Space wrap>
        { children }
        <Button onClick={() => {
          resetQuery()
        }} >重置</Button>
        <Button onClick={() => {
          toQuery()
        }} loading={loading} type='primary'>查询</Button>
      </Space>
    </QueryOperationWrapper>
  )
})

export default QueryOperation
