declare namespace Api {
  /**
   * 定义接口返回的固定格式
   */
  export interface Response<T = any> {
    code: number
    msg: string
    data: T
  }

  export type PageListRequest<T extends IAnyObject = IAnyObject> = {
    pageIndex: number
    pageSize?: number
  } & T

  export interface PageListResponse<T extends IAnyObject = IAnyObject> {
    count: number
    list: T[]
    pageIndex: number
    pageSize: number
    totalPage: number
  }
}
