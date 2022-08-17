import { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toogleDevice, closeSideBar } from '@/store/modules/appSlice'
import useResize from '@/hooks/useResize'
import SideBar from './Sidebar'
import NavBar from './Navbar'
import TabsPages from './TabsPages'
import Setting from './Settting'
import { useAppDispatch, useAppSelector } from '@/store'
import { EnvConfig } from '@/env'
import './index.less'

function Layout() {
  const { sideBarOpend, device } = useAppSelector((state) => state.app)
  const { tabs } = useAppSelector((state) => state.setting)
  const dispatch = useAppDispatch()
  const { windowWidth } = useResize()

  useLayoutEffect(() => {
    if (!document.hidden) {
      const isMobile = windowWidth < EnvConfig.APP_MOBILE_WIDTH
      const newDevice: AppDevice = isMobile ? 'mobile' : 'desktop'
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
          <div className='app-main-container'>
            <Outlet />
          </div>
          <div className='app-main-footer' dangerouslySetInnerHTML={{ __html: EnvConfig.APP_FOOTER }} />
        </div>
      </div>
      <Setting />
    </div>
  )
}

export default Layout
