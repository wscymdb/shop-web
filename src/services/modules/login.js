import { request } from '..'

// login
export const login = (data) => {
  return request.request({
    method: 'post',
    url: '/api/login',
    data
  })
}
