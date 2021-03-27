import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react'

import { useContext } from 'react'
import { AuthContext } from '../context/AuthState'

import * as date from '../utils/date-helper.js'

const GitLabGroup = (props) => {
    const { user } = useContext(AuthContext)
    const { group } = props

    return (
        <Accordion mt="1" allowToggle allowMultiple>
            {
                group.projects.map(p => (
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

export default GitLabGroup
