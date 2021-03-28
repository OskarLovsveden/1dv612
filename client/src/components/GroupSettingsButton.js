import { useRef, useState, useEffect, useContext } from 'react'

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
    FormControl,
    Heading,
    Switch
} from "@chakra-ui/react"

import * as axios from '../utils/axios-helper'

import { SettingsIcon } from '@chakra-ui/icons'
import { GroupsContext } from '../context/GroupsState'

const GroupSettingsButton = () => {
    const { selectedGroup, selectGroup } = useContext(GroupsContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [discHook, setDiscHook] = useState()
    const [notifyIssue, setNotifyIssue] = useState()
    const [notifyRelease, setNotifyRelease] = useState()

    useEffect(() => {
        const setState = () => {
            if (selectedGroup) {
                setDiscHook(selectedGroup.channel_hook)
                setNotifyIssue(selectedGroup.notify_issue)
                setNotifyRelease(selectedGroup.notify_release)
            }
        }

        setState()
    }, [selectedGroup])


    const addHook = async () => {
        await axios.post(`/webhook/gitlab/${selectedGroup.id}`, {
            options: {
                issue: notifyIssue,
                release: notifyRelease
            },
            channel_hook: discHook
        }
        )

        selectGroup({
            ...selectedGroup,
            channel_hook: discHook,
            notify_issue: notifyIssue,
            notify_release: notifyRelease
        })
        onClose()
    }

    const removeHook = async () => {
        await axios.remove(`/webhook/gitlab/${selectedGroup.id}`)

        selectGroup({
            ...selectedGroup, channel_hook: '',
            notify_issue: false,
            notify_release: false
        })
        onClose()
    }

    const handleInputChange = (event) => {
        setDiscHook(event.target.value)
    }

    const handleSwitchChange = (event) => {
        switch (event.target.id) {
            case 'issue':
                setNotifyIssue(event.target.checked)
                break
            case 'release':
                setNotifyRelease(event.target.checked)
                break
            default:
                break
        }
    }

    const openDrawer = () => {
        setDiscHook(selectedGroup.channel_hook)
        setNotifyIssue(selectedGroup.notify_issue)
        setNotifyRelease(selectedGroup.notify_release)
        onOpen()
    }

    return (
        <>
            <IconButton
                isLoading={!selectedGroup}
                ref={btnRef}
                onClick={openDrawer}
                icon={<SettingsIcon />}
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Offline Notifications</DrawerHeader>
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
                            <Heading mt="3" size="sm">Current hook:</Heading>
                            <Input
                                mt="3"
                                onChange={e => handleInputChange(e)}
                                placeholder={"Discord webhook here..."}
                                defaultValue={selectedGroup && selectedGroup.channel_hook}
                            />
                            <FormControl display="flex" alignItems="center" mt="2">
                                <Switch
                                    id="issue"
                                    mr="3"
                                    onChange={(e) => handleSwitchChange(e)}
                                    defaultChecked={selectedGroup && selectedGroup.notify_issue}
                                />
                                <FormLabel mb="0">Issue Notifications</FormLabel>
                            </FormControl>
                            <FormControl display="flex" alignItems="center" mt="2">
                                <Switch
                                    id="release"
                                    mr="3"
                                    onChange={(e) => handleSwitchChange(e)}
                                    defaultChecked={selectedGroup && selectedGroup.notify_release}
                                />
                                <FormLabel mb="0">Release Notifications</FormLabel>
                            </FormControl>
                        </DrawerBody>


                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={removeHook}>Delete</Button>
                            <Button colorScheme="blue" onClick={addHook}>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default GroupSettingsButton
