import express from 'express'
import { connections } from '../../utils/socket.js'

// import { GitLabWebhookController as Controller } from '../../controllers/gitlab-webhook-controller.js'

export const router = express.Router()

// const controller = new Controller()

router.post('/:project', async (req, res, next) => {
    console.log('add hook to project: ' + req.params.project)
    // console.log('for user: ' + req?.user?.token)
    res.sendStatus(200)
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