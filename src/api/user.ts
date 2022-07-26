import request from '../utils/request'

export type ApiLoginData = {
  username: string
  password: string
}
export function login(data: ApiLoginData) {
  return request<UserDb>({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

/** 获取菜单列表 */
export function getMenus() {
  return request<CaseRoute[]>({
    url: '/api/v1/menus',
    method: 'post'
  })
}

/** 获取用户数据 */
export function getUserInfo() {
  return request<RoleDb & UserDb>({
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
