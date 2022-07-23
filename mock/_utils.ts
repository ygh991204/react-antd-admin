import { usersDb, rolesDb } from './_data'

export function response(data: any = null, code = 200, msg = '操作成功') {
  return {
    code,
    data,
    msg,
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
    response,
  }
}

export function getUserInfoByToken(headers: IAnyObject) {
  const token = headers['authorization'] ? headers['authorization'].replace('Bearer', '').trim() : ''
  if (token) {
    const user = usersDb.filter((v) => v.token === token)[0]
    if (user) {
      const role = rolesDb.filter((v) => v.roleValue === user.role)[0]
      return {
        ...user,
        ...role,
      }
    } else {
      return null
    }
  } else {
    return null
  }
}
