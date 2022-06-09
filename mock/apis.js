
import { usersDb, menusDb, rolesDb } from './_data'

/**
 *
 * @param {string} url
 * @param {'get'|'post'|'delete'|'put'} method
 * @param {Function} response
 */
function createApi(url, method, response) {
  return {
    url,
    method,
    response
  }
}

function response(data, code = 200, msg = '操作') {
  return {
    code,
    data,
    msg
  }
}

const getUserInfoByToken = (headers) => {
  const token = headers['authorization'] ? headers['authorization'].replace('Bearer', '').trim() : ''
  if (token) {
    const user = usersDb.filter((v) => v.token === token)[0]
    if (user) {
      const role = rolesDb.filter(v => v.roleValue === user.role)[0]
      return {
        ...user,
        ...role
      }
    } else {
      return null
    }
  } else {
    return null
  }
}

const anthMenus = (menus, permissions = []) => {
  return menus.filter(menu => {
    if (permissions.indexOf(menu.meta.permission) !== -1) {
      if (menu.children && menu.children.length) {
        menu.children = anthMenus(menu.children, permissions)
      }
      return true
    } else {
      return false
    }
  })
}

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
const userLogout = createApi('/api/v1/logout', 'post', ({ body }) => {
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
const getMenus = createApi('/api/v1/menus', 'post', ({ headers }) => {
  const user = getUserInfoByToken(headers)
  if (user) {
    return response(anthMenus(menusDb, user.permissions))
  } else {
    return response(null, 401, 'token 错误')
  }
})

export default [userLogin, userLogout, getUserInfo, getMenus]
