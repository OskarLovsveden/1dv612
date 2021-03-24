import express, { response } from 'express'
import axios from 'axios'

// import { GitLabApiController as Controller } from '../../controllers/gitlab-api-controller.js'

export const router = express.Router()

// const controller = new Controller()

const base_url = 'https://gitlab.lnu.se/api/v4/'

router.get('/groups', async (req, res, next) => {
    try {
        const response = await axios(base_url + 'groups?min_access_level=50', {
            headers: {
                'Authorization': 'Bearer ' + req.user.token
            }
        })

        const groups = response.data.map(group => ({
            "id": group.id,
            "web_url": group.web_url,
            "name": group.name
        }))

        for (const group of groups) {
            const response = await axios(base_url + 'groups/' + group.id, {
                headers: {
                    'Authorization': 'Bearer ' + req.user.token
                }
            })

            group.projects = response.data.projects.map(project => ({
                "id": project.id,
                "web_url": project.web_url,
                "name": project.name,
                "issues": project._links.issues
            }))

            for (const project of group.projects) {
                const res = await axios(project.issues, {
                    headers: {
                        'Authorization': 'Bearer ' + req.user.token
                    }
                })

                project.issues = res.data.map(issue => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    state: issue.state,
                    author: issue.author
                }))
            }
        }

        res.send(groups)

    } catch (error) {
        next(error)
    }
})