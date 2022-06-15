
import { usersDb, rolesDb } from './_data'

/**
 *
 * @param {string} url
 * @param {'get'|'post'|'delete'|'put'} method
 * @param {Function} response
 */
export function createApi(url, method, response) {
  return {
    url,
    method,
    response
  }
}

export function response(data, code = 200, msg = '操作') {
  return {
    code,
    data,
    msg
  }
}

export function getUserInfoByToken(headers) {
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
