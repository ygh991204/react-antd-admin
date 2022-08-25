import type { AxiosRequestConfig } from 'axios'
import type { TranslationLocale } from '@/language/zh_CN'

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

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      [key in AppLanguage]: TranslationLocale
    }
  }
}

export {}
