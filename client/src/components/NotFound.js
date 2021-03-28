import { Box } from '@chakra-ui/react'

const NotFound = () => {
    return <Box>404 - <code>{window.location.pathname}</code> is not a valid page</Box>
}

export default NotFound