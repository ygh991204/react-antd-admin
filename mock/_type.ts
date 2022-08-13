
export interface UserDb {
  nikename: string
  username: string
  password: string
  role: string
  avater?: string
  token: string
}

export interface RoleDb {
  roleValue: string
  roleName: string
  permissions: string[]
}

export interface BasisListItem {
  id: string,
  name: string,
  description: string,
  createTime: string,
  status: 1 | 2
}

