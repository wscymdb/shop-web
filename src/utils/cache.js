class Cache {
  constructor(type, namespace) {
    this.namespace = namespace
    this.storage = type === 0 ? localStorage : sessionStorage
  }

  setCache(key, value) {
    let storage = this.getStorage()
    storage[key] = value

    this.storage.setItem(this.namespace, JSON.stringify(storage))
  }

  getCache(key) {
    return this.getStorage()[key]
  }

  removeCache(key) {
    let val = this.getStorage()
    delete val[key]

    this.storage.setItem(this.namespace, JSON.stringify(val))
  }

  clear() {
    this.storage.clear()
  }

  getStorage() {
    return JSON.parse(this.storage.getItem(this.namespace) || '{}')
  }
}

// 参数一表示是使用 localStorage还是sessionStorage
// 参数二 命名空间的名字
const localCache = new Cache(0, 'cym-cms')
const sessionCache = new Cache(1, 'cym-cms')

export { localCache, sessionCache }
