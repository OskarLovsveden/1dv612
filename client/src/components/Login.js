import { Button } from '@chakra-ui/react'

const Login = () => {
    const doLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab`, '_self')
    }

    return <Button onClick={doLogin}>LOGIN</Button >
}

export default Login