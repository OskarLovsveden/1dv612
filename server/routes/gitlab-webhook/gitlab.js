import express from 'express'
import createError from 'http-errors'

import { NotificationSettings } from '../../models/NotificationSettings.js'
import { connections } from '../../utils/socket.js'
import * as discord from '../../utils/discord-helper.js'
import * as axios from '../../utils/axios-helper.js'

// import { GitLabWebhookController as Controller } from '../../controllers/gitlab-webhook-controller.js'

export const router = express.Router()
// const controller = new Controller()

const checkHeader = async (req, res, next) => {
    try {
        if (req.headers['x-gitlab-token'] === process.env.GITLAB_WEBHOOK_TOKEN) {
            res.sendStatus(200)
            next()
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        next(error)
    }
}

router.post('/',
    async (req, res, next) => await checkHeader(req, res, next),
    async (req, res, next) => {
        try {
            const io = req.app.get('io')
            const issue = req.body
            console.log('Issue from gitlab: ', issue)

            const connection = connections.find(c => c.identifier === (issue.user.id).toString())
            console.log('Socket connection: ', connection)

            if (connection) {
                io.to(connection.socket_id).emit('webhook', {
                    id: issue.object_attributes.id,
                    title: issue.object_attributes.title,
                    description: issue.object_attributes.description,
                    state: issue.object_attributes.state,
                    author: issue.user
                })
            } else {
                const ns = await NotificationSettings.find({ gitlab_id: issue.user.id })
                console.log('Settings: ', ns)
                if (ns) {
                    discord.send(ns.channel_hook, issue)
                }
            }

        } catch (error) {
            next(error)
        }
    })

router.post('/:group', async (req, res, next) => {
    try {
        if (!req.user) {
            next(createError(403))
            return
        }

        const response = await axios.get(`/groups/${req.params.group}/hooks`, req.user.token, process.env.GITLAB_API_BASE_URL)
        const url = req.app.get('env') === 'production' ? `${req.protocol}://${req.get('host')}${req.baseUrl}` : process.env.DEV_WEBHOOK_URL
        const hasWebhook = response.data.some(hook => hook.url === url)

        if (hasWebhook) {
            const ns = await NotificationSettings.updateSettings(req.user.gitlab_id, req.body.webhookUrl)
            if (ns) {
                ns.save()
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        } else {
            await axios.setHook(req.params.group, req.user.token, url, req.body.options)

            const ns = new NotificationSettings({
                gitlab_id: req.user.gitlab_id,
                group_id: req.params.group,
                channel_hook: req.body.webhookUrl
            })
            await ns.save()

            res.sendStatus(201)
        }
    } catch (error) {
        next(error)
    }
})