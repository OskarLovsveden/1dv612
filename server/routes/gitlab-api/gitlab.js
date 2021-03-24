import express from 'express'
import AxiosHelper from '../../utils/AxiosHelper.js'
// import { GitLabApiController as Controller } from '../../controllers/gitlab-api-controller.js'

export const router = express.Router()
// const controller = new Controller()
const axios = new AxiosHelper()

router.get('/groups', async (req, res, next) => {
    try {
        const response = await axios.get('/groups?min_access_level=50', req.user.token, process.env.GITLAB_API_BASE_URL)

        const groups = response.data.map(group => ({
            "id": group.id,
            "web_url": group.web_url,
            "name": group.name
        }))

        for (const group of groups) {
            const response = await axios.get(`/groups/${group.id}`, req.user.token, process.env.GITLAB_API_BASE_URL)

            group.projects = response.data.projects.map(project => ({
                "id": project.id,
                "web_url": project.web_url,
                "name": project.name,
                "issues": project._links.issues
            }))

            for (const project of group.projects) {
                const response = await axios.get(project.issues, req.user.token)

                project.issues = response.data.map(issue => ({
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