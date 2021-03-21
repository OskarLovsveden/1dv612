import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'

import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios('/auth/gitlab/success', {
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL
      })

      res.status === 200 ? setUser(res.data.user) : setUser({})
    }

    checkAuth()
  }, [])

  const login = () => {
    window.open(process.env.REACT_APP_SERVER_URL + '/auth/gitlab', '_self')
  }

  const logout = () => {
    window.open(process.env.REACT_APP_SERVER_URL + '/auth/gitlab/logout', '_self')
    setUser(null)
  }

  return (
    <div className="App">
      {user
        ? <Button onClick={logout}>Logout</Button>
        : <Button onClick={login}>Login</Button>
      }
    </div>
  )
}

export default App
