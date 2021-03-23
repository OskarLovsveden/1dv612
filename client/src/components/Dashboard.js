import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'

import axios from 'axios'

const Dashboard = () => {
    const [groups, setGroups] = useState()

    useEffect(() => {
        getGroups()
    }, [])

    const getGroups = async () => {
        const res = await axios('/api/gitlab/groups', {
            withCredentials: true,
            baseURL: process.env.REACT_APP_SERVER_URL
        })

        console.log(res.data)
    }

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