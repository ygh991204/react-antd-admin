
/**  */
declare namespace Api {
  /**
   * 响应格式
   */
  export interface Response<T = any> {
    code: number
    msg: string
    data: T
  }

  /**
   * 分页请求
   */
  export type PageListRequest<T extends IAnyObject = IAnyObject> = {
    pageIndex: number
    pageSize?: number
  } & T

  /**
   * 分页响应
   */
  export interface PageListResponse<T extends IAnyObject = IAnyObject> {
    count: number
    list: T[]
    pageIndex: number
    pageSize: number
    totalPage: number
  }

  export interface MenuMetaDb {
    hidden?: boolean
    title?: string
    affixTab?: boolean
    permission?: string
    icon?: string
  }

  export interface MenuDb {
    path: string
    meta: MenuMetaDb,
    component?: ReactNode
    redirect?: string
    children?: MenuDb[]
  }

  export interface UserDb {
    nikename: string
    username: string
    password: string
    roles: string[]
    avater: string
    token: string
  }

  export interface RoleDb {
    roleValue: string
    roleName: string
    permissions: string[]
  }

  export interface BasisListDb {
    id: string,
    name: string,
    description: string,
    createTime: string,
    status: 1 | 2
  }

}
