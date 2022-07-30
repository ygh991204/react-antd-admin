
import styled from 'styled-components'
import { Spin } from 'antd'

const RouterLoadingWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const RouterLoading = (
  <RouterLoadingWrapper>
    <Spin size='large' />
  </RouterLoadingWrapper>
)

export default RouterLoading
