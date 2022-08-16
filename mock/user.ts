import { usersDb, menusDb } from './_data'
import { response, createApi, getUserInfoByToken } from './_utils'

/** 登录 */
const userLogin = createApi('/api/v1/login', 'post', ({ body }) => {
  const user = usersDb.filter((v) => v.username === body.username && v.password === body.password)
  if (user.length) {
    return response(user[0])
  } else {
    return response(null, 403, '用户名或账号不存在')
  }
})

/** 退出登录 */
const userLogout = createApi('/api/v1/logout', 'post', () => {
  return response(null)
})

/** 获取用户信息 */
const getUserInfo = createApi('/api/v1/userinfo', 'post', ({ headers }) => {
  const user = getUserInfoByToken(headers)
  if (user) {
    return response(user)
  } else {
    return response(null, 401, 'token 错误')
  }
})

/** 菜单 */
const anthMenus = (menus: Api.MenuDb[], permissions: string[] = []) => {
  return menus.filter((menu) => {
    if (menu.meta && menu.meta.permission && permissions.indexOf(menu.meta.permission) !== -1) {
      if (menu.children && menu.children.length) {
        menu.children = anthMenus(menu.children, permissions)
      }
      return true
    } else {
      return false
    }
  })
}

const getMenus = createApi('/api/v1/menus', 'post', ({ headers }) => {
  const user = getUserInfoByToken(headers)
  if (user) {
    return response(anthMenus(menusDb, user.permissions))
  } else {
    return response(null, 401, 'token 错误')
  }
})

export default [userLogin, userLogout, getUserInfo, getMenus]
