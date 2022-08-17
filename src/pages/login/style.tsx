
import styled from 'styled-components'

export const ActionsWrapper = styled.div` 
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 99;
`

export const LoginWrapper = styled.div`
  width: 420px;
  height: auto;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding-bottom: 88px;
`

export const LoginHeader = styled.div`
   display: flex;
   align-items: center;
   padding-top: 12px;
   padding-bottom: 36px;
`

export const LoginLogo = styled.img`
   width: 50px;
   height: 50px;
`

export const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: black;
  padding-left: 18px;
`

export const FooterWrapper = styled.div`
  font-size: 12px;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #666;
  text-align: center;
  height: 44px;
  line-height: 44px;
`
