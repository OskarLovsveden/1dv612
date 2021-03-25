import express from 'express'
import createError from 'http-errors'

import { connections } from '../../utils/socket.js'
import AxiosHelper from '../../utils/AxiosHelper.js'

// import { GitLabWebhookController as Controller } from '../../controllers/gitlab-webhook-controller.js'

export const router = express.Router()
// const controller = new Controller()
const axios = new AxiosHelper()


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

router.post('/', async (req, res, next) => {
    res.sendStatus(200)

    try {
        console.log('new data - notify user')

        const io = req.app.get('io')

        const connection = connections.find(c => c.identifier === '123')
        io.to(connection.socket_id).emit('webhook', { fancy: 'stuff' })

    } catch (error) {
        next(error)
    }
})