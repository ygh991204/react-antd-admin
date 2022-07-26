declare interface UserDb {
  nikename: string
  username: string
  password: string
  role: string
  avater?: string
  token: string
}

declare interface RoleDb {
  roleValue: string
  roleName: string
  permissions: string[]
}

declare interface BasisListItem {
  id: string,
  name: string,
  description: string,
  createTime: string,
  status: 1 | 2
}
