import { VStack, Center, Image, Button } from '@chakra-ui/react'

const Login = () => {
    const doLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/gitlab`, '_self')
    }

    return (
        <VStack>
            <Image w="sm" src="gitlab.svg" />
            <Center w="sm">
                <Button size="lg" onClick={doLogin}>Login</Button >
            </Center>
        </VStack>
    )
}

export default Login