import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any, R = Api.Response<T>>(config: AxiosRequestConfig): Promise<R>
    get<T = any, R = Api.Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    delete<T = any, R = Api.Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    head<T = any, R = Api.Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    options<T = any, R = Api.Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    post<T = any, R = Api.Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    put<T = any, R = Api.Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    patch<T = any, R = Api.Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
  }
}

declare namespace Api {

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

export default {}
