import Mock from 'mockjs'
import { createApi, response } from './_utils'
import { v1 as uuidv1 } from 'uuid'

const getList = createApi('/api/v1/list', 'get', (request) => {
  const count = 205
  const { pageIndex, pageSize, status, name } = request.query
  const size = pageSize ? Number(pageSize) : 10
  const page = pageIndex ? Number(pageIndex) : 1
  const totalPage = Math.ceil(count / size)
  const list: Api.BasisListDb[] = []
  if (totalPage >= pageIndex) {
    const Random = Mock.Random
    for (let i = 0; i < size; i++) {
      list.push({
        id: uuidv1(),
        name: name ? name + Random.csentence(5, 8) : Random.csentence(8, 16),
        description: Random.csentence(15, 30),
        createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        status: status ? Number(status) : Random.natural(1, 2) as any
      })
    }
  }
  return response({
    list,
    count,
    pageIndex: page,
    pageSize: size,
    totalPage
  })
})

const del = createApi('/api/v1/list', 'delete', () => {
  return response()
})

const edit = createApi('/api/v1/list', 'put', () => {
  return response()
})

const add = createApi('/api/v1/list', 'post', () => {
  return response()
})

export default [getList, del, edit, add]
