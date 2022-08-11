
export const BasicLayout = 'BasicLayout'

const menusRoutes: CaseRoute[] = [
  {
    path: 'dashboard',
    component: 'dashboard',
    meta: { title: 'menus.dashboard', affixTab: true, icon: 'dashboard' }
  },
  {
    path: 'list',
    meta: { title: 'menus.list', icon: 'table' },
    children: [
      {
        path: 'querytable',
        meta: { title: 'menus.listQueryTable' },
        component: 'list/queryTable'
      }
    ]
  },
  {
    path: 'form',
    meta: { title: 'menus.form', icon: 'edit' },
    children: [
      {
        path: 'basis',
        meta: { title: 'menus.formBasis' },
        component: 'form/basisForm'
      }
    ]
  },
  {
    path: 'detail',
    meta: { title: 'menus.detail', icon: 'detail' },
    children: [
      {
        path: 'basis',
        meta: { title: 'menus.detailBasis' },
        component: 'detail/basisDetail'
      }
    ]
  },
  {
    path: 'i18n',
    meta: { title: 'menus.i18n', icon: 'globalization' },
    component: 'i18n'
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
            meta: { title: 'menus.menusMenu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'menus/menu1/menu1-2',
            meta: { title: 'menus.menusMenu1-2' }
          }
        ]
      },
      {
        path: 'menu2',
        component: 'menus/menu2',
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
        meta: { title: 'menus.error404' }
      },
      {
        path: '403',
        component: 'error/403',
        meta: { title: 'menus.error403' }
      },
      {
        path: '500',
        component: 'error/500',
        meta: { title: 'menus.error500' }
      }
    ]
  },
  {
    path: 'component',
    meta: { title: 'menus.component', icon: 'component' },
    children: [
      {
        path: 'imagecropper',
        component: 'component/imageCropper',
        meta: { title: 'menus.componentImageCropper' }
      },
      {
        path: 'richtext',
        component: 'component/richText',
        meta: {
          title: 'menus.componentRichText'
        }
      },
      {
        path: 'icons',
        component: 'component/icons',
        meta: {
          title: 'menus.componentIcons'
        }
      },
      {
        path: 'charts',
        component: 'component/charts',
        meta: {
          title: 'menus.componentCharts'
        }
      }
    ]
  },
  {
    path: 'personal',
    meta: { hidden: true, title: 'menus.personal' },
    component: 'personal'
  },
  {
    path: 'https://ant.design-cn',
    meta: { title: 'Ant Design' as RouteMetaTitle, icon: 'ant-design' }
  },
  {
    path: 'navigate',
    meta: { title: 'menus.navigate', icon: 'link' },
    children: [
      {
        path: 'router',
        component: 'navigate/router',
        meta: { title: 'menus.navigateRouter' }
      },
      {
        path: 'link',
        meta: { title: 'menus.navigateLink' }
      },
      {
        path: 'test',
        component: 'navigate/test',
        meta: { title: 'menus.navigateTest', hidden: true }
      }
    ]
  }
]

const constantRoutes: CaseRoute[] = [
  {
    path: '/login',
    component: 'login'
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: BasicLayout,
    children: menusRoutes
  },
  {
    path: '/404',
    component: 'error/404'
  },
  {
    path: '/401',
    component: 'error/401'
  }
]

export const ErrorRoute: Route = {
  path: '*',
  redirect: '/404',
  fullPath: '',
  meta: {}
}

export default constantRoutes
