import React, { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toogleDevice, closeSideBar } from '@/store/modules/app'
import useResize from '@/hooks/useResize'
import SideBar from './Sidebar'
import NavBar from './Navbar'
import TabsPages from './TabsPages'
import Setting from './Settting'
import { useAppDispatch, useAppSelector } from '@/store'

import './index.less'

const MobileWidth = 992

const Layout: React.FC = () => {
  const { sideBarOpend, device } = useAppSelector((state) => state.app)
  const { tabs } = useAppSelector((state) => state.setting)
  const dispatch = useAppDispatch()
  const { windowWidth } = useResize()

  useLayoutEffect(() => {
    if (!document.hidden) {
      const isMobile = windowWidth < MobileWidth
      const newDevice = isMobile ? 'mobile' : 'desktop'
      if (device !== newDevice) {
        dispatch(toogleDevice(newDevice))
      }
      if (isMobile) {
        if (sideBarOpend) {
          dispatch(closeSideBar())
        }
      }
    }
  }, [windowWidth])

  return (
    <div
      className={
        'app-wrapper' + (device === 'mobile' ? ' mobile' : '') + (sideBarOpend ? ' openSidebar' : ' hideSidebar')
      }>
      <SideBar />
      <div className='app-inner'>
        <div className='app-navbar'>
          <NavBar />
          {tabs ? <TabsPages /> : null}
        </div>
        <div className='app-main'>
          <Setting />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
