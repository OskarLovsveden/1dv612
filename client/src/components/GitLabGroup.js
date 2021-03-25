import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react'

const GitLabGroup = (props) => {
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
                                        New issue <Box textDecor="underline" as="span">{i.title}</Box>
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
