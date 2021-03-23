import { useEffect, useState } from 'react'

import {
  Switch,
  useLocation,
} from 'react-router-dom'

import axios from 'axios'

import routes from './utils/routes.js'
import PrivateRoute from './components/routes/PrivateRoute.js'
import PublicRoute from './components/routes/PublicRoute.js'
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'
import Dashboard from './components/Dashboard.js'

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const location = useLocation()

  const checkAuthentication = async () => {
    const res = await axios('/auth/gitlab/check', {
      withCredentials: true,
      baseURL: process.env.REACT_APP_SERVER_URL
    })

    // res.data.user ? setUser(res.data.user) : setUser(null)
    res.data.user ? setAuthenticated(true) : setAuthenticated(false)
  }

  useEffect(() => {
    checkAuthentication()
  }, [])


  return (
    <div className="App">
      {location.pathname !== routes.LOGIN && <Nav />}
      <Switch>
        <PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} path={routes.DASHBOARD} exact />
        <PublicRoute isAuthenticated={isAuthenticated} restricted component={Login} path={routes.LOGIN} exact />
        <PublicRoute isAuthenticated={isAuthenticated} component={NotFound} />
      </Switch>
    </div >
  )
}

export default App
