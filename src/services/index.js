import { localCache } from '@/utils/cache'
import YMRequest from './request'
import { stringify } from 'qs'

console.log(process.env)
const TIMEOUT = Number(process.env.REACT_APP_TIMEOUT)

function getRequest(contentType) {
  return new YMRequest({
    baseURL: '',
    timeout: TIMEOUT,
    interceptors: {
      successRequestFn(config) {
        config.headers.Authorization = 987
        // 请求的时候在请求头添加token
        const token = localCache.getCache('token')
        if (config.headers && token) {
          config.headers.Authorization = token
        }
        // 判断contentType类型
        if (contentType === 'encoded') config.data = stringify(config.data)

        return config
      },
    },
  })
}

// contentType是 application/x-www-form-urlencoded的请求
export const request = getRequest('encoded')
// contentType是 application/json
export const requestJson = getRequest('json')
