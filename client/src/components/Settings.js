import axios from 'axios'
import { useRef } from 'react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Text
} from "@chakra-ui/react"

import { SettingsIcon } from '@chakra-ui/icons'


const Settings = (props) => {
    const { selectedGroup } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    console.log(selectedGroup)

    const testAddHook = async () => {
        // ADD WEB HOOK TEST
        const res = await axios(`/webhook/gitlab/${selectedGroup.id}`, {
            method: 'POST',
            withCredentials: true,
            baseURL: process.env.REACT_APP_SERVER_URL
        })

        console.log(res.data)
        // END TEST
    }

    return (
        <>
            <IconButton
                ref={btnRef}
                onClick={onOpen}
                isLoading={!selectedGroup}
                aria-label="Settings"
                icon={<SettingsIcon />} />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Notification Settings</DrawerHeader>

                        <DrawerBody>
                            {selectedGroup && selectedGroup.projects.map(p => (
                                <Text key={p.id}>{p.name}</Text>
                            ))}
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                </Button>
                            <Button colorScheme="blue" onClick={testAddHook}>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default Settings