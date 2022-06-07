export const rolesDb = [
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
