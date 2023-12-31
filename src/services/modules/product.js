import { requestJson, requestMultipart } from '..'

// 获取商品列表
export const getProductList = (data) => {
  return requestJson.request({
    method: 'post',
    url: '/api/product/list',
    data
  })
}

// 根据id查询商品
export const getProductById = (id) => {
  return requestJson.request({
    method: 'get',
    url: `/api/product/list/${id}`
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

// 修改商品
export const editProduct = (data) => {
  return requestJson.request({
    method: 'put',
    url: '/api/product/update',
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

// 删除商品
export const deleteProductById = (id) => {
  return requestJson.request({
    method: 'delete',
    url: `/api/product/delete/${id}`
  })
}

// 删除图片
export const deleteImgByName = (data) => {
  return requestJson.request({
    method: 'post',
    url: `/api/upload/deleteStaticImg`,
    data
  })
}
