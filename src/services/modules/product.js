import { request, requestJson, requestMultipart } from '..'

// 获取商品列表
export const getProductList = (data) => {
  return requestJson.request({
    method: 'post',
    url: '/api/product/list',
    data
  })
}

// 添加商品
export const addProduct = (data) => {
  return requestJson.request({
    method: 'post',
    url: '/api/product/create',
    data
  })
}

// 上传商品banner
export const uploadProductBanner = (data) => {
  return requestMultipart.request({
    method: 'post',
    url: '/api/upload/product_banner',
    data
  })
}
