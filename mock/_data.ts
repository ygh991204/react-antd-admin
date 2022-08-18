
export const usersDb: Api.UserDb[] = [
  {
    nikename: '枫',
    username: 'admin',
    password: '123456',
    roles: ['admin'],
    avater: '/avatar-admin.jpg',
    token: 'admin_token_123456'
  },
  {
    nikename: '小枫',
    username: 'user',
    password: '123456',
    roles: ['user'],
    avater: '/avatar-user.jpg',
    token: 'user_token_123456'
  }
]

export const rolesDb: Api.RoleDb[] = [
  {
    roleValue: 'admin',
    roleName: '管理员',
    permissions: [
      'admin',
      'permission:list',
      'permission:admin:list',
      'permission:component:list',
      'permission:user:list'
    ]
  },
  {
    roleValue: 'user',
    roleName: '普通用户',
    permissions: [
      'user',
      'permission:list',
      'permission:component:list',
      'permission:user:list'
    ]
  }
]

export const menusDb: Api.MenuDb[] = [
  {
    path: 'permission',
    meta: { title: '权限页', icon: 'permission', permission: 'permission:list' },
    children: [
      {
        path: 'admin',
        component: 'permission/admin',
        meta: { title: 'admin可见', permission: 'permission:admin:list' }
      },
      {
        path: 'component',
        component: 'permission/component',
        meta: { title: '组件权限', permission: 'permission:component:list' }
      },
      {
        path: 'user',
        component: 'permission/user',
        meta: { title: 'user可见', permission: 'permission:user:list' }
      }
    ]
  }
]
