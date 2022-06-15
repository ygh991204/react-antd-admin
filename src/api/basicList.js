
import request from '../utils/request'

export const basicListUrl = '/api/v1/list'

export default {
  create(data) {
    return request({
      url: '/api/v1/list',
      method: 'post',
      data: data
    })
  },
  del(ids) {
    return request({
      url: '/api/v1/list',
      method: 'delete',
      data: ids
    })
  },
  update(data) {
    return request({
      url: '/api/v1/list',
      method: 'put',
      data: data
    })
  }
}
