import { Box, Button, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const doLogout = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab/logout`, '_self')
}

const Nav = () => {
    return (
        <Box>
            <Button onClick={doLogout}>Logout</Button>
            <IconButton icon={<SettingsIcon />} />
        </Box>
    )
}

export default Nav