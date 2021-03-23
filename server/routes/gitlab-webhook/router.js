import express from 'express'
import { router as gitlabWebhookRouter } from './gitlab.js'

export const router = express.Router()

router.use('/gitlab', gitlabWebhookRouter)
