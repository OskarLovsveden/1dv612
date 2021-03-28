import { useContext } from 'react'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react'

import { AuthContext } from '../context/AuthState'
import { GroupsContext } from '../context/GroupsState'

import * as date from '../utils/date-helper.js'

const GitLabGroupList = () => {
    const { selectedGroup } = useContext(GroupsContext)
    const { user } = useContext(AuthContext)

    return (
        <Accordion mt="1" allowToggle allowMultiple>
            { selectedGroup &&
                selectedGroup.projects.map(p => (
                    p.issues.map(i => (
                        <AccordionItem key={i.id}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Issue
                                        <Box textDecor="underline" as="span" ml="2">{i.title}</Box>
                                        {
                                            date.isNewer(i.updated_at, user.last_login) &&
                                            <Box as="span" ml="2" color="green.300">NEW</Box>
                                        }
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {i.description}
                            </AccordionPanel>
                        </AccordionItem>
                    )))).flat()
            }
        </Accordion>
    )
}

export default GitLabGroupList
