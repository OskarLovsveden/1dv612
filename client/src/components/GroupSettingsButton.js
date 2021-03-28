import axios from 'axios'
import { useRef, useState, useContext } from 'react'

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
    IconButton,
    OrderedList,
    ListItem,
    Text,
    Heading
} from "@chakra-ui/react"

import { SettingsIcon } from '@chakra-ui/icons'
import { GroupsContext } from '../context/GroupsState'

const GroupSettingsButton = () => {
    const { selectedGroup } = useContext(GroupsContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [webhookUrl, setWebhookUrl] = useState('')
    const btnRef = useRef()

    const addHook = async () => {
        await axios(`/webhook/gitlab/${selectedGroup.id}`, {
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

        onClose()
    }

    const handleInputChange = (event) => {
        setWebhookUrl(event.target.value)
    }

    return (
        <>
            <IconButton isLoading={!selectedGroup} ref={btnRef} onClick={onOpen} icon={<SettingsIcon />} />
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
                                <OrderedList>
                                    <ListItem>Select a text channel on Discord</ListItem>
                                    <ListItem>Press "Edit Channel"</ListItem>
                                    <ListItem>Press "Integrations"</ListItem>
                                    <ListItem>Press "Webhooks"</ListItem>
                                    <ListItem>Press "New Webhook" or select an existing one</ListItem>
                                    <ListItem>Press "Copy Webhook URL"</ListItem>
                                </OrderedList>
                            </FormLabel>
                            <Input mt="3" onChange={e => handleInputChange(e)} placeholder="Discord webhook here..." />
                            <Heading mt="3" size="sm">Current hook:</Heading>
                            <Text>{selectedGroup && selectedGroup.channel_hook}</Text>
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

export default GroupSettingsButton
