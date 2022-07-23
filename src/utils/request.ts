import axios from 'axios'
import { notification } from 'antd'
import { getToken } from '@/utils/auth'
import Config from '@/config'
import Storage from './storage'

const service = axios.create({
  baseURL: Config.baseUrl,
  timeout: 6000,
})


service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (config.headers) {
      if (token) config.headers['Authorization'] = 'Bearer ' + token
      config.headers['Content-Type'] = 'application/json'
      config.headers['Accept-Language'] = Storage.get('lang') || Config.lang
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
          message: data.msg,
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
