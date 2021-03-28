import { useHistory } from 'react-router-dom'

import { Center, Heading, Text, VStack, IconButton } from '@chakra-ui/react'
import { MdHome } from "react-icons/md"

const NotFound = () => {
    const history = useHistory()

    return (
        <Center>
            <VStack>
                <Heading>404</Heading>
                <Text><code>{window.location.pathname}</code> is not a valid page</Text>
                <IconButton onClick={() => history.push('/')} size="lg" icon={<MdHome />} />
            </VStack>
        </Center>
    )
}

export default NotFound