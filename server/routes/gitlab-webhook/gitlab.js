import express from 'express'
import createError from 'http-errors'

import { NotificationSettings } from '../../models/NotificationSettings.js'

// TODO - Add socket for real time updates
// import { connections } from '../../utils/socket.js'

import * as discord from '../../utils/discord-helper.js'
import * as axios from '../../utils/axios-helper.js'

export const router = express.Router()

const checkHeader = async (req, res, next) => {
    try {
        const token = req.headers['x-gitlab-token']
        if (token === process.env.GITLAB_WEBHOOK_TOKEN) {
            res.sendStatus(200)

            const receiver = await NotificationSettings.findOne({ token: token })
            req.receiver = receiver

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
            const data = req.body

            // TODO - Add socket for real time updates
            // const io = req.app.get('io')
            // const connection = connections.find(c => c.identifier === (issue.user.id).toString())
            // if (connection) {
            //     io.to(connection.socket_id).emit('webhook', {
            //         id: issue.object_attributes.id,
            //         title: issue.object_attributes.title,
            //         description: issue.object_attributes.description,
            //         state: issue.object_attributes.state,
            //         author: issue.user
            //     })
            // } else {
            //     Send to disc
            // }

            req.receiver && discord.send(req.receiver.channel_hook, data)

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

        const { channel_hook, options } = req.body
        const { token, gitlab_id } = req.user
        const { group } = req.params

        const response = await axios.get(`/groups/${group}/hooks`, token, process.env.GITLAB_API_BASE_URL)
        const url = req.app.get('env') === 'production' ? `${req.protocol}://${req.get('host')}${req.baseUrl}` : process.env.DEV_WEBHOOK_URL
        const hasWebhook = response.data.some(hook => hook.url === url)

        if (hasWebhook) {
            const update = {
                channel_hook: channel_hook,
                issue: options.issue,
                release: options.release,
                token: process.env.GITLAB_WEBHOOK_TOKEN
            }

            const response = await axios.get(`/groups/${group}/hooks`, token, process.env.GITLAB_API_BASE_URL)
            const hook = response.data.find(hook => hook.group_id.toString() === group)

            await axios.editHook(token, group, hook.id, url, options)

            const ns = await NotificationSettings.updateSettings(gitlab_id, update)

            if (ns) {
                ns.save()
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        } else {
            await axios.setHook(token, group, url, options)

            const ns = new NotificationSettings({
                gitlab_id: gitlab_id,
                group_id: group,
                channel_hook: channel_hook,
                issue: options.issue,
                release: options.release,
                token: process.env.GITLAB_WEBHOOK_TOKEN
            })
            await ns.save()

            res.sendStatus(201)
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:group', async (req, res, next) => {
    try {
        if (!req.user) {
            next(createError(403))
            return
        }

        const response = await axios.get(`/groups/${req.params.group}/hooks`, req.user.token, process.env.GITLAB_API_BASE_URL)
        const hook = response.data.find(hook => hook.group_id.toString() === req.params.group)

        if (hook) {
            await NotificationSettings.deleteOne({ group_id: req.params.group }, (err) => {
                err ? next(createError(404)) : res.sendStatus(200)
            })
            await axios.removeHook(req.user.token, req.params.group, hook.id)
        }
    } catch (error) {
        next(error)
    }
})