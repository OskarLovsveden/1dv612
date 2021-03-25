import { Box, Button, Flex, Spacer, Heading } from '@chakra-ui/react'

const doLogout = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab/logout`, '_self')
}

const Nav = () => {
    return (
        <Flex border="1px" borderColor="gray.200" p="2">
            <Box p="2">
                <Heading size="md">GitLab App</Heading>
            </Box>
            <Spacer />
            <Box as={Button} onClick={doLogout}>Logout</Box>
        </Flex >
    )
}

export default Nav