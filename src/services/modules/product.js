import { request } from '..'

// 获取商品列表
export const getProductList = () => {
  return request.request({
    method: 'get',
    url: '/api/product/list',
  })
}
