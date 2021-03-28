import express from 'express'
import * as axios from '../../utils/axios-helper.js'

export const router = express.Router()

import { NotificationSettings } from '../../models/NotificationSettings.js'

router.get('/groups', async (req, res, next) => {
    try {
        const response = await axios.get('/groups?min_access_level=50', req.user.token, process.env.GITLAB_API_BASE_URL)

        const groups = response.data.map(group => ({
            id: group.id,
            web_url: group.web_url,
            name: group.name
        }))

        for (const group of groups) {
            const response = await axios.get(`/groups/${group.id}`, req.user.token, process.env.GITLAB_API_BASE_URL)
            const ns = await NotificationSettings.findOne({ group_id: group.id })


            group.channel_hook = ns ? ns.channel_hook : ''
            group.notify_issue = ns ? ns.issue : false
            group.notify_release = ns ? ns.release : false

            group.projects = response.data.projects.map(project => {
                return ({
                    id: project.id,
                    web_url: project.web_url,
                    name: project.name,
                    issues: project._links.issues,
                    releases: `${process.env.GITLAB_API_BASE_URL}/projects/${project.id}/releases`
                })
            })

            for (const project of group.projects) {
                const r1 = await axios.get(project.issues, req.user.token)

                project.issues = r1.data.map(issue => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    state: issue.state,
                    updated_at: issue.updated_at,
                    author: issue.author
                }))

                const r2 = await axios.get(project.releases, req.user.token)

                project.releases = r2.data.map(release => ({
                    tag: release.tag_name,
                    title: release.name,
                    description: release.description,
                    updated_at: release.released_at,
                    author: release.author
                }))
            }
        }

        res.send(groups)
    } catch (error) {
        next(error)
    }
})