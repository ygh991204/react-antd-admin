
import { useMemo, useState, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Translation } from 'react-i18next'
import { cloneDeep } from 'lodash'
import { Menu } from 'antd'

import { useRoute, useRouter } from '@/router'
import { closeSideBar } from '@/store/modules/app'
import { validateURL } from '@/utils/validate'
import { wait } from '@/utils'

import { SvgIcon } from '@/components'
import Logo from '/static/logo.png'

const showRoutes = (routes = []) => {
  return routes.filter(route => {
    if (route.meta.hidden) {
      return false
    } else {
      if (route.children) {
        route.children = showRoutes(route.children)
      }
      return true
    }
  })
}

const formatRoutes = (routes = []) => {
  return routes.map((route) => {
    return {
      children: route.children ? formatRoutes(route.children) : undefined,
      key: route.fullPath,
      label: <Translation>{t => t(route.meta.title)}</Translation>,
      icon: route.meta.icon ? <SvgIcon name={route.meta.icon} /> : null
    }
  })
}

const LogoTitle = () => {
  const sideBarOpend = useSelector((state) => state.app.sideBarOpend)
  const [show, setShow] = useState(true)
  const handleShow = async(sideBarOpend) => {
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
  return <>{ show ? <span className='app-logo-title'>React Antd Admin</span> : null }</>
}

const SideBar = () => {
  const { sideBarOpend, device } = useSelector((state) => state.app)
  const { logo } = useSelector(state => state.setting)
  const routes = useSelector((state) => state.routes.menuRoutes)
  const dispatch = useDispatch()
  const route = useRoute()
  const router = useRouter()
  const [openkeys, setOpenKeys] = useState([])

  const menuRoutes = useMemo(() => {
    const _showRoutes = showRoutes(cloneDeep(routes))
    return formatRoutes(_showRoutes)
  }, [routes])

  const selectedKeys = useMemo(() => {
    return route.matched.map(v => v.fullPath)
  }, [route.matched])

  useLayoutEffect(() => {
    if (sideBarOpend) {
      const _openKeys = route.matched.map(v => v.fullPath)
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
        { logo ? <div className='app-logo'>
          <img src={Logo} className='app-logo-img' />
          <LogoTitle/>
        </div> : null }
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
