import axios from 'axios'
import { useRef, useState } from 'react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormLabel,
    IconButton
} from "@chakra-ui/react"

import { SettingsIcon } from '@chakra-ui/icons'

const GroupSettings = (props) => {
    const { group } = props

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [webhookUrl, setWebhookUrl] = useState('')
    const btnRef = useRef()

    const addHook = async () => {
        await axios(`/webhook/gitlab/${group.id}`, {
            method: 'POST',
            withCredentials: true,
            baseURL: process.env.REACT_APP_SERVER_URL,
            data: {
                options: {
                    // TODO - Add more options (releases, commits, etc.)
                    // Only option and true by default for now
                    issue: true
                },
                webhookUrl: webhookUrl
            }
        })
    }

    const handleInputChange = (event) => {
        setWebhookUrl(event.target.value)
    }

    return (
        <>
            <IconButton isLoading={!group} ref={btnRef} onClick={onOpen} icon={<SettingsIcon />} />
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
                            <FormLabel htmlFor="email-alerts" mb="0">
                                DISC CHANNEL HOOK HERE
                            </FormLabel>
                            <Input onChange={e => handleInputChange(e)} placeholder="Type here..." />
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={addHook}>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default GroupSettings
