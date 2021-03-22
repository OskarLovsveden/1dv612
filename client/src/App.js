import { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom'

import axios from 'axios'

const App = () => {
  const [user, setUser] = useState()
  const location = useLocation()

  useEffect(() => {
    // checkAuth()
  }, [])

  const checkAuth = async () => {
    const res = await axios('/auth/gitlab/check', {
      withCredentials: true,
      baseURL: process.env.REACT_APP_SERVER_URL
    })
    res.data.user ? setUser(res.data.user) : setUser(null)
  }

  const login = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab`, '_self')
  }

  const logout = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab/logout`, '_self')
    setUser(null)
  }

  return (
    <div className="App">
      {location.pathname !== '/login' && <Nav />}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div >
  )
}

const Nav = () => {
  return <div>NAV</div>
}

const Login = () => {
  return <div>LOGIN</div>
}

const Main = () => {
  return <div>MAIN</div>
}

const NotFound = () => {
  return <div>404 - <code>{window.location.pathname}</code> is not a valid page</div>
}


export default App
