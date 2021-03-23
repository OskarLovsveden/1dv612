import { Button } from '@chakra-ui/react'

const Dashboard = () => {
    const logout = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab/logout`, '_self')
        // setUser(null)
    }

    return (
        <>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Dashboard