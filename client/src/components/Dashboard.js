import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    IconButton,
} from '@chakra-ui/react'

import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons'

import GitLabGroup from './GitLabGroup'
import axios from 'axios'

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

    // const testAddHook = async () => {
    //     // ADD WEB HOOK TEST
    //     const res = await axios(`/webhook/gitlab/13511`, {
    //         method: 'POST',
    //         withCredentials: true,
    //         baseURL: process.env.REACT_APP_SERVER_URL
    //     })

    //     console.log(res.data)
    //     // END TEST
    // }

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
                    <IconButton aria-label="Settings" icon={<SettingsIcon />} />
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