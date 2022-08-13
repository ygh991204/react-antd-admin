import request from '@/utils/request'

const api = '/api/v1/list'

export interface GetListQueryFrom {
  name?: string
  createTime?: [string, string],
  status?: Api.BasisListDb['status']
}

export type GetListParams = Api.PageListRequest<GetListQueryFrom>

export type BasisListForm = Omit<Api.BasisListDb, 'id' | 'createTime'>

export function getList(params: GetListParams) {
  return request<Api.PageListResponse<Api.BasisListDb>>({
    url: api,
    method: 'get',
    params
  })
}

export function edit(data: Api.BasisListDb) {
  return request({
    url: api,
    method: 'put',
    data
  })
}

export function del(ids: string[]) {
  return request({
    url: api,
    method: 'delete',
    data: ids
  })
}

export function add(data: BasisListForm) {
  return request({
    url: api,
    method: 'post',
    data
  })
}
