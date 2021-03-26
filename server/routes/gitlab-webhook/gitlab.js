import express from 'express'
import createError from 'http-errors'

import { connections } from '../../utils/socket.js'
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

            const connection = connections.find(c => c.identifier === (issue.user.id).toString())

            if (connection) {
                io.to(connection.socket_id).emit('webhook', {
                    id: issue.object_attributes.id,
                    title: issue.object_attributes.title,
                    description: issue.object_attributes.description,
                    state: issue.object_attributes.state,
                    author: issue.user
                })
            }

            if ('User wants notification') {
                // send notification
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

        await axios.setHook(req.params.group, req.user.token)

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})