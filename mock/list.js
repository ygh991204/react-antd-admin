
import Mock from 'mockjs'
import { createApi, response } from './_utils'
import { v1 as uuidv1 } from 'uuid'

const getList = createApi('/api/v1/list', 'get', (request) => {
  const { pageIndex, pageSize } = request.query
  const page = pageIndex ? Number(pageIndex) : 1
  const size = pageSize ? Number(pageSize) : 10
  const count = 200
  const Random = Mock.Random
  const list = []
  for (let i = 0; i < size; i++) {
    list.push({
      'id': uuidv1(),
      'name': Random.csentence(10, 30),
      'createTime': Random.date('yyyy-MM-dd HH:mm:ss'),
      'status': Random.natural(1, 2),
      'children': [
        {
          'id': uuidv1(),
          'name': Random.csentence(10, 30),
          'createTime': Random.date('yyyy-MM-dd HH:mm:ss'),
          'status': Random.natural(1, 2)
        }
      ]
    })
  }
  return response({
    list,
    count,
    page,
    size
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
