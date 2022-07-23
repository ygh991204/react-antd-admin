import type { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios'

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
  /**
   * 定义接口返回的固定格式
   */
  export interface Response<T = any> {
    code: number
    msg: string
    data: T
  }
}
