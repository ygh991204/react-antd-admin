import type { RouteRecord } from '@/router/type'

import { useMemo, useState, useLayoutEffect, useEffect } from 'react'
import { Translation } from 'react-i18next'
import { Menu } from 'antd'
import { useRoute, useRouter } from '@/router/hook'
import { closeSideBar } from '@/store/modules/appSlice'
import { validateURL } from '@/utils/validate'
import { wait } from '@/utils'
import SvgIcon from '@/components/SvgIcon'
import Logo from '/logo.png'
import { useAppDispatch, useAppSelector } from '@/store'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

function formatRoutes(routes: RouteRecord[] = []): ItemType[] {
  return routes.map((route) => {
    return {
      children: route.children ? formatRoutes(route.children) : undefined,
      key: route.fullPath,
      label: <Translation>{(t) => <>{route.meta.title ? t(route.meta.title) : 'no_name'}</>}</Translation>,
      icon: route.meta.icon ? <SvgIcon name={route.meta.icon} /> : null
    }
  })
}

function LogoTitle() {
  const sideBarOpend = useAppSelector((state) => state.app.sideBarOpend)
  const [show, setShow] = useState(true)
  const handleShow = async(sideBarOpend: boolean) => {
    if (sideBarOpend) {
      await wait(100)
      setShow(true)
    } else {
      setShow(false)
    }
  }
  useEffect(() => {
    handleShow(sideBarOpend)
  }, [sideBarOpend])
  return <>{show ? <span className='app-logo-title'>React Antd Admin</span> : null}</>
}

function SideBar() {
  const { sideBarOpend, device } = useAppSelector((state) => state.app)
  const { logo } = useAppSelector((state) => state.setting)
  const routes = useAppSelector((state) => state.permission.menuRoutes)
  const dispatch = useAppDispatch()
  const route = useRoute()
  const router = useRouter()
  const [openkeys, setOpenKeys] = useState<string[]>([])

  const menuRoutes = useMemo(() => {
    return formatRoutes(routes)
  }, [routes])

  const selectedKeys = useMemo(() => {
    return route.matched.map((v) => v.fullPath)
  }, [route.matched])

  useLayoutEffect(() => {
    if (sideBarOpend) {
      const _openKeys = route.matched.map((v) => v.fullPath)
      _openKeys.pop()
      setOpenKeys(_openKeys)
    } else {
      setOpenKeys([])
    }
  }, [route.matched, sideBarOpend])

  return (
    <>
      {sideBarOpend && device === 'mobile' ? (
        <div
          className='app-sidebar-drawer'
          onClick={() => {
            dispatch(closeSideBar())
          }}
        />
      ) : null}
      <div className='app-sidebar'>
        {logo ? (
          <div className='app-logo'>
            <img src={Logo} className='app-logo-img' />
            <LogoTitle />
          </div>
        ) : null}
        <div className='app-sidebar-main'>
          <Menu
            inlineCollapsed={!sideBarOpend}
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            defaultOpenKeys={openkeys}
            openKeys={openkeys}
            onOpenChange={(keys) => {
              setOpenKeys([...keys])
            }}
            onClick={({ key }) => {
              if (validateURL(key)) {
                window.open(key, '_blank')
              } else {
                router.push(key)
              }
            }}
            subMenuCloseDelay={0.3}
            subMenuOpenDelay={0.3}
            mode='inline'
            theme='dark'
            items={menuRoutes}
          />
        </div>
      </div>
    </>
  )
}

export default SideBar
