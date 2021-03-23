import express from 'express'
import createError from 'http-errors'
import { router as webhookRouter } from './gitlab-webhook/router.js'
import { router as authRouter } from './gitlab-auth/router.js'
import { router as apiRouter } from './gitlab-api/router.js'

export const router = express.Router()

router.use('/webhook', webhookRouter)
router.use('/auth', authRouter)
router.use('/api', apiRouter)
router.use('*', (req, res, next) => next(createError(404)))
