
import { validateURL } from '@/utils/validate'

export const menuRoutes = [
  {
    path: 'dashboard',
    component: 'dashboard/index',
    meta: { title: 'menus.dashboard', affixTab: true, icon: 'dashboard' }
  },
  {
    path: 'system',
    meta: { title: 'menus.system', icon: 'set' },
    children: [
      {
        path: 'user',
        meta: { title: 'menus.systemUser' },
        component: 'system/user/index'
      },
      {
        path: 'menu',
        component: 'system/menu/index',
        meta: { title: 'menus.systemMenu' }
      },
      {
        path: 'role',
        component: 'system/role/index',
        meta: { title: 'menus.systemRole' }
      }
    ]
  },
  {
    path: 'menus',
    meta: { title: 'menus.menus', icon: 'menu' },
    children: [
      {
        path: 'menu1',
        meta: { title: 'menus.menusMenu1' },
        component: 'menus/menu1/index',
        children: [
          {
            path: 'menu1-1',
            component: 'menus/menu1/menu1-1/index',
            meta: { title: 'menus.menusMenu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'menus/menu1/menu1-2/index',
            meta: { title: 'menus.menusMenu1-2' }
          }
        ]
      },
      {
        path: 'menu2',
        component: 'menus/menu2/index',
        meta: { title: 'menus.menusMenu2' }
      }
    ]
  },
  {
    path: 'error',
    meta: { title: 'menus.error', icon: 'error' },
    children: [
      {
        path: '404',
        component: 'error/404',
        title: '404',
        meta: { title: 'menus.error404' }
      },
      {
        path: '401',
        component: 'error/401',
        meta: { title: 'menus.error401' }
      }
    ]
  },
  {
    path: 'component',
    meta: { title: 'menus.component', icon: 'component' },
    children: [
      {
        path: 'imagecropper',
        component: 'component/imageCropper/index',
        meta: { title: 'menus.componentImageCropper' }
      },
      {
        path: 'richtext',
        component: 'component/richText/index',
        meta: { title: 'menus.componentRichText' }
      },
      {
        path: 'icons',
        component: 'component/icons/index',
        meta: {
          title: 'menus.componentIcons'
        }
      },
      {
        path: 'charts',
        component: 'component/charts/index',
        meta: {
          title: 'menus.componentCharts'
        }
      },
      {
        path: 'basiclist',
        component: 'component/basicList/index',
        meta: {
          title: 'menus.componentBasicList'
        }
      }
    ]
  },
  {
    path: 'personal',
    meta: { hidden: true, title: 'menus.personal' },
    component: 'personal/index'
  },
  {
    path: 'https://ant.design/index-cn',
    meta: { title: 'Ant Design', icon: 'ant-design' }
  }
]

export const constantRoutes = [
  {
    path: '/login',
    component: 'login'
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: 'Layout',
    children: [...menuRoutes]
  },
  {
    path: '/404',
    component: 'error/404'
  },
  {
    path: '/401',
    component: 'error/401'
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export const formatRoutes = (routes, parentFullPath = '') => {
  return routes.map((route) => {
    let children
    let fullPath = route.path
    if (!validateURL(route.path)) {
      fullPath = parentFullPath + (route.path === '/' ? '' : route.path)
      children = route.children && route.children.length ? formatRoutes(route.children, fullPath + '/') : undefined
    }
    return {
      ...route,
      fullPath,
      children: children,
      meta: route.meta ? { ...route.meta, title: route.meta.title || 'menus.noName' } : { title: 'menus.noName' }
    }
  })
}
