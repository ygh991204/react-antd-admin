
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Drawer, List, Switch } from 'antd'
import { toogleLogo, toogleTabs } from '@/store/modules/setting'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const SettingButton = styled.div`
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      position: fixed;
      top: 250px;
      right: ${props => props.visible ? '278px' : '0'};
      z-index: ${props => props.visible ? 1001 : 899} ;
`

const Setting = () => {
  const { logo, tabs } = useSelector(state => state.setting)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  return <>
    <SettingButton visible={visible}>
      <Button icon={ visible ? <CloseOutlined /> : <SettingOutlined/>} onClick={() => {
        setVisible(!visible)
      }} size='large' type='primary'/>
    </SettingButton>
    <Drawer placement='right' width={278} visible={visible} onClose={() => {
      setVisible(false)
    }} closable={false}>
      <List.Item extra={ <Switch defaultChecked={logo} checked={logo} onChange={ (val) => {
        dispatch(toogleLogo(val))
      } }/> }>
        <List.Item.Meta title ='logo'/>
      </List.Item>
      <List.Item extra={<Switch defaultChecked={tabs} checked={tabs} onChange={ (val) => {
        dispatch(toogleTabs(val))
      } }/>}>
        <List.Item.Meta title='标签栏'/>
      </List.Item>
    </Drawer>
  </>
}

export default Setting
