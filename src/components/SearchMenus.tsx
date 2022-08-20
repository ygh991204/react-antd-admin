import { Select } from 'antd'
import { useAppSelector } from '@/store'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { RouteRecord, RouteMetaTitle } from '@/router/type'
import { EnvConfig } from '@/env'

const { Option } = Select

export type MenusListItem = {
  titles: string[]
  value: string
}

export default function SearchMenus({
  onChange
}: {
  onChange?: (value: string) => void
}) {
  const menusRoutes = useAppSelector((state) => state.permission.menuRoutes)
  const { t } = useTranslation()
  const [data, setData] = useState<MenusListItem[]>([])
  const [value, setValue] = useState<string>()
  const menusList = useMemo(() => {
    function formatTitle(title?: RouteMetaTitle) {
      const _title = title ? t(title) : 'no-name'
      return _title as string
    }
    function menuRouteDowngrade(
      routes: RouteRecord[],
      list: MenusListItem[] = [],
      parantRoute: MenusListItem = {
        titles: [],
        value: ''
      }
    ) {
      return routes.reduce((prev, route) => {
        const curRoute: MenusListItem = {
          titles: [...parantRoute.titles, formatTitle(route.meta.title)],
          value: route.fullPath
        }
        if (route.component) {
          prev.push(curRoute)
        }
        if (route.children) {
          prev.push(...menuRouteDowngrade(route.children, [], curRoute))
        }
        return prev
      }, list)
    }
    const _menuList = menuRouteDowngrade(menusRoutes)
    return _menuList
  }, [t, menusRoutes])

  function handleSearch(newValue: string) {
    if (newValue) {
      const _data = menusList.filter((menu) => menu.titles.some((title) => title.indexOf(newValue) !== -1))
      setData(_data)
    } else {
      setData([])
    }
  }

  function handleChange(newValue: string) {
    setValue(newValue)
    onChange && onChange(newValue)
  }

  return (
    <Select
      style={{ minWidth: '200px' }}
      showSearch
      value={value}
      defaultActiveFirstOption={false}
      placeholder={EnvConfig.APP_TITLE}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}>
      {data.map((item) => (
        <Option key={item.value}>{item.titles.join('/')}</Option>
      ))}
    </Select>
  )
}
