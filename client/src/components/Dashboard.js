import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import GitLabGroupMenu from './GitLabGroupMenu'
import GitLabGroupList from './GitLabGroupList'



const Dashboard = () => {
    const [selectedGroup, setSelectedGroup] = useState()

    const selectGroup = (group) => {
        setSelectedGroup(group)
    }

    return (
        <Box p="1">
            <GitLabGroupMenu selectGroup={selectGroup} group={selectedGroup} />
            {selectedGroup && <GitLabGroupList group={selectedGroup} />}
        </Box>
    )
}

export default Dashboard