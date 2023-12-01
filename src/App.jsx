import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import { AppWrapper } from './views/style'

const App = memo(() => {
  return (
    <AppWrapper>
      <div className="page">{useRoutes(routes)}</div>
    </AppWrapper>
  )
})

export default App
