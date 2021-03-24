import { useEffect, useState } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { Container, Spinner } from '@chakra-ui/react'

import routes from './utils/routes.js'
import PrivateRoute from './components/routes/PrivateRoute.js'
import PublicRoute from './components/routes/PublicRoute.js'
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'
import Dashboard from './components/Dashboard.js'

import { connectSocket } from './utils/socket.js'
import axios from 'axios'

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    const res = await axios('/auth/gitlab/check', {
      withCredentials: true,
      baseURL: process.env.REACT_APP_SERVER_URL
    })

    // ADD WEB HOOK TEST
    await axios(`/webhook/gitlab/8475`, {
      method: 'POST',
      withCredentials: true,
      baseURL: process.env.REACT_APP_SERVER_URL
    })
    // END TEST

    // TODO - Save user in context
    if (res.data) {
      setAuthenticated(true)
      connectSocket(res.data.token)
    } else {
      setAuthenticated(false)
    }

    setLoading(false)
  }

  return (
    <Container centerContent>
      {location.pathname !== routes.LOGIN && <Nav />}
      {loading
        ? <Spinner />
        : <Switch>
          <PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} path={routes.DASHBOARD} exact />
          <PublicRoute isAuthenticated={isAuthenticated} restricted component={Login} path={routes.LOGIN} exact />
          <PublicRoute isAuthenticated={isAuthenticated} component={NotFound} />
        </Switch>}
    </Container >
  )
}

export default App
