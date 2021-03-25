import axios from 'axios'
import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import GitLabGroup from './GitLabGroup'
import Settings from './Settings'

const Dashboard = () => {
    const [groups, setGroups] = useState()
    const [selectedGroup, setSelectedGroup] = useState()

    useEffect(() => {
        getGroups()
    }, [])

    const getGroups = async () => {
        const res = await axios('/api/gitlab/groups', {
            withCredentials: true,
            baseURL: process.env.REACT_APP_SERVER_URL
        })

        setGroups(res.data)
        setSelectedGroup(res.data[0])
    }

    const clickGroup = (name) => {
        const group = groups.find(g => g.name === name)
        setSelectedGroup(group)
    }

    return (
        <Box p="1">
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    border="1px"
                    borderColor="gray.200"
                    size="md"
                    isLoading={!selectedGroup}>
                    Select Group
                </MenuButton>
                <Box as="span" ml="2" color="gray.600">
                    <Settings selectedGroup={selectedGroup} />
                </Box>
                <MenuList>
                    {
                        groups &&
                        <MenuOptionGroup
                            onChange={(group) => clickGroup(group)}
                            defaultValue={groups[0].name}
                            type="radio"
                        >
                            {groups.map(g => (
                                <MenuItemOption value={g.name} key={g.id}>
                                    {g.name}
                                </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                    }
                </MenuList>
            </Menu>
            {selectedGroup && <GitLabGroup group={selectedGroup} />}
        </Box>
    )
}

export default Dashboard