
export const usersDb: UserDb[] = [
  {
    nikename: '管理员',
    username: 'admin',
    password: '123456',
    role: 'admin',
    avater: '',
    token: 'admin_token_123456'
  },
  {
    nikename: '普通用户',
    username: 'user',
    password: '123456',
    role: 'user',
    avater: '',
    token: 'user_token_123456'
  }
]

export const rolesDb: RoleDb[] = [
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
    roleName: '用户',
    permissions: [
      'user',
      'permission:list',
      'permission:component:list',
      'permission:user:list',
      'permission:component:button'
    ]
  }
]

export const menusDb: CaseRoute<string>[] = [
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
