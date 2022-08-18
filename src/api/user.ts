import request from '../utils/request'

export type ApiLoginData = {
  username: string
  password: string
}

/** 登录 */
export function login(data: ApiLoginData) {
  return request<Api.UserDb>({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

/** 获取菜单列表 */
export function getMenus() {
  return request<Api.MenuDb[]>({
    url: '/api/v1/menus',
    method: 'post'
  })
}

export interface UserData extends Omit<Api.UserDb, 'roles'> {
  roles: Api.RoleDb[],
  permissions: string[]
}

/** 获取用户数据 */
export function getUserInfo() {
  return request<UserData>({
    url: '/api/v1/userinfo',
    method: 'post'
  })
}

/** 退出登录 */
export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}
