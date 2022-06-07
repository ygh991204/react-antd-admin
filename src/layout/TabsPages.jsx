import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Tabs, Menu, Dropdown } from 'antd'
import store from '@/store'
import { addTabsPage, delTabsPage, delAllTabPage } from '@/store/modules/tabs'
import { useRoute, useRouter } from '@/router'

const { TabPane } = Tabs

const getTabsPages = () => store.getState().tabs.pages

const TabsPages = () => {
  const { t } = useTranslation()
  const tabsPages = useSelector((state) => state.tabs.pages)
  const dispatch = useDispatch()
  const router = useRouter()
  const route = useRoute()

  useEffect(() => {
    if (route.path && !route.match.redirect && !route.match.children) {
      dispatch(addTabsPage(route))
    }
  }, [route])

  const tabChange = (activeKey) => {
    const tag = tabsPages.filter(v => v.path === activeKey)[0]
    if (tag) {
      router.push(tag.fullPath)
    }
  }

  const tabEdit = (key, action) => {
    if (action === 'remove') {
      dispatch(delTabsPage({ path: key }))
      if (route.path === key) {
        toLastView()
      }
    }
  }

  const toLastView = () => {
    const _tabsPages = getTabsPages()
    const lastPage = _tabsPages[_tabsPages.length - 1]
    if (lastPage) {
      router.push(lastPage.fullPath)
    } else {
      router.push('/')
    }
  }

  return (
    <div className='app-navbar-tabs'>
      <div className='app-navbar-tabs-main'>
        <Tabs hideAdd type='editable-card' tabBarGutter='5px' size='small' activeKey={route.path} defaultActiveKey={route.path} onChange={tabChange} onEdit={tabEdit}>
          {tabsPages.map((tag) => (
            <TabPane tab={t(tag.meta.title)} key={tag.path} closable={!tag.meta.affixTab} />
          ))}
        </Tabs>
      </div>

      <div className='app-navbar-tabs-oper'>
        {/* .. */}
      </div>
      {/* <Dropdown overlay={<Menu onClick={({ key }) => {
        dispatch(delAllTabPage())
        toLastView()
      }} items={[{ label: '关闭所有', key: 'closeTagAll' }]}/>} trigger={['contextMenu']}> */}
      {/* </Dropdown> */}
    </div>
  )
}

export default TabsPages
