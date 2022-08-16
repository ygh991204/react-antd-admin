import axios from 'axios'
import { notification } from 'antd'
import { getToken } from '@/utils/auth'
import { EnvConfig } from '@/env'
import Storage from './storage'

const service = axios.create({
  baseURL: EnvConfig.APP_BASE_URL,
  timeout: 6000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (config.headers) {
      if (token) config.headers['Authorization'] = 'Bearer ' + token
      config.headers['Content-Type'] = 'application/json'
      config.headers['Accept-Language'] = Storage.get('language') || EnvConfig.APP_LANGUAGE
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

const checkCodeSuccess = (code: number) => code >= 200 && code < 300

service.interceptors.response.use(
  (response) => {
    if (checkCodeSuccess(response.status)) {
      const data = response.data
      if (checkCodeSuccess(data.code)) {
        return data
      } else {
        notification.error({
          message: data.msg
        })
        return Promise.reject('')
      }
    } else {
      return Promise.reject('')
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service.request
