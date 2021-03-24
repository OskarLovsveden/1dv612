import { List, ListItem } from '@chakra-ui/react'

const GitLabGroup = (props) => {
    const { group } = props

    return (
        <List spacing={3}>
            {
                group.projects.map(p => (
                    p.issues.map(i => <ListItem key={i.id}>{i.title}</ListItem>)
                )).flat()
            }
        </List>
    )
}

export default GitLabGroup
