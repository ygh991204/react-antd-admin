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
