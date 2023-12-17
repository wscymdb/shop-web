import { requestJson, requestMultipart } from '..'

// 获取商品列表
export const getLabelList = (data) => {
  return requestJson.request({
    method: 'get',
    url: '/api/label',
    data
  })
}

// 删除商品
export const deleteLabelById = (id) => {
  return requestJson.request({
    method: 'delete',
    url: `/api/label/${id}`
  })
}

// 根据id查询标签
export const getProductById = (id) => {
  return requestJson.request({
    method: 'get',
    url: `/api/label/${id}`
  })
}

// 添加标签
export const addLabel = (data) => {
  return requestJson.request({
    method: 'post',
    url: '/api/label/',
    data
  })
}

// 修改标签
export const editProduct = (data) => {
  return requestJson.request({
    method: 'put',
    url: '/api/label/update',
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

// 删除图片
export const deleteImgByName = (data) => {
  return requestJson.request({
    method: 'post',
    url: `/api/upload/deleteStaticImg`,
    data
  })
}
