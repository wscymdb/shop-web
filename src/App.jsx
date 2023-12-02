import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import { AppWrapper } from './views/style'
import RouterBeforeEach from './hooks/router-before-each'

const App = memo(() => {
  return (
    <AppWrapper>
      <RouterBeforeEach>{useRoutes(routes)}</RouterBeforeEach>
    </AppWrapper>
  )
})

export default App
