import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import store, { useAppDispatch, useAppSelector } from '@/store'
import { addTabsPage, delTabsPage, delOtherTabPage, delAllTabPage } from '@/store/modules/tabs'
import { useRoute, useRouter } from '@/router'

const { TabPane } = Tabs

const getTabsPages = () => store.getState().tabs.pages

const TabsPages: React.FC = () => {
    
  const { t } = useTranslation()
  const tabsPages = useAppSelector((state) => state.tabs.pages)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const route = useRoute()

  useEffect(() => {
    if (route.path && !route.match.redirect && !route.match.children) {
      dispatch(addTabsPage(route))
    }
  }, [route])

  const tabChange = (activeKey: string) => {
    const tag = tabsPages.filter((v) => v.path === activeKey)[0]
    if (tag) {
      router.push(tag.fullPath || '/')
    }
  }

  const tabDel = (key: React.MouseEvent | React.KeyboardEvent | string) => {
    dispatch(delTabsPage({ path: key as string }))
    if (route.path === key) {
      toLastView()
    }
  }

  const toLastView = () => {
    const _tabsPages = getTabsPages()
    const lastPage = _tabsPages[_tabsPages.length - 1]
    if (lastPage) {
      router.push(lastPage.fullPath || '/')
    } else {
      router.push('/')
    }
  }

  const operMenus = useMemo(() => {
    const hasTabs = tabsPages.filter((v) => v.meta && !v.meta.affixTab)
    return [
      {
        key: 'closeCurTab',
        label: '关闭标签',
        disabled: hasTabs.filter((v) => v.path === route.path).length === 0,
      },
      {
        key: 'closeOtherTab',
        label: '关闭其他',
        disabled: hasTabs.filter((v) => v.path !== route.path).length === 0,
      },
      {
        key: 'closeAllTab',
        label: '关闭全部',
        disabled: hasTabs.length === 0,
      },
    ]
  }, [tabsPages, route])

  return (
    <div className="app-navbar-tabs">
      <div className="app-navbar-tabs-main">
        <Tabs
          hideAdd
          type="editable-card"
          tabBarGutter={5}
          size="small"
          activeKey={route.path}
          defaultActiveKey={route.path}
          onChange={tabChange}
          onEdit={tabDel}>
          {tabsPages.map((tag) => (
            <TabPane
              tab={tag.meta.title ? t(tag.meta.title) : 'no_name'}
              key={tag.path}
              closable={!tag.meta.affixTab}
            />
          ))}
        </Tabs>
      </div>
      <div className="app-navbar-tabs-oper">
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => {
                if (key === 'closeCurTab') {
                  tabDel(route.path)
                }
                if (key === 'closeOtherTab') {
                  dispatch(
                    delOtherTabPage({
                      path: route.path,
                    })
                  )
                  toLastView()
                }
                if (key === 'closeAllTab') {
                  dispatch(delAllTabPage())
                  toLastView()
                }
              }}
              items={operMenus}
            />
          }>
          <div className="app-navbar-tabs-oper-item">
            <DownOutlined style={{ fontSize: '14px' }} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default TabsPages
