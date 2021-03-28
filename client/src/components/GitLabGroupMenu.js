import { useContext } from 'react'

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
import { GroupsContext } from '../context/GroupsState'

import GroupSettingsButton from './GroupSettingsButton'

const GitLabGroupMenu = () => {
    const { groups, selectedGroup, selectGroup } = useContext(GroupsContext)

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
                <GroupSettingsButton />
            </Box>
            <MenuList>
                {
                    selectedGroup &&
                    <MenuOptionGroup
                        onChange={(group) => clickGroup(group)}
                        defaultValue={selectedGroup.name}
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
