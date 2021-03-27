import { useContext } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

import routes from './utils/routes.js'
import PrivateRoute from './components/routes/PrivateRoute.js'
import PublicRoute from './components/routes/PublicRoute.js'
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'
import Dashboard from './components/Dashboard.js'

import { AuthContext } from './context/AuthState.js'

const App = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()

  return (
    <Container padding={1}>
      {location.pathname !== routes.LOGIN && <Nav />}
      <Switch>
        <PrivateRoute isAuthenticated={isAuthenticated()} component={Dashboard} path={routes.DASHBOARD} exact />
        <PublicRoute isAuthenticated={isAuthenticated()} restricted component={Login} path={routes.LOGIN} exact />
        <PublicRoute isAuthenticated={isAuthenticated()} component={NotFound} />
      </Switch>
    </Container >
  )
}

export default App
