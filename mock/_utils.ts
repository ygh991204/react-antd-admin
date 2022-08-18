import { usersDb, rolesDb } from './_data'

export function response(data: any = null, code = 200, msg = '操作成功') {
  return {
    code,
    data,
    msg
  }
}

export type Response = ReturnType<typeof response>

export function createApi(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put',
  response: (request: IAnyObject) => Response
) {
  return {
    url,
    method,
    response
  }
}

export function getUserInfoByToken(headers: IAnyObject) {
  const token = headers['authorization'] ? headers['authorization'].replace('Bearer', '').trim() : ''
  if (token) {
    const user = usersDb.filter((v) => v.token === token)[0]
    if (user) {
      const roles = rolesDb.filter((v) => user.roles.includes(v.roleValue))
      const permissions = [
        ...new Set([
          ...roles.reduce((prev, role) => {
            prev = prev.concat(role.permissions)
            return prev
          }, [] as string[])
        ])
      ]
      return {
        ...user,
        permissions,
        roles
      }
    } else {
      return null
    }
  } else {
    return null
  }
}
