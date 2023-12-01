import axios from 'axios'

class YMRequest {
  // 创建实例
  constructor(config) {
    this.instance = axios.create(config)

    // 私有拦截器(如果有的话，每个实例可以定制化拦截器)
    // axios重复添加拦截器不会被覆盖，会共同存在
    // 后续拦截器如果内容和之前的一样 则以第一次拦截器的为主
    this.instance.interceptors.request.use(
      config.interceptors?.successRequestFn,
      config.interceptors?.failRequestFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.successResponseFn,
      config.interceptors?.failResponseFn
    )

    //  全局拦截器
    this.instance.interceptors.request.use((config) => {
      // todo
      return config
    })

    this.instance.interceptors.response.use((res) => {
      // todo
      return res.data
    })
  }

  // 封装网络请求方法
  request(config) {
    // 实例 私有的拦截器 每次请求的操作
    if (config.interceptors?.successRequestFn) {
      config = config.interceptors.successRequestFn(config)
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 实例 私有的拦截器
          if (config.interceptors?.successResponseFn) {
            res = config.interceptors.successResponseFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err, 'request')
        })
    })
  }

  //
  get(config) {
    return this.request({ method: 'GET', ...config })
  }

  post(config) {
    return this.request({ method: 'POST', ...config })
  }

  delete(config) {
    return this.request({ method: 'DELETE', ...config })
  }

  patch(config) {
    return this.request({ method: 'PATCH', ...config })
  }
}

export default YMRequest
