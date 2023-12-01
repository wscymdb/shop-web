import { request } from '..'

// 高性价比房源
export const getHomeGoodPriceData = () => {
  return request.request({
    method: 'get',
    url: '/api/home/goodprice',
  })
}
// 高评分房源
export const getHomeHighScoreData = () => {
  return request.request({
    method: 'get',
    url: '/api/home/highScore',
  })
}

// 折扣房源
export const getHomeDiscountData = () => {
  return request.request({
    method: 'get',
    url: '/api/home/discount',
  })
}
