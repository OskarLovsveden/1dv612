import { Box } from '@chakra-ui/react'
import { GroupsProvider } from '../context/GroupsState'

import GitLabGroupMenu from './GitLabGroupMenu'
import GitLabGroupList from './GitLabGroupList'

const Dashboard = () => {
    return (
        <Box p="1">
            <GroupsProvider>
                <GitLabGroupMenu />
                <GitLabGroupList />
            </GroupsProvider>
        </Box>
    )
}

export default Dashboard