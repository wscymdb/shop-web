/**
 * 根据当前路径 在路由数组对象中获取当前路由
 * @param {路由数组对象} routes
 * @param {当前路径} path
 * @returns
 */
export const getCurrentRoute = (routes, path) => {
  for (let route of routes) {
    if (route.path === path) return route
    if (route.children) {
      const childRoute = getCurrentRoute(route.children, path)
      if (childRoute) return childRoute
    }
  }
  return undefined
}
