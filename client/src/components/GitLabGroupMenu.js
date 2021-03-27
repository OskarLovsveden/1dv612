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
import GroupSettingsButton from './GroupSettingsButton'
import * as axios from '../utils/axios-helper'

const GitLabGroupMenu = (props) => {
    const { selectGroup, group } = props
    const [groups, setGroups] = useState()

    useEffect(() => {
        const getGroups = async () => {
            try {
                const res = await axios.get('/api/gitlab/groups')
                setGroups(res.data)
                selectGroup(res.data[0])
            } catch (error) {
                console.error(error)
            }
        }

        getGroups()
    }, [])

    const clickGroup = (name) => {
        const group = groups.find(g => g.name === name)
        selectGroup(group)
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                border="1px"
                borderColor="gray.200"
                size="md"
                isLoading={!groups}>
                Select Group
                </MenuButton>
            <Box as="span" ml="2" color="gray.600">
                <GroupSettingsButton group={group} />
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
    )
}

export default GitLabGroupMenu
