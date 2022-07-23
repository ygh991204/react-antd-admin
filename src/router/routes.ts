import { validateURL } from '@/utils/validate'

export const constantRoutes: CaseRoute[] = [
  {
    path: '/login',
    component: 'login',
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: 'Layout',
    children: [
      {
        path: 'dashboard',
        component: 'dashboard',
        meta: { title: 'menus.dashboard', affixTab: true, icon: 'dashboard' },
      },
      {
        path: 'system',
        meta: { title: 'menus.system', icon: 'set' },
        children: [
          {
            path: 'user',
            meta: { title: 'menus.systemUser' },
            component: 'system/user',
          },
          {
            path: 'menu',
            component: 'system/menu',
            meta: { title: 'menus.systemMenu' },
          },
          {
            path: 'role',
            component: 'system/role',
            meta: { title: 'menus.systemRole' },
          },
        ],
      },
      {
        path: 'menus',
        meta: { title: 'menus.menus', icon: 'menu' },
        children: [
          {
            path: 'menu1',
            meta: { title: 'menus.menusMenu1' },
            component: 'menus/menu1',
            children: [
              {
                path: 'menu1-1',
                component: 'menus/menu1/menu1-1',
                meta: { title: 'menus.menusMenu1-1' },
              },
              {
                path: 'menu1-2',
                component: 'menus/menu1/menu1-2',
                meta: { title: 'menus.menusMenu1-2' },
              },
            ],
          },
          {
            path: 'menu2',
            component: 'menus/menu2',
            meta: { title: 'menus.menusMenu2' },
          },
        ],
      },
      {
        path: 'error',
        meta: { title: 'menus.error', icon: 'error' },
        children: [
          {
            path: '404',
            component: 'error/404',
            meta: { title: 'menus.error404' },
          },
          {
            path: '401',
            component: 'error/401',
            meta: { title: 'menus.error401' },
          },
        ],
      },
      {
        path: 'component',
        meta: { title: 'menus.component', icon: 'component' },
        children: [
          {
            path: 'imagecropper',
            component: 'component/imageCropper',
            meta: { title: 'menus.componentImageCropper' },
          },
          {
            path: 'icons',
            component: 'component/icons',
            meta: {
              title: 'menus.componentIcons',
            },
          },
          {
            path: 'charts',
            component: 'component/charts',
            meta: {
              title: 'menus.componentCharts',
            },
          }
        ],
      },
      {
        path: 'personal',
        meta: { hidden: true, title: 'menus.personal' },
        component: 'personal',
      },
      {
        path: 'https://ant.design-cn',
        meta: { title: 'Ant Design', icon: 'ant-design' },
      },
    ],
  },
  {
    path: '/404',
    component: 'error/404',
  },
  {
    path: '/401',
    component: 'error/401',
  }
]

export function formatRoutes(routes: CaseRoute[], parentFullPath = ''): Route[] {
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
      meta: route.meta ? { ...route.meta } : {},
    }
  })
}
