import { Pagination } from 'antd'
import React, { useContext } from 'react'
import CrudContext from './Context'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 20px;
`

const CrudPagination = React.memo(() => {
  console.log('666')
  const { options, pageChangeHandle, pageIndex } = useContext(CrudContext)

  const pageChange = (page) => {
    pageChangeHandle(page)
  }

  return (
    <PaginationWrapper>
      <Pagination
        size='small'
        current={pageIndex}
        defaultCurrent={pageIndex}
        onChange={pageChange}
        pageSize={options.pageSize}
        defaultPageSize={options.pageSize}
        total={50}
        showTotal={(total) => `共 ${total} 条`}
        showQuickJumper
      />
    </PaginationWrapper>
  )
})

export default CrudPagination
