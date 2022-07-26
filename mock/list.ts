import Mock from 'mockjs'
import { createApi, response } from './_utils'
import { v1 as uuidv1 } from 'uuid'

const getList = createApi('/api/v1/list', 'get', (request) => {
  const count = 205
  const { pageIndex, pageSize } = request.query
  const size = pageSize ? Number(pageSize) : 10
  const page = pageIndex ? Number(pageIndex) : 1
  const totalPage = Math.ceil(count / size)
  const list: BasisListItem[] = []
  if (totalPage >= pageIndex) {
    const Random = Mock.Random
    for (let i = 0; i < size; i++) {
      list.push({
        id: uuidv1(),
        name: Random.csentence(5, 15),
        description: Random.csentence(15, 30),
        createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        status: Random.natural(1, 2) as any
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

const del = createApi('/api/v1/list', 'delete', (request) => {
  return response()
})

const edit = createApi('/api/v1/list', 'put', (request) => {
  return response()
})

const add = createApi('/api/v1/list', 'post', (request) => {
  return response()
})

export default [getList, del, edit, add]
