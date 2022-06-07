export const menusDb = [
  {
    path: 'permission',
    meta: { title: '权限页', icon: 'permission', permission: 'permission:list' },
    children: [
      {
        path: 'admin',
        component: 'permission/admin/index',
        meta: { title: 'admin可见', permission: 'permission:admin:list' }
      },
      {
        path: 'component',
        component: 'permission/component/index',
        meta: { title: '组件权限', permission: 'permission:component:list' }
      },
      {
        path: 'user',
        component: 'permission/user/index',
        meta: { title: 'user可见', permission: 'permission:user:list' }
      }
    ]
  }
]
