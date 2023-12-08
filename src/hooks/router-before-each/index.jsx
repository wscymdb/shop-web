import { memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '@/router'
import { getCurrentRoute } from '@/utils/about-router'
import { localCache } from '@/utils/cache'

const RouterBeforeEach = memo(({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(location)
    const router = getCurrentRoute(routes, location.pathname)

    const login = localCache.getCache('token')
    if (router && router.auth && !login) {
      navigate('/login')
    }
  }, [location.pathname])

  return children
})

export default RouterBeforeEach
