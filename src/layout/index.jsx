import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toogleDevice, closeSideBar } from '@/store/modules/app'
import { useResize } from '@/utils/hooks'
import SideBar from './Sidebar'
import NavBar from './Navbar'
import TabsPages from './TabsPages'
import Setting from './Settting'
import './index.less'

const MobileWidth = 992

const Layout = () => {
  const { sideBarOpend, device } = useSelector((state) => state.app)
  const { tabs } = useSelector(state => state.setting)
  const dispatch = useDispatch()
  const { windowWidth } = useResize()

  useEffect(() => {
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
          { tabs ? <TabsPages /> : null }
        </div>
        <div className='app-main'>
          <Setting/>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
