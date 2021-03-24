import { useEffect, useState } from 'react'
import { Box, Button, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

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

        setGroups(res.data)
    }

    return (
        <Box>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Your Groups
                </MenuButton>
                <MenuList minWidth="240px">
                    {groups && <MenuOptionGroup defaultValue={groups[0].name} type="radio">
                        {groups.map(g => (
                            <MenuItemOption value={g.name} key={g.id}>
                                {g.name}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>}
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Dashboard