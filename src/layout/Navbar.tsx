import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Dropdown, Avatar, Modal, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import screenfull from 'screenfull'
import { useRoute, useRouter } from '@/router/hook'
import { useAppDispatch, useAppSelector } from '@/store'
import { toogleSideBar } from '@/store/modules/appSlice'
import { logout } from '@/store/modules/userSlice'
import Language from '@/components/Language'

function NavBar() {
  const { t } = useTranslation()
  const sideBarOpened = useAppSelector((state) => state.app.sideBarOpend)
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const [isScreenfull, setIsScreenfull] = useState(false)
  const route = useRoute()
  const router = useRouter()

  const screenfullChange = useCallback(() => {
    setIsScreenfull(screenfull.isFullscreen)
  }, [])

  const screenfullToogle = useCallback(() => {
    screenfull.toggle()
  }, [])

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfullChange()
      screenfull.on('change', screenfullChange)
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', screenfullChange)
      }
    }
  }, [])

  function logoutConfirm() {
    Modal.confirm({
      title: t('app.modalConfirmTitle'),
      type: 'warning',
      content: t('app.logoutTip'),
      onOk() {
        dispatch(logout()).unwrap().then(() => {
          location.reload()
        }).catch(() => {
          location.reload()
        })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  return (
    <div className='app-navbar-header'>

      <div
        className='app-navbar-header-item'
        onClick={() => {
          dispatch(toogleSideBar())
        }}>
        {sideBarOpened ? (
          <MenuFoldOutlined style={{ fontSize: '20px' }}/>
        ) : (
          <MenuUnfoldOutlined style={{ fontSize: '20px' }}/>
        )}
      </div>

      <div style={{ paddingLeft: '10px' }}>
        <Breadcrumb>
          {route.matched.map(v => (
            <Breadcrumb.Item key={v.fullPath}>
              <>{v.meta.title ? t(v.meta.title) : ''}</>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>

      <div className='app-navbar-header-file'/>

      <div onClick={screenfullToogle} className='app-navbar-header-item'>
        {
          isScreenfull ? <FullscreenExitOutlined style={{ fontSize: '20px' }}/> :
            <FullscreenOutlined style={{ fontSize: '20px' }}/>
        }
      </div>

      <Dropdown overlay={<Menu onClick={({ key }) => {
        if (key === '3') {
          logoutConfirm()
        } else {
          router.push('/personal')
        }
      }} items={[{
        label: t('menus.personal'),
        key: '1'
      }, { type: 'divider' }, { label: t('app.logout'), key: '3' }]}/>}>
        <div className='app-navbar-header-item'>
          <Avatar size={30} src={user.avater}/>
          <span style={{ paddingLeft: '5px' }}>{user.nikename}</span>
        </div>
      </Dropdown>

      <Language>
        <div className='app-navbar-header-item'>
          <GlobalOutlined style={{ fontSize: '18px' }}/>
        </div>
      </Language>

    </div>
  )
}

export default NavBar
