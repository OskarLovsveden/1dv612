import express from 'express'
import createError from 'http-errors'

import { connections } from '../../utils/socket.js'
import AxiosHelper from '../../utils/AxiosHelper.js'

// import { GitLabWebhookController as Controller } from '../../controllers/gitlab-webhook-controller.js'

export const router = express.Router()
// const controller = new Controller()
const axios = new AxiosHelper()

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

            const connection = connections.find(c => c.identifier === '123')

            if (connection) {
                io.to(connection.socket_id).emit('webhook', {
                    id: issue.object_attributes.id,
                    title: issue.object_attributes.title,
                    description: issue.object_attributes.description,
                    state: issue.object_attributes.state,
                    author: issue.user
                })
            } else {
                // Save in DB
                // User ID
                // Issue ID
            }

            if ('User wants notification') {
                // send notification
            }

        } catch (error) {
            next(error)
        }
    })

router.post('/:project', async (req, res, next) => {
    try {
        if (!req.user) {
            next(createError(403))
            return
        }

        const response = await axios.setHook(req.params.project, req.user.token)
        console.log(response.data)

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})